import { NextResponse } from 'next/server';

const STEAM_API_KEY = 'FE92BF06EBDBF59BB8D3BF2EB3B82FD2';
// Здесь должен быть ваш SteamID64, замените на реальный
const STEAM_ID = '76561198073014953';
// AppID для Counter-Strike 2
const CS2_APP_ID = 730;
const UPDATE_INTERVAL = 30000; // 30 seconds
const RETRY_DELAY = 5000; // 5 seconds before retry on error

// Функция для безопасного выполнения fetch запроса с повторными попытками
async function safeFetch(url: string, retries = 3): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response;
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
    }
  }
  throw new Error('Failed after retries');
}

// Функция для получения данных Steam
async function fetchSteamData() {
  try {
    // Получение данных о принадлежащих пользователю играх
    const [ownedGamesResponse, playerSummaryResponse] = await Promise.all([
      safeFetch(
        `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${STEAM_API_KEY}&steamid=${STEAM_ID}&format=json&include_appinfo=true&include_played_free_games=true`
      ),
      safeFetch(
        `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${STEAM_API_KEY}&steamids=${STEAM_ID}`
      )
    ]);

    const [ownedGamesData, playerSummaryData] = await Promise.all([
      ownedGamesResponse.json(),
      playerSummaryResponse.json()
    ]);

    // Находим CS2 среди игр пользователя
    let cs2Playtime = 0;
    let cs2Data = null;

    if (ownedGamesData.response && ownedGamesData.response.games) {
      cs2Data = ownedGamesData.response.games.find(
        (game: { appid: number }) => game.appid === CS2_APP_ID
      );
      
      if (cs2Data) {
        cs2Playtime = cs2Data.playtime_forever || 0;
      }
    }

    const player = playerSummaryData.response?.players?.[0] || {};
    const playerStatus = player.personastate || 0;
    const isPlayingCS2 = player.gameid === CS2_APP_ID.toString();
    const isOnline = playerStatus > 0 && isPlayingCS2;

    return {
      totalHours: Math.floor(cs2Playtime / 60),
      totalMinutes: cs2Playtime % 60,
      isOnline,
      gameName: cs2Data?.name || 'Counter-Strike 2',
      success: true,
    };
  } catch (error) {
    console.error('Ошибка при получении данных Steam:', error);
    // Возвращаем последние известные данные или значения по умолчанию
    return {
      totalHours: 0,
      totalMinutes: 0,
      isOnline: false,
      gameName: 'Counter-Strike 2',
      success: false,
      error: error instanceof Error ? error.message : 'Неизвестная ошибка'
    };
  }
}

export async function GET(request: Request) {
  const { headers } = request;
  const acceptHeader = headers.get('accept');

  // Обработка SSE подключения
  if (acceptHeader?.includes('text/event-stream')) {
    const encoder = new TextEncoder();
    const stream = new TransformStream();
    const writer = stream.writable.getWriter();

    // Функция для отправки данных клиенту
    const sendData = async () => {
      const data = await fetchSteamData();
      const message = `data: ${JSON.stringify(data)}\n\n`;
      await writer.write(encoder.encode(message));
    };

    // Отправляем начальные данные
    await sendData();

    // Устанавливаем интервал обновления
    const interval = setInterval(sendData, UPDATE_INTERVAL);

    // Очистка при закрытии соединения
    request.signal.addEventListener('abort', () => {
      clearInterval(interval);
      writer.close();
    });

    return new Response(stream.readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  }

  // Обычный HTTP запрос
  const data = await fetchSteamData();
  return NextResponse.json(data);
} 