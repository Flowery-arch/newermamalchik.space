import { NextResponse } from 'next/server';

const YANDEX_TOKEN = process.env.YANDEX_TOKEN || 'YANDEX_TOKEN';

async function fetchTrackData() {
  const res = await fetch('http://api.mipoh.ru/get_current_track_beta?update_progress=true&force_update=true&include_progress=true', {
    headers: {
      'ya-token': YANDEX_TOKEN,
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache'
    }
  });

  // Check if response is ok before trying to parse JSON
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API responded with status ${res.status}: ${text}`);
  }

  // Try to parse the response as JSON
  try {
    const data = await res.json();
    return data;
  } catch (err) {
    const text = await res.text();
    throw new Error(`Failed to parse API response as JSON: ${text}`);
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
        // Обработчик закрытия соединения
        req.signal.addEventListener('abort', () => {
          isClosed = true;
        });

        while (!isClosed) {
          try {
            console.log('Making API request...');
            const data = await fetchTrackData();
            
            console.log('Raw API response:', JSON.stringify(data, null, 2));
            console.log('Track exists:', !!data.track);
            console.log('Track data:', data.track);
            console.log('Progress ms:', data.progress_ms);
            console.log('Duration ms:', data.duration_ms);
            console.log('Paused:', data.paused);
            
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
              console.log('Processed track:', JSON.stringify(track, null, 2));
              console.log('Progress value:', track.progress);
              console.log('Duration value:', track.duration);
              console.log('Is playing:', track.isPlaying);
              
              const payload = {
                success: true,
                track
              };
              controller.enqueue(encoder.encode(`data: ${JSON.stringify(payload)}\n\n`));
            } else {
              console.log('No track data available');
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ success: true, track: null })}\n\n`));
            }
          } catch (err: any) {
            console.error('Error fetching track:', err);
            if (!isClosed) {
              try {
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ 
                  success: false, 
                  error: err.message || 'Unknown error occurred'
                })}\n\n`));
              } catch (e) {
                console.error('Failed to send error message:', e);
              }
            }
          }

          // Ждем 100мс перед следующим запросом
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

  // Обычный GET-запрос
  try {
    console.log('Making GET request...');
    const data = await fetchTrackData();
    
    console.log('Raw API response (GET):', JSON.stringify(data, null, 2));
    console.log('Track exists (GET):', !!data.track);
    console.log('Track data (GET):', data.track);
    console.log('Progress ms (GET):', data.progress_ms);
    console.log('Duration ms (GET):', data.duration_ms);
    console.log('Paused (GET):', data.paused);
    
    if (data.track) {
      const track = {
        title: data.track.title || '',
        artist: data.track.artist || '',
        img: data.track.img || '',
        duration: parseInt(data.duration_ms || '0'),
        isPlaying: !data.paused,
        progress: parseInt(data.progress_ms || '0')
      };
      console.log('Processed track (GET):', JSON.stringify(track, null, 2));
      return NextResponse.json({ success: true, track });
    } else {
      console.log('No track data available (GET)');
      return NextResponse.json({ success: true, track: null });
    }
  } catch (err: any) {
    console.error('Error fetching track (GET):', err);
    return NextResponse.json({ 
      success: false, 
      error: err.message || 'Unknown error occurred'
    });
  }
} 