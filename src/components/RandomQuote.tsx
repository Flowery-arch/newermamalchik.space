// use client directive is recommended for components using hooks like useState/useEffect
'use client';

import React, { useEffect, useState } from 'react';
import { LucideMessageSquareQuote } from 'lucide-react';

const quotes = [
  "Жизнь - это то, что происходит с нами, пока мы строим другие планы. - Джон Леннон",
  "Единственный способ делать великие дела - это любить то, что вы делаете. - Стив Джобс",
  "Будьте тем изменением, которое вы хотите видеть в мире. - Махатма Ганди",
  "Счастье не готовый продукт. Оно приходит от ваших собственных действий. - Далай Лама XIV",
  "Начните с того, что необходимо, затем делайте то, что возможно, и внезапно вы делаете невозможное. - Франциск Ассизский",
  "Программирование — это искусство объяснить дураку, чего от него хочет компьютер. - Алан Перлис",
  "Если код работает — не трогай его. - Народная мудрость",
  "99 маленьких багов в коде, 99 маленьких багов… исправил один, передеплоился — 117 маленьких багов в коде. - Пародия на песню",
  "Сначала пишется работающий код. Потом — красивый. А потом — быстрый. И только потом — комментарии. - Закон программиста-прагматика",
  "Я не ленивый, я просто на режиме энергосбережения. - Программист, который не хочет рефакторить",
  "Ошибка? Это не ошибка, это фича! - Каждый разработчик хотя бы раз",
  "Если debugg-инг — это процесс удаления багов, то программирование — процесс их добавления. - Эдсгер Дейкстра",
  "Лучший код — это отсутствие кода. - Старая мудрость разработчика",
  "Программист — это человек, который решает проблему, о которой вы не знали, способами, которых вы не понимаете.",
  "Git commit -m 'Фикс' — классика жанра. - Анонимный гиттер",
  "Жизнь — как функция: если ничего не возвращает, значит, void. - Программист-философ",
  "Если тебе тяжело, значит, ты движешься в гору. Если легко — возможно, ты падаешь.",
  "Не ошибается тот, кто ничего не делает. Но и ничего не добивается.",
  "Успех — это сумма маленьких усилий, повторяемых изо дня в дня. - Роберт Колльер",
  "Если план не работает — меняй план, а не цель.",
  "Счастье — это не отсутствие проблем, а умение с ними справляться.",
  "Лучший способ предсказать будущее — создать его. - Питер Друкер",
  "Если хочешь идти быстро — иди один. Если хочешь идти далеко — идите вместе. - Африканская пословица",
  "Не бойся быть новичком. Каждый эксперт когда-то был нулём.",
  "Жизнь — это 10% того, что с тобой происходит, и 90% того, как ты на это реагируешь. - Чарльз Свиндолл",
  "Я не прокрастинирую, я жду, когда мой мозг загрузит нужные библиотеки.",
  "Утро начинается не с кофе. Утро начинается с Ctrl+C, Ctrl+V.",
  "Я не знаю, как это работает, но если удалить этот код — всё сломается. - Магия legacy-кода",
  "Если бы люди писали код так же, как строят дома, первый дятел уничтожил бы цивилизацию. - Gerald Weinberg",
  "Программирование — единственная профессия, где можно весь день биться головой о стол и называть это работой.",
  "Я не сошёл с ума, у меня просто сборка в продакшене.",
  "Жизнь — это баг в матрице. И мы все — его эксплойты.",
  "Если бы у меня был доллар за каждый раз, когда я искал ошибку в коде и находил её в последнем месте, куда смотрел… Я бы нашёл баг в этой системе денег.",
  "Компьютер делает то, что ты ему сказал, а не то, что ты хотел. - Закон программирования №1",
  "Если твой код выглядит идеально, значит, ты что-то упустил."
];

const RandomQuote: React.FC = () => {
  const [quote, setQuote] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const getMoscowTimeDate = () => {
      const now = new Date();
      // Get UTC milliseconds and add milliseconds for UTC+3 (Moscow time)
      const moscowTimeMilliseconds = now.getTime() + (3 * 60 * 60 * 1000) + now.getTimezoneOffset() * 60 * 1000;
      return new Date(moscowTimeMilliseconds);
    };

    const selectDailyQuote = () => {
      const moscowDate = getMoscowTimeDate();
      // Use the day of the year (or a simple combination of year and day) as a seed
      // This ensures the same quote for the same day MSK
      const startOfYear = new Date(moscowDate.getUTCFullYear(), 0, 0);
      const dayOfYear = Math.floor((moscowDate.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));
      const seed = moscowDate.getUTCFullYear() * 1000 + dayOfYear; // Simple deterministic seed

      // Simple pseudo-random index based on the seed
      const pseudoRandom = (seed * 9301 + 49297) % 233280;
      const randomIndex = Math.floor(pseudoRandom / (233280 / quotes.length));
      
      setQuote(quotes[randomIndex]);
    };

    const setDailyQuoteTimer = () => {
      const nowMSK = getMoscowTimeDate();
      const tomorrowMSK = new Date(nowMSK);
      tomorrowMSK.setUTCDate(nowMSK.getUTCDate() + 1);
      tomorrowMSK.setUTCHours(0, 0, 0, 0);
      // Adjust to UTC time for setTimeout
      const tomorrowUTC = new Date(tomorrowMSK.getTime() - (3 * 60 * 60 * 1000));
      
      const timerId = setTimeout(() => {
        selectDailyQuote(); // Change the quote for the new day
        setDailyQuoteTimer(); // Set the timer for the next day
        // Reset countdown when quote changes
        startCountdown();
      }, tomorrowUTC.getTime() - new Date().getTime()); // Calculate time until next midnight UTC

      return timerId;
    };

    const startCountdown = () => {
      const nowMSK = getMoscowTimeDate();
      const tomorrowMSK = new Date(nowMSK);
      tomorrowMSK.setUTCDate(nowMSK.getUTCDate() + 1);
      tomorrowMSK.setUTCHours(0, 0, 0, 0);
      // Adjust to UTC time for calculation
      const tomorrowUTC = new Date(tomorrowMSK.getTime() - (3 * 60 * 60 * 1000));

      const initialTimeLeft = Math.max(0, Math.floor((tomorrowUTC.getTime() - new Date().getTime()) / 1000));
      setTimeLeft(initialTimeLeft);

      const intervalId = setInterval(() => {
        setTimeLeft(prevTimeLeft => {
          if (prevTimeLeft <= 1) {
            clearInterval(intervalId);
            return 0;
          }
          return prevTimeLeft - 1;
        });
      }, 1000);
      return intervalId;
    };

    // Select initial quote for the current day and set the daily timer
    selectDailyQuote();
    const dailyTimerId = setDailyQuoteTimer();
    const countdownIntervalId = startCountdown();

    // Cleanup timers on component unmount
    return () => {
      clearTimeout(dailyTimerId);
      clearInterval(countdownIntervalId);
    };
  }, []);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className="rounded-xl p-6 shadow-lg ring-2 ring-neutral-500/20 dark:ring-neutral-300/10 bg-white/80 dark:bg-neutral-900/10">
      <div className="grid gap-2">
        <div className="flex items-center gap-2">
          <LucideMessageSquareQuote className="text-lg text-neutral-800 dark:text-neutral-100/70" />
          <p className="text-sm text-neutral-800 dark:text-neutral-100/70">quote.js</p>
          <span className="ml-auto text-xs text-neutral-500 dark:text-neutral-400">До новой цитаты: {formatTime(timeLeft)}</span>
        </div>
        <p className="text-sm text-neutral-700 dark:text-neutral-300 italic">
          "{quote}"
        </p>
      </div>
    </div>
  );
};

export default RandomQuote; 