'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useState } from 'react';

interface Track {
  title: string;
  artist: string;
  albumCover: string;
}

const YANDEX_TOKEN = 'y0_AgAAAABnMOABAAG8XgAAAADb-X54H7KoNUlERSG4yUvxjX_bfSi-7Vg';
const YANDEX_USER_ID = '781749467';

async function fetchYandexMusic() {
  try {
    // Сначала получаем список очередей
    const queuesResponse = await fetch(`https://api.music.yandex.net/users/${YANDEX_USER_ID}/queues`, {
      headers: {
        'Authorization': `OAuth ${YANDEX_TOKEN}`,
        'Accept': 'application/json'
      }
    });

    if (!queuesResponse.ok) {
      throw new Error('Failed to fetch queues');
    }

    const queuesData = await queuesResponse.json();
    if (!queuesData?.result?.queues?.[0]?.id) {
      return null;
    }

    const queueId = queuesData.result.queues[0].id;

    // Затем получаем текущий трек из очереди
    const trackResponse = await fetch(`https://api.music.yandex.net/queues/${queueId}/current`, {
      headers: {
        'Authorization': `OAuth ${YANDEX_TOKEN}`,
        'Accept': 'application/json'
      }
    });

    if (!trackResponse.ok) {
      throw new Error('Failed to fetch current track');
    }

    const trackData = await trackResponse.json();
    if (!trackData?.result?.context?.track) {
      return null;
    }

    const track = trackData.result.context.track;
    return {
      title: track.title,
      artist: track.artists[0].name,
      albumCover: `https://${track.coverUri.replace('%%', '200x200')}`
    };
  } catch (error) {
    console.error('Error fetching track:', error);
    return null;
  }
}

export default function Spotify() {
  const { t } = useLanguage();
  const [track, setTrack] = useState<Track | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentTrack = async () => {
      try {
        const trackData = await fetchYandexMusic();
        setTrack(trackData);
      } catch (error) {
        console.error('Error fetching track:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentTrack();
    const interval = setInterval(fetchCurrentTrack, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="easy-in-out grid grid-rows-[auto_1fr] gap-4 rounded-xl p-6 shadow-lg ring-2 ring-neutral-500/20 duration-600 hover:scale-101 dark:bg-neutral-900/10 dark:ring-neutral-300/10">
      <div className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="text-lg text-neutral-800 dark:text-neutral-100/70"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M17.9 10.9C14.7 9 9.35 8.8 6.3 9.75c-.5.15-1-.15-1.15-.6c-.15-.5.15-1 .6-1.15c3.55-1.05 9.4-.85 13.1 1.35c.45.25.6.85.35 1.3c-.25.35-.85.5-1.3.25m-.1 2.8c-.25.35-.7.5-1.05.25c-2.7-1.65-6.8-2.15-9.95-1.15c-.4.1-.85-.1-.95-.5s.1-.85.5-.95c3.65-1.1 8.15-.55 11.25 1.35c.3.15.45.65.2 1m-1.2 2.75c-.2.3-.55.4-.85.2c-2.35-1.45-5.3-1.75-8.8-.95c-.35.1-.65-.15-.75-.45c-.1-.35.15-.65.45-.75c3.8-.85 7.1-.5 9.7 1.1c.35.15.4.55.25.85M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2"
          />
        </svg>
        <h1 className="text-sm text-neutral-800 dark:text-neutral-100/70">{t('spotify.title')}</h1>
      </div>
      <div className="flex items-center gap-4">
        {loading ? (
          <>
            <div className="h-20 w-20 animate-pulse rounded-xl bg-neutral-400/30 dark:bg-neutral-800/50" />
            <div>
              <h1 className="text-md font-semibold dark:text-neutral-200">
                {t('spotify.nothing_here')}
              </h1>
              <p className="text-xs font-semibold text-neutral-400">{t('spotify.not_found')}</p>
            </div>
          </>
        ) : track ? (
          <>
            <div className="relative h-20 w-20 overflow-hidden rounded-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={track.albumCover}
                alt={`${track.title} cover`}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-md font-semibold dark:text-neutral-200 line-clamp-1">
                {track.title}
              </h1>
              <p className="text-xs font-semibold text-neutral-400 line-clamp-1">{track.artist}</p>
            </div>
          </>
        ) : (
          <>
            <div className="h-20 w-20 rounded-xl bg-neutral-400/30 dark:bg-neutral-800/50" />
            <div>
              <h1 className="text-md font-semibold dark:text-neutral-200">
                {t('spotify.nothing_here')}
              </h1>
              <p className="text-xs font-semibold text-neutral-400">{t('spotify.not_found')}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 