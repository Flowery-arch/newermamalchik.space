'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useState } from 'react';
import { LucidePlay } from 'lucide-react';

interface Track {
  title: string;
  artist: string;
  albumCover: string;
}

const YANDEX_TOKEN = 'y0_AgAAAABnMOABAAG8XgAAAADb-X54H7KoNUlERSG4yUvxjX_bfSi-7Vg';
const YANDEX_USER_ID = '781749467';

async function fetchYandexMusic() {
  try {
    // Step 1: Get user's queues
    const queuesResponse = await fetch(`https://api.music.yandex.net/users/${YANDEX_USER_ID}/queues`, {
      headers: {
        'Authorization': `OAuth ${YANDEX_TOKEN}`,
        'Accept': 'application/json'
      }
    });

    if (!queuesResponse.ok) {
      const errorText = await queuesResponse.text();
      console.error(`Failed to fetch queues: ${queuesResponse.status} ${queuesResponse.statusText}`, errorText);
      return null;
    }

    const queuesData = await queuesResponse.json();
    
    // Check if queues data is valid and contains at least one queue
    if (!queuesData || !queuesData.result || !Array.isArray(queuesData.result.queues) || queuesData.result.queues.length === 0 || !queuesData.result.queues[0].id) {
      console.warn('No valid queues found or empty queues list.', queuesData);
      return null;
    }

    const queueId = queuesData.result.queues[0].id;

    // Step 2: Get the current track from the first queue
    const trackResponse = await fetch(`https://api.music.yandex.net/queues/${queueId}/current`, {
      headers: {
        'Authorization': `OAuth ${YANDEX_TOKEN}`,
        'Accept': 'application/json'
      }
    });

    if (!trackResponse.ok) {
      const errorText = await trackResponse.text();
      console.error(`Failed to fetch current track: ${trackResponse.status} ${trackResponse.statusText}`, errorText);
      return null;
    }

    const trackData = await trackResponse.json();
    
    // Check if track data is valid and contains track context
    if (!trackData || !trackData.result || !trackData.result.context || !trackData.result.context.track) {
       console.warn('No valid current track data found.', trackData);
       return null;
    }

    const track = trackData.result.context.track;
    
    // Ensure track object has necessary properties
    if (!track || !track.title || !Array.isArray(track.artists) || track.artists.length === 0 || !track.artists[0].name || !track.coverUri) {
        console.warn('Current track object is missing required properties.', track);
        return null;
    }

    return {
      title: track.title,
      artist: track.artists[0].name,
      albumCover: `https://${track.coverUri.replace('%%', '200x200')}`
    };
  } catch (error) {
    console.error('An unexpected error occurred while fetching track:', error);
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
          className="text-lg text-neutral-800 dark:text-neutral-100/70"
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12s12-5.4 12-12S18.66 0 12 0m5.521 17.34c-.24.359-.66.48-1.021.24c-2.82-1.74-6.36-2.101-10.561-1.141c-.418.122-.779-.179-.899-.539c-.12-.421.18-.78.54-.9c4.56-1.021 8.52-.6 11.64 1.32c.42.18.479.659.301 1.02m1.44-3.3c-.301.42-.841.6-1.262.3c-3.239-1.98-8.159-2.58-11.939-1.38c-.539.18-1.14-.12-1.32-.66c-.18-.54.12-1.14.66-1.32c4.26-1.26 9.6-.6 13.2 1.68c.539.3.719.841.419 1.321m.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721c-.18-.601.18-1.2.72-1.381c4.26-1.26 11.28-1.02 15.721 1.621c.539.3.719.96.419 1.5c-.42.659-1.26.88-1.859.52"
          />
        </svg>
        <h1 className="text-sm text-neutral-800 dark:text-neutral-100/70">{t('spotify.title')}</h1>
      </div>
      <div className="flex items-center gap-4">
        {loading ? (
          <>
            <div className="h-20 w-20 animate-pulse rounded-xl bg-neutral-400/30 dark:bg-neutral-800/50 flex items-center justify-center">
            </div>
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
          <div className="flex flex-col items-start gap-4 w-full">
            <div className="flex items-center gap-4 w-full">
              <div className="h-20 w-20 rounded-xl bg-neutral-400/30 dark:bg-neutral-800/50 flex items-center justify-center">
                <LucidePlay className="text-neutral-600 dark:text-neutral-300 text-3xl" />
              </div>
              <div className="flex-grow">
                <h1 className="text-md font-semibold dark:text-neutral-200">
                  {t('spotify.nothing_here')}
                </h1>
                <p className="text-xs font-semibold text-neutral-400">{t('spotify.placeholder_artist')}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full">
                <span className="text-xs font-semibold text-neutral-400">0:00</span>
                <div className="flex-grow h-1 rounded-full bg-neutral-400/30 dark:bg-neutral-800/50"></div>
                <span className="text-xs font-semibold text-neutral-400">0:00</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 