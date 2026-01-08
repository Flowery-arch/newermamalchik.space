import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const YANDEX_MUSIC_TOKEN = process.env.YANDEX_MUSIC_TOKEN
    
    if (!YANDEX_MUSIC_TOKEN) {
      console.log('Yandex Music: Token not found in environment variables')
      return NextResponse.json({ 
        nowPlaying: false,
        message: 'Yandex Music token not configured. Set YANDEX_MUSIC_TOKEN in .env.local'
      })
    }

    console.log('Yandex Music: Token found, making API request...')

    // Метод 0: Пробуем использовать альтернативные endpoints, которые могут не требовать device-id
    // Попробуем получить последний прослушанный трек из feed
    try {
      const feedResponse = await fetch('https://api.music.yandex.net/feed', {
        headers: {
          'Authorization': `OAuth ${YANDEX_MUSIC_TOKEN}`,
          'Content-Type': 'application/json'
        }
      })
      
      console.log('Yandex Music: Feed response:', feedResponse.status)
      
      if (feedResponse.ok) {
        const feedData = await feedResponse.json()
        console.log('Yandex Music: Feed data:', JSON.stringify(feedData).substring(0, 500))
        
        // Ищем последний прослушанный трек в фиде
        const generated = feedData.result?.generated || feedData.generated || []
        const lastTrack = generated.find((item: any) => item.type === 'track' || item.track)
        
        if (lastTrack?.track || lastTrack) {
          const track = lastTrack.track || lastTrack
          if (track.title) {
            return NextResponse.json({
              nowPlaying: true,
              name: track.title,
              artist: track.artists?.[0]?.name || 'Неизвестный исполнитель',
              album: track.albums?.[0]?.title,
              image: track.coverUri 
                ? `https://${track.coverUri.replace('%%', '200x200')}`
                : undefined,
              url: track.albums?.[0]?.id && track.id
                ? `https://music.yandex.ru/album/${track.albums[0].id}/track/${track.id}`
                : undefined
            })
          }
        }
      }
    } catch (feedError) {
      console.log('Yandex Music: Feed method failed:', feedError)
    }

    // Используем прямой API запрос к Яндекс Музыке
    // Метод 1: Получаем статус аккаунта для получения UID
    let uid = null
    try {
      const accountResponse = await fetch('https://api.music.yandex.net/account/status', {
        headers: {
          'Authorization': `OAuth ${YANDEX_MUSIC_TOKEN}`,
          'Content-Type': 'application/json'
        }
      })

      console.log('Yandex Music: Account status response:', accountResponse.status)
      
      if (accountResponse.ok) {
        const accountData = await accountResponse.json()
        console.log('Yandex Music: Account data:', JSON.stringify(accountData).substring(0, 200))
        uid = accountData.account?.uid || accountData.result?.account?.uid
        console.log('Yandex Music: UID extracted:', uid)
      } else {
        const errorText = await accountResponse.text()
        console.error('Yandex Music: Account status error:', accountResponse.status, errorText)
      }
    } catch (e) {
      console.error('Yandex Music: Error getting account status:', e)
    }

    // Метод 2: Получаем список устройств, затем используем device-id активного устройства
    if (uid) {
      try {
        // Сначала получаем список устройств пользователя
        let deviceId = null
        try {
          const devicesResponse = await fetch(`https://api.music.yandex.net/account/status`, {
            headers: {
              'Authorization': `OAuth ${YANDEX_MUSIC_TOKEN}`,
              'Content-Type': 'application/json'
            }
          })
          
          if (devicesResponse.ok) {
            const devicesData = await devicesResponse.json()
            console.log('Yandex Music: Devices/Status data:', JSON.stringify(devicesData).substring(0, 500))
            
            // Ищем активное устройство или используем первое доступное
            const devices = devicesData.result?.account?.devices || devicesData.account?.devices || []
            const activeDevice = devices.find((d: any) => d.isActive || d.state === 'playing') || devices[0]
            
            if (activeDevice?.id) {
              deviceId = activeDevice.id
              console.log('Yandex Music: Found active device ID:', deviceId)
            }
          }
        } catch (e) {
          console.error('Yandex Music: Error getting devices:', e)
        }
        
        // Если не нашли device-id из устройств, используем фиктивный
        if (!deviceId) {
          deviceId = '377c5ae26b09fccd72deae0a95425559'
          console.log('Yandex Music: Using fallback device ID:', deviceId)
        }
        
        // Теперь получаем список очередей с device-id
        let queueData = null
        let queueId = null
        
        // Пробуем разные варианты получения очередей
        const queuesListConfigs = [
          {
            url: `https://api.music.yandex.net/queues`,
            useDeviceHeader: true
          },
          {
            url: `https://api.music.yandex.net/queues?device-id=${deviceId}`,
            useDeviceHeader: false
          }
        ]
        
        for (const config of queuesListConfigs) {
          try {
            const headers: Record<string, string> = {
              'Authorization': `OAuth ${YANDEX_MUSIC_TOKEN}`,
              'Content-Type': 'application/json'
            }
            
            if (config.useDeviceHeader) {
              headers['X-Yandex-Music-Device'] = deviceId
            }
            
            const queuesListResponse = await fetch(config.url, {
              method: 'GET',
              headers
            })
            
            console.log(`Yandex Music: Queues list response (${config.url}):`, queuesListResponse.status)
            
            if (queuesListResponse.ok) {
              const queuesListData = await queuesListResponse.json()
              console.log('Yandex Music: Queues list data:', JSON.stringify(queuesListData).substring(0, 500))
              
              // Ищем активную очередь или первую доступную
              const queues = queuesListData.result || queuesListData.queues || []
              const activeQueue = queues.find((q: any) => q.isActive || q.current) || queues[0]
              
              if (activeQueue?.id) {
                queueId = activeQueue.id
                console.log('Yandex Music: Found queue ID:', queueId)
                break
              }
            } else {
              const errorText = await queuesListResponse.text()
              console.log(`Yandex Music: Queues list failed (${config.url}):`, queuesListResponse.status, errorText.substring(0, 200))
            }
          } catch (e) {
            console.error(`Yandex Music: Error with queues list endpoint ${config.url}:`, e)
          }
        }
        
        // Если получили queue-id, получаем данные очереди
        if (queueId) {
          const queueEndpoints = [
            `https://api.music.yandex.net/queues/${queueId}?device-id=${deviceId}`,
            `https://api.music.yandex.net/queues/${queueId}`
          ]
          
          for (const endpoint of queueEndpoints) {
            try {
              const queueResponse = await fetch(endpoint, {
                headers: {
                  'Authorization': `OAuth ${YANDEX_MUSIC_TOKEN}`,
                  'Content-Type': 'application/json'
                }
              })
              
              console.log(`Yandex Music: Queue response (${endpoint}):`, queueResponse.status)
              
              if (queueResponse.ok) {
                queueData = await queueResponse.json()
                console.log('Yandex Music: Queue data received from:', endpoint)
                break
              } else {
                const errorText = await queueResponse.text()
                console.log(`Yandex Music: Queue endpoint failed (${endpoint}):`, queueResponse.status, errorText.substring(0, 200))
              }
            } catch (e) {
              console.error(`Yandex Music: Error with queue endpoint ${endpoint}:`, e)
            }
          }
        }

        if (queueData) {
          const result = queueData.result || queueData
          
          // Проверяем разные структуры данных очереди
          let trackId = null
          let albumId = null
          
          // Сначала ищем явно помеченный как текущий трек
          if (result.currentTrack?.id) {
            trackId = result.currentTrack.id
            albumId = result.currentTrack.albumId
            console.log('Yandex Music: Found currentTrack:', trackId)
          } else if (result.current?.id) {
            trackId = result.current.id
            albumId = result.current.albumId
            console.log('Yandex Music: Found current:', trackId)
          } else if (result.context?.current?.id) {
            trackId = result.context.current.id
            albumId = result.context.current.albumId
            console.log('Yandex Music: Found context.current:', trackId)
          } else if (result.context?.currentIndex !== undefined && result.context?.tracks) {
            // Используем currentIndex для определения текущего трека
            const currentIndex = result.context.currentIndex
            if (result.context.tracks[currentIndex]?.id) {
              trackId = result.context.tracks[currentIndex].id
              albumId = result.context.tracks[currentIndex].albumId
              console.log('Yandex Music: Found track by currentIndex:', currentIndex, trackId)
            }
          } else if (result.context?.tracks?.[0]?.id) {
            // Берем первый трек из очереди как текущий (fallback)
            trackId = result.context.tracks[0].id
            albumId = result.context.tracks[0].albumId
            console.log('Yandex Music: Using first track from context.tracks (fallback):', trackId)
          } else if (result.queue?.[0]?.id) {
            trackId = result.queue[0].id
            albumId = result.queue[0].albumId
            console.log('Yandex Music: Using first track from queue (fallback):', trackId)
          } else if (result.tracks?.[0]?.id) {
            trackId = result.tracks[0].id
            albumId = result.tracks[0].albumId
            console.log('Yandex Music: Using first track from tracks (fallback):', trackId)
          }
          
          console.log('Yandex Music: Track ID from queue:', trackId, 'Album ID:', albumId)
          
          if (trackId) {
            // Получаем информацию о треке (с albumId если есть)
            const trackUrl = albumId 
              ? `https://api.music.yandex.net/tracks/${trackId}?album-id=${albumId}`
              : `https://api.music.yandex.net/tracks/${trackId}`
            
            const trackResponse = await fetch(trackUrl, {
              headers: {
                'Authorization': `OAuth ${YANDEX_MUSIC_TOKEN}`,
                'Content-Type': 'application/json'
              }
            })

            console.log('Yandex Music: Track response:', trackResponse.status)

            if (trackResponse.ok) {
              const trackData = await trackResponse.json()
              console.log('Yandex Music: Track data keys:', Object.keys(trackData))
              
              const trackResult = trackData.result || trackData
              const track = Array.isArray(trackResult) ? trackResult[0] : trackResult
              
              if (track && track.title) {
                const result = {
                  nowPlaying: true,
                  name: track.title || 'Неизвестный трек',
                  artist: track.artists?.[0]?.name || 'Неизвестный исполнитель',
                  album: track.albums?.[0]?.title,
                  image: track.coverUri 
                    ? `https://${track.coverUri.replace('%%', '200x200')}`
                    : track.ogImage || undefined,
                  url: track.albums?.[0]?.id && track.id
                    ? `https://music.yandex.ru/album/${track.albums[0].id}/track/${track.id}`
                    : undefined
                }
                console.log('Yandex Music: Returning track from queue:', result)
                return NextResponse.json(result)
              }
            } else {
              const errorText = await trackResponse.text()
              console.error('Yandex Music: Track fetch error:', trackResponse.status, errorText)
            }
          }
        } else {
          console.log('Yandex Music: No queue data received from any endpoint')
        }
      } catch (e) {
        console.error('Yandex Music: Error getting queue:', e)
      }
    }

    // Метод 3: Пробуем получить фид (последние треки) - это не текущий трек, но может быть полезно как fallback
    // НЕ ИСПОЛЬЗУЕМ feed, так как он не содержит текущий воспроизводимый трек

    console.log('Yandex Music: No track found')
    return NextResponse.json({ 
      nowPlaying: false,
      message: 'No track currently playing'
    })
    
  } catch (error) {
    console.error('Yandex Music: Fatal error:', error)
    return NextResponse.json(
      { 
        nowPlaying: false,
        error: 'Failed to fetch Yandex Music data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

