import { NextResponse } from 'next/server';

const YANDEX_TOKEN = process.env.YANDEX_TOKEN;

if (!YANDEX_TOKEN) {
  console.error('YANDEX_TOKEN is not set in environment variables');
}

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchTrackData(retryCount = 0, maxRetries = 3) {
  if (!YANDEX_TOKEN) {
    throw new Error('YANDEX_TOKEN is not configured');
  }

  try {
    const res = await fetch('http://api.mipoh.ru/get_current_track_beta?update_progress=true&force_update=true&include_progress=true', {
      headers: {
        'ya-token': YANDEX_TOKEN,
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    });

    if (!res.ok) {
      const text = await res.text();
      console.error(`API Error (attempt ${retryCount + 1}/${maxRetries + 1}):`, {
        status: res.status,
        statusText: res.statusText,
        response: text
      });

      if (res.status === 500 && retryCount < maxRetries) {
        const backoffTime = Math.min(1000 * Math.pow(2, retryCount), 10000);
        console.log(`Retrying in ${backoffTime}ms...`);
        await sleep(backoffTime);
        return fetchTrackData(retryCount + 1, maxRetries);
      }

      throw new Error(`API responded with status ${res.status}`);
    }

    try {
      const data = await res.json();
      return data;
    } catch (err) {
      const text = await res.text();
      throw new Error('Failed to parse API response');
    }
  } catch (err: any) {
    if (retryCount < maxRetries && err.message.includes('500')) {
      const backoffTime = Math.min(1000 * Math.pow(2, retryCount), 10000);
      console.log(`Retrying in ${backoffTime}ms...`);
      await sleep(backoffTime);
      return fetchTrackData(retryCount + 1, maxRetries);
    }
    throw err;
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const isSSE = searchParams.get('sse') === 'true';

  if (isSSE) {
    const encoder = new TextEncoder();
    let isClosed = false;

    const stream = new ReadableStream({
      async start(controller) {
        req.signal.addEventListener('abort', () => {
          isClosed = true;
        });

        while (!isClosed) {
          try {
            const data = await fetchTrackData();
            
            if (isClosed) break;

            if (data.track) {
              const track = {
                title: data.track.title || '',
                artist: data.track.artist || '',
                img: data.track.img || '',
                duration: parseInt(data.duration_ms || '0'),
                isPlaying: !data.paused,
                progress: parseInt(data.progress_ms || '0')
              };
              
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ success: true, track })}\n\n`));
            } else {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ success: true, track: null })}\n\n`));
            }
          } catch (err: any) {
            console.error('Error fetching track:', err);
            if (!isClosed) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ 
                success: false, 
                error: 'Failed to fetch track data'
              })}\n\n`));
            }
          }

          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  }

  try {
    const data = await fetchTrackData();
    
    if (data.track) {
      const track = {
        title: data.track.title || '',
        artist: data.track.artist || '',
        img: data.track.img || '',
        duration: parseInt(data.duration_ms || '0'),
        isPlaying: !data.paused,
        progress: parseInt(data.progress_ms || '0')
      };
      return NextResponse.json({ success: true, track });
    } else {
      return NextResponse.json({ success: true, track: null });
    }
  } catch (err: any) {
    console.error('Error fetching track (GET):', err);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch track data'
    });
  }
} 