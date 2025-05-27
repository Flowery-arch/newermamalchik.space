'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useEffect } from 'react';

interface Track {
  title: string;
  artist: string;
  img: string;
  duration: number;
  isPlaying: boolean;
  progress?: number;
}

export default function Music() {
  const { t } = useLanguage();
  const [track, setTrack] = useState<Track | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    console.log('Setting up SSE connection');
    const eventSource = new EventSource('/api/current-track?sse=true');

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('Raw API response:', data);

        if (data.success) {
          console.log('Track data from API:', data.track);
          
          if (data.track) {
            const trackData = {
              title: data.track.title || '',
              artist: data.track.artist || '',
              img: data.track.img || '',
              duration: data.track.duration || 0,
              isPlaying: data.track.isPlaying,
              progress: data.track.progress || 0
            };
            console.log('Processed track data:', trackData);
            console.log('Is playing:', trackData.isPlaying);
            console.log('Progress:', trackData.progress);
            console.log('Duration:', trackData.duration);
            console.log('Previous track:', track);
            console.log('Progress changed:', track?.progress !== trackData.progress);
            setTrack(trackData);
            setError(false);
            setImageError(false);
          } else {
            console.log('No track data');
            setTrack(null);
            setError(false);
          }
        } else {
          console.error('API Error:', data.error);
          setError(true);
        }
      } catch (err) {
        console.error('Parse Error:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    eventSource.onerror = (err) => {
      console.error('SSE Error:', err);
      setError(true);
      setLoading(false);
      eventSource.close();
    };

    return () => {
      console.log('Cleaning up SSE connection');
      eventSource.close();
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
    console.log('Rendering cover/icon. Track:', track);
    console.log('Is playing:', track?.isPlaying);
    console.log('Has image:', !!track?.img);
    console.log('Image error:', imageError);

    if (track?.img && !imageError) {
      return (
        <img 
          src={track.img} 
          alt={track.title} 
          className="w-full h-full object-cover"
          onError={(e) => {
            console.error('Image load error:', track.img);
            setImageError(true);
            e.currentTarget.style.display = 'none';
          }}
          onLoad={() => {
            console.log('Image loaded successfully:', track.img);
          }}
        />
      );
    }

    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-neutral-600 dark:text-neutral-300 sm:w-8 sm:h-8">
        <path d="M15 5V19M21 5V19M3 7.20608V16.7939C3 17.7996 3 18.3024 3.19886 18.5352C3.37141 18.7373 3.63025 18.8445 3.89512 18.8236C4.20038 18.7996 4.55593 18.4441 5.26704 17.733L10.061 12.939C10.3897 12.6103 10.554 12.446 10.6156 12.2565C10.6697 12.0898 10.6697 11.9102 10.6156 11.7435C10.554 11.554 10.3897 11.3897 10.061 11.061L5.26704 6.26704C4.55593 5.55593 4.20038 5.20038 3.89512 5.17636C3.63025 5.15551 3.37141 5.26273 3.19886 5.46476C3 5.69759 3 6.20042 3 7.20608Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  };

  const renderTitle = () => {
    if (loading) return t('loading');
    if (error) return t('music.nothing_here');
    if (!track) return t('music.nothing_here');
    return track.title || t('music.nothing_here');
  };

  const renderArtist = () => {
    if (loading) return '';
    if (error) return t('music.placeholder_artist');
    if (!track) return t('music.placeholder_artist');
    return track.artist || t('music.placeholder_artist');
  };

  const renderDuration = () => {
    if (loading) return '0:00';
    if (error) return '0:00';
    if (!track) return '0:00';
    return track.duration ? formatDuration(track.duration) : '0:00';
  };

  const renderProgress = () => {
    if (loading) return '0:00';
    if (error) return '0:00';
    if (!track) return '0:00';
    console.log('Rendering progress:', track.progress);
    return formatProgress(track.progress || 0);
  };

  const getProgressPercentage = () => {
    if (!track || !track.duration || !track.progress) return 0;
    const percentage = (track.progress / track.duration) * 100;
    console.log('Progress percentage:', percentage);
    return percentage;
  };

  return (
    <div className="easy-in-out grid grid-rows-[auto_1fr] gap-2 sm:gap-4 rounded-xl p-4 sm:p-6 shadow-lg ring-2 ring-neutral-500/20 duration-600 hover:scale-101 dark:bg-neutral-900/10 dark:ring-neutral-300/10">
      <div className="flex items-center gap-2">
        <svg
          className="text-lg text-neutral-800 dark:text-neutral-100/70"
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 192 192"
        >
          <path
            fill="currentColor"
            d="M33.983 16.865a82 82 0 0 1 41.44-15.783v24.744a57.4 57.4 0 1 0 63.681 45.747l20.847-16.914c5.609 15.43 6.383 32.29 2.334 48.252a82.002 82.002 0 0 1-156.724 7.364 82 82 0 0 1 28.422-93.41Z"
            transform="matrix(.92667 0 0 .9285 19.254 19.013)"
          />
          <path
            fill="currentColor"
            d="M144.615 28.68s-10.808 16.62-14.198 22.005a57.69 57.69 0 0 0-19.735-18.12v50.187c0 15.398-12.482 27.88-27.88 27.88-15.397 0-27.88-12.482-27.88-27.88s12.483-27.88 27.88-27.88a27.75 27.75 0 0 1 15.58 4.756V2.23c18.101 3.482 34.484 13.182 46.233 26.45z"
            transform="matrix(.92667 0 0 .9285 19.254 19.013)"
          />
        </svg>
        <h1 className="text-sm text-neutral-800 dark:text-neutral-100/70">{t('music.title')}</h1>
      </div>
      <div className="flex items-center justify-center w-full">
        <div className="flex flex-col items-center w-full gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-4 w-full">
            <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-xl bg-neutral-400/30 dark:bg-neutral-800/50 flex items-center justify-center overflow-hidden">
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
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="sm:w-4 sm:h-4">
                    <path d="M15 5V19M21 5V19M3 7.20608V16.7939C3 17.7996 3 18.3024 3.19886 18.5352C3.37141 18.7373 3.63025 18.8445 3.89512 18.8236C4.20038 18.7996 4.55593 18.4441 5.26704 17.733L10.061 12.939C10.3897 12.6103 10.554 12.446 10.6156 12.2565C10.6697 12.0898 10.6697 11.9102 10.6156 11.7435C10.554 11.554 10.3897 11.3897 10.061 11.061L5.26704 6.26704C4.55593 5.55593 4.20038 5.20038 3.89512 5.17636C3.63025 5.15551 3.37141 5.26273 3.19886 5.46476C3 5.69759 3 6.20042 3 7.20608Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="flex-grow h-0.5 max-w-[300px] rounded-full bg-neutral-400/30 dark:bg-neutral-800/50 relative">
                  <div 
                    className="absolute top-0 left-0 h-full bg-neutral-600 dark:bg-neutral-300 rounded-full transition-all duration-300"
                    style={{ width: `${getProgressPercentage()}%` }}
                  />
                </div>
                <div className="flex gap-1 text-xs font-semibold text-neutral-400">
                  <span>{renderProgress()}</span>
                  <span>/</span>
                  <span>{renderDuration()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 