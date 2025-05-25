import { NextResponse } from 'next/server';

const STEAM_API_KEY = 'FE92BF06EBDBF59BB8D3BF2EB3B82FD2';
// Здесь должен быть ваш SteamID64, замените на реальный
const STEAM_ID = '76561198073014953';
// AppID для Counter-Strike 2
const CS2_APP_ID = 730;

export async function GET() {
  try {
    // Получение данных о принадлежащих пользователю играх
    const ownedGamesResponse = await fetch(
      `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${STEAM_API_KEY}&steamid=${STEAM_ID}&format=json&include_appinfo=true&include_played_free_games=true`
    );
    
    if (!ownedGamesResponse.ok) {
      throw new Error('Ошибка при получении данных из Steam API');
    }
    
    const ownedGamesData = await ownedGamesResponse.json();
    
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
    
    // Если CS2 не найдена в библиотеке
    if (!cs2Data) {
      return NextResponse.json({
        totalHours: 0,
        totalMinutes: 0,
        totalSeconds: 0,
        isOnline: false,
        lastSeenOnline: 0,
        gameName: 'Counter-Strike 2',
        success: true,
      });
    }
    
    // Преобразование минут в часы, минуты для отображения
    const totalHours = Math.floor(cs2Playtime / 60);
    const totalMinutes = cs2Playtime % 60;
    
    // Получение статуса пользователя (онлайн/офлайн)
    const playerSummaryResponse = await fetch(
      `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${STEAM_API_KEY}&steamids=${STEAM_ID}`
    );
    
    if (!playerSummaryResponse.ok) {
      throw new Error('Ошибка при получении данных о пользователе из Steam API');
    }
    
    const playerSummaryData = await playerSummaryResponse.json();
    const player = playerSummaryData.response.players[0] || {};
    const playerStatus = player.personastate || 0;
    
    // Проверяем, играет ли пользователь сейчас в CS2
    const isPlayingCS2 = player.gameid === CS2_APP_ID.toString();
    
    // Пользователь онлайн, если он имеет статус больше 0 и играет в CS2
    const isOnline = playerStatus > 0 && isPlayingCS2;
    
    // Получаем последнюю активность в Steam
    const lastSeenOnline = player.lastlogoff || 0;
    
    return NextResponse.json({
      totalHours,
      totalMinutes,
      totalSeconds: 0, // Секунды не предоставляются Steam API
      isOnline,
      lastSeenOnline,
      gameName: cs2Data.name || 'Counter-Strike 2',
      success: true,
    });
  } catch (error) {
    console.error('Ошибка при работе с Steam API:', error);
    return NextResponse.json({ error: 'Ошибка сервера', success: false }, { status: 500 });
  }
} 