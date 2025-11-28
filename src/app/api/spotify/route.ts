import { NextResponse } from 'next/server';
import SpotifyWebApi from 'spotify-web-api-node';

// Конфигурация Spotify API
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  refreshToken: process.env.SPOTIFY_REFRESH_TOKEN
});

// Переменная для хранения времени последнего обновления токена
let tokenLastRefreshed = 0;

// Функция для обновления токена доступа
async function refreshAccessToken() {
  const now = Date.now();
  // Обновляем токен, если прошло более 50 минут с последнего обновления
  if (now - tokenLastRefreshed > 50 * 60 * 1000) {
    try {
      const data = await spotifyApi.refreshAccessToken();
      const accessToken = data.body['access_token'];
      
      console.log('Токен Spotify успешно обновлен');
      spotifyApi.setAccessToken(accessToken);
      tokenLastRefreshed = now;
    } catch (error) {
      console.error('Ошибка обновления токена Spotify:', error);
      throw error;
    }
  }
}

export async function GET() {
  try {
    // Обновляем токен перед запросом
    await refreshAccessToken();
    
    // Получаем текущий трек
    const response = await spotifyApi.getMyCurrentPlayingTrack();
    
    if (response.statusCode === 204 || !response.body || !response.body.item) {
      // Ничего не воспроизводится
      return NextResponse.json({ 
        success: true, 
        track: null 
      });
    }
    
    const track = response.body.item;
    const isPlaying = response.body.is_playing;
    
    // Проверяем, что это трек, а не эпизод подкаста
    if ('artists' in track && 'album' in track) {
      // Форматируем данные трека
      const trackData = {
        title: track.name,
        artist: track.artists.map((artist: { name: string }) => artist.name).join(', '),
        album: track.album.name,
        img: track.album.images[0]?.url || '',
        duration: track.duration_ms,
        isPlaying: isPlaying,
        progress: response.body.progress_ms || 0,
        trackUrl: track.external_urls.spotify
      };
      
      return NextResponse.json({ 
        success: true, 
        track: trackData 
      });
    } else {
      // Если это эпизод подкаста или другой тип контента
      const trackData = {
        title: track.name,
        artist: 'Podcast',
        album: '',
        img: 'show' in track && track.show.images ? track.show.images[0]?.url || '' : '',
        duration: track.duration_ms,
        isPlaying: isPlaying,
        progress: response.body.progress_ms || 0,
        trackUrl: track.external_urls.spotify
      };
      
      return NextResponse.json({ 
        success: true, 
        track: trackData 
      });
    }
    
  } catch (error) {
    console.error('Ошибка получения текущего трека Spotify:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch track data' 
    }, { status: 500 });
  }
} 