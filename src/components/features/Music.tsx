'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useEffect } from 'react';

interface Track {
  title: string;
  artist: string;
  album?: string;
  img: string;
  duration: number;
  isPlaying: boolean;
  progress?: number;
  trackUrl?: string;
}

export default function Music() {
  const { t } = useLanguage();
  const [track, setTrack] = useState<Track | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    let isMounted = true;
    const fetchTrack = async () => {
      try {
        const res = await fetch('/api/spotify');
        const data = await res.json();
        if (!isMounted) return;
        if (data.success) {
          if (data.track) {
            const trackData = {
              title: data.track.title || '',
              artist: data.track.artist || '',
              album: data.track.album || '',
              img: data.track.img || '',
              duration: data.track.duration || 0,
              isPlaying: data.track.isPlaying,
              progress: data.track.progress || 0,
              trackUrl: data.track.trackUrl || ''
            };
            setTrack(trackData);
            setError(false);
            setImageError(false);
          } else {
            setTrack(null);
            setError(false);
          }
        } else {
          setError(true);
          console.error('Failed to fetch track:', data.error || 'Unknown error');
        }
      } catch (err) {
        if (isMounted) {
          setError(true);
          console.error('Error fetching track:', err);
          // Увеличиваем интервал при ошибке
          clearInterval(intervalId);
          intervalId = setInterval(fetchTrack, 10000); // Увеличиваем до 10 секунд при ошибке
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchTrack();
    intervalId = setInterval(fetchTrack, 1000); // обновляем каждую секунду для более плавного обновления прогресса
    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const formatProgress = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const renderCoverOrIcon = () => {
    if (track?.img && !imageError && track.isPlaying) {
      return (
        <div className="relative flex items-center justify-center">
          {/* Glowing background */}
          <div
            className="absolute -inset-8 z-0 rounded-2xl blur-2xl"
            style={{
              background: `url(${track.img}) center/cover no-repeat`,
              opacity: 0.5,
              filter: 'blur(40px) saturate(2) brightness(1.5)',
            }}
          />
          {/* Cover image */}
          <img
            src={track.img}
            alt={track.title}
            className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover"
            onError={() => setImageError(true)}
          />
        </div>
      );
    }

    return (
      <div className="relative flex items-center justify-center">
        <div className="absolute -inset-8 z-0 rounded-2xl blur-2xl bg-neutral-400/40 dark:bg-neutral-800/40" />
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10 text-neutral-600 dark:text-neutral-300 w-8 h-8">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.779 1.02.479 1.56-.299.421-1.02.659-1.559.3z" fill="currentColor"/>
        </svg>
      </div>
    );
  };

  const renderTitle = () => {
    if (loading) return t('loading');
    if (error) return t('music.nothing_here');
    if (!track || !track.isPlaying) return t('music.nothing_here');
    return track.title || t('music.nothing_here');
  };

  const renderArtist = () => {
    if (loading) return '';
    if (error) return t('music.placeholder_artist');
    if (!track || !track.isPlaying) return t('music.placeholder_artist');
    return track.artist || t('music.placeholder_artist');
  };

  const renderDuration = () => {
    if (loading) return '0:00';
    if (error) return '0:00';
    if (!track || !track.isPlaying) return '0:00';
    return track.duration ? formatDuration(track.duration) : '0:00';
  };

  const renderProgress = () => {
    if (loading) return '0:00';
    if (error) return '0:00';
    if (!track || !track.isPlaying) return '0:00';
    return formatProgress(track.progress || 0);
  };

  const getProgressPercentage = () => {
    if (!track || !track.duration || track.progress === undefined || !track.isPlaying) return 0;
    return (track.progress / track.duration) * 100;
  };

  return (
    <div className="easy-in-out grid grid-rows-[auto_1fr] gap-2 sm:gap-4 rounded-xl p-4 sm:p-6 shadow-lg ring-2 ring-neutral-500/20 duration-600 hover:scale-101 dark:bg-neutral-900/10 dark:ring-neutral-300/10">
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-lg text-neutral-800 dark:text-neutral-100/70 w-5 h-5">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.779 1.02.479 1.56-.299.421-1.02.659-1.559.3z" fill="currentColor"/>
        </svg>
        <h1 className="text-sm text-neutral-800 dark:text-neutral-100/70">{t('music.title')}</h1>
      </div>
      <div className="flex items-center justify-center w-full">
        <div className="flex flex-col items-center w-full gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-4 w-full">
            <div className="relative flex items-center justify-center h-16 w-16 sm:h-20 sm:w-20 rounded-xl bg-neutral-400/30 dark:bg-neutral-800/50">
              {renderCoverOrIcon()}
            </div>
            <div className="flex-grow flex flex-col gap-1 sm:gap-2">
              <div className="flex flex-col items-center text-center w-full">
                <h1 className="text-sm sm:text-md font-semibold dark:text-neutral-200 line-clamp-1">
                  {renderTitle()}
                </h1>
                <p className="text-xs font-semibold text-neutral-400 line-clamp-1">
                  {renderArtist()}
                </p>
              </div>
              <div className="flex items-center justify-center gap-2 w-full">
                <div className="w-3 h-3 sm:w-4 sm:h-4 text-neutral-800 dark:text-neutral-100">
                  {track?.isPlaying ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                  </svg>
                  )}
                </div>
                <div className="flex-grow flex items-center gap-2">
                  <span className="text-xs text-neutral-400">{renderProgress()}</span>
                  <div className="flex-grow h-1 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-neutral-800 dark:bg-neutral-300"
                      style={{ width: `${getProgressPercentage()}%` }}
                    />
                  </div>
                  <span className="text-xs text-neutral-400">{renderDuration()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 