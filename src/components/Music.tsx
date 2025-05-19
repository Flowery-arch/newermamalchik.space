'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function Music() {
  const { t } = useLanguage();

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
      <div className="flex items-center gap-2 sm:gap-4 w-full">
        <div className="flex flex-col items-start gap-2 sm:gap-4 w-full">
          <div className="flex items-center gap-2 sm:gap-4 w-full">
            <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-xl bg-neutral-400/30 dark:bg-neutral-800/50 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-neutral-600 dark:text-neutral-300 sm:w-8 sm:h-8">
                <path d="M15 5V19M21 5V19M3 7.20608V16.7939C3 17.7996 3 18.3024 3.19886 18.5352C3.37141 18.7373 3.63025 18.8445 3.89512 18.8236C4.20038 18.7996 4.55593 18.4441 5.26704 17.733L10.061 12.939C10.3897 12.6103 10.554 12.446 10.6156 12.2565C10.6697 12.0898 10.6697 11.9102 10.6156 11.7435C10.554 11.554 10.3897 11.3897 10.061 11.061L5.26704 6.26704C4.55593 5.55593 4.20038 5.20038 3.89512 5.17636C3.63025 5.15551 3.37141 5.26273 3.19886 5.46476C3 5.69759 3 6.20042 3 7.20608Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="flex-grow flex flex-col gap-1 sm:gap-2">
              <div className="flex flex-col items-center">
                <h1 className="text-sm sm:text-md font-semibold dark:text-neutral-200 line-clamp-1">
                  {t('music.nothing_here')}
                </h1>
                <p className="text-xs font-semibold text-neutral-400 line-clamp-1">{t('music.placeholder_artist')}</p>
              </div>
              <div className="flex items-center gap-2 w-full pl-16 sm:pl-24">
                <div className="w-3 h-3 sm:w-4 sm:h-4 text-neutral-800 dark:text-neutral-100">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="sm:w-4 sm:h-4">
                    <path d="M15 5V19M21 5V19M3 7.20608V16.7939C3 17.7996 3 18.3024 3.19886 18.5352C3.37141 18.7373 3.63025 18.8445 3.89512 18.8236C4.20038 18.7996 4.55593 18.4441 5.26704 17.733L10.061 12.939C10.3897 12.6103 10.554 12.446 10.6156 12.2565C10.6697 12.0898 10.6697 11.9102 10.6156 11.7435C10.554 11.554 10.3897 11.3897 10.061 11.061L5.26704 6.26704C4.55593 5.55593 4.20038 5.20038 3.89512 5.17636C3.63025 5.15551 3.37141 5.26273 3.19886 5.46476C3 5.69759 3 6.20042 3 7.20608Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
            </div>
                <div className="flex-grow h-0.5 max-w-[300px] rounded-full bg-neutral-400/30 dark:bg-neutral-800/50"></div>
                <span className="text-xs font-semibold text-neutral-400">0:00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 