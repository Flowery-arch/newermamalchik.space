# 🚀 Портфолио newermamalchik

![Portfolio Screenshot]![image](https://github.com/user-attachments/assets/1e409add-3097-434f-9270-18e747069355)

## ✨ О проекте

Персональный сайт-портфолио, разработанный с использованием современных технологий веб-разработки. Демонстрирует навыки веб-разработки на TypeScript, Vue/Next.js и Java для модификаций игр.

## 🛠️ Технологии

### Frontend
- **Next.js 15** - React фреймворк с App Router
- **React 19** - Библиотека для создания пользовательских интерфейсов
- **TypeScript** - Статическая типизация для JavaScript
- **Tailwind CSS** - Utility-first CSS фреймворк
- **Framer Motion** - Библиотека анимаций для React
- **Next Themes** - Поддержка темной/светлой темы
- **Lucide React** - Иконки

### SEO & Performance
- **Структурированные данные** (JSON-LD)
- **Open Graph** метатеги
- **Sitemap** и **robots.txt**
- **PWA** поддержка
- **Оптимизация изображений**
- **Lazy loading** компонентов

### Интеграции
- **GitHub API** - Статистика репозиториев
- **Spotify API** - Текущая музыка
- **Weather API** - Погода
- **Exchange Rates API** - Курсы валют

## 🌟 Функциональность

### Основные возможности
- 📱 **Адаптивный дизайн** - Работает на всех устройствах
- 🌙 **Темная/светлая тема** - Автоматическое переключение
- 🌍 **Многоязычность** - Русский, английский, японский
- 🎨 **Современный дизайн** - Glassmorphism эффекты
- ⚡ **Высокая производительность** - Optimized bundle size
- 🔍 **SEO оптимизация** - Structured data, meta tags

### Виджеты
- 🎵 **Музыкальный плеер** - Показывает текущую музыку
- 🌤️ **Погода** - Актуальная погода
- 💰 **Курсы валют** - Актуальные курсы
- ⏰ **Часы** - Местное время
- 📊 **GitHub статистика** - Активность и репозитории
- 💬 **Случайные цитаты** - Мотивирующие цитаты

### Анимации
- 🎭 **Framer Motion** - Плавные анимации
- 🌊 **Parallax эффекты** - Погружение в контент
- ✨ **Hover эффекты** - Интерактивные элементы
- 🎪 **Loading состояния** - Красивые индикаторы

## 📁 Структура проекта

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── globals.css        # Глобальные стили
│   ├── layout.tsx         # Основной layout
│   ├── metadata.ts        # SEO метаданные
│   └── page.tsx           # Главная страница
├── components/            # React компоненты
│   ├── features/          # Функциональные компоненты
│   │   ├── Clock.tsx      # Часы
│   │   ├── Weather.tsx    # Погода
│   │   ├── Music.tsx      # Музыка
│   │   └── GitHubStats.tsx # GitHub статистика
│   ├── layouts/           # Компоненты макетов
│   ├── navigation/        # Навигация
│   │   └── Navigation.tsx # Главная навигация
│   ├── sections/          # Секции страниц
│   │   ├── About.tsx      # О себе
│   │   └── Projects.tsx   # Проекты
│   └── ui/                # UI компоненты
│       ├── OptimizedImage.tsx  # Оптимизированные изображения
│       └── ThemeTransition.tsx # Переходы тем
├── constants/             # Константы
├── contexts/              # React контексты
│   └── LanguageContext.tsx # Контекст языка
├── lib/                   # Утилиты и хуки
│   ├── useParallax.ts     # Parallax hook
│   └── utils.ts           # Вспомогательные функции
├── styles/                # Стили
│   ├── globals.css        # Глобальные стили
│   └── system24.css       # Системные стили
├── types/                 # TypeScript типы
└── utils/                 # Вспомогательные функции
    └── JsonLdSchema.tsx   # Структурированные данные
```

## 🚀 Запуск проекта

### Требования
- Node.js 18.17 или новее
- npm, yarn, pnpm или bun

### Установка
```bash
# Клонирование репозитория
git clone https://github.com/Flowery-arch/newermamalchik.space.git

# Переход в директорию проекта
cd newermamalchik.space

# Установка зависимостей
npm install
# или
yarn install
# или
pnpm install
# или
bun install
```

### Настройка окружения
```bash
# Создание файла окружения
cp env.example .env.local

# Настройка переменных окружения
# Добавьте ваши API ключи в .env.local
```

### Запуск в режиме разработки
```bash
npm run dev
# или
yarn dev
# или
pnpm dev
# или
bun dev
```

### Сборка для продакшена
```bash
npm run build
npm run start
```

## 🔧 API интеграции

### GitHub API
```typescript
// Получение статистики репозиториев
const response = await fetch('/api/github-stats')
const data = await response.json()
```

### Spotify API
```typescript
// Получение текущей музыки
const response = await fetch('/api/spotify-current')
const data = await response.json()
```

### Weather API
```typescript
// Получение погоды
const response = await fetch('/api/weather')
const data = await response.json()
```

## 🎨 Стилизация

### Tailwind CSS
Проект использует Tailwind CSS с кастомными настройками:
- Расширенная цветовая палитра
- Кастомные анимации
- Responsive breakpoints
- Glassmorphism эффекты

### CSS переменные
```css
:root {
  --primary-50: #f0f9ff;
  --primary-500: #0ea5e9;
  --glass-bg: rgba(255, 255, 255, 0.1);
  --glass-border: rgba(255, 255, 255, 0.2);
}
```

## 🌐 Многоязычность

Поддерживаются языки:
- 🇷🇺 Русский (по умолчанию)
- 🇺🇸 Английский
- 🇯🇵 Японский

```typescript
// Переключение языка
const { language, setLanguage, t } = useLanguage()
setLanguage('en') // ru, en, ja
```

## 📊 SEO оптимизация

### Структурированные данные
- Person schema
- WebSite schema
- Organization schema
- Breadcrumb schema

### Meta теги
- Open Graph
- Twitter Cards
- Favicon
- Web App Manifest

### Производительность
- Image optimization
- Bundle splitting
- Lazy loading
- Caching strategies

## 🔐 Безопасность

- CSP headers
- Secure API endpoints
- Input validation
- XSS protection

## 📱 PWA поддержка

- Web App Manifest
- Service Worker
- Offline functionality
- Install prompts

## 🧪 Тестирование

```bash
# Запуск тестов
npm run test

# Линтинг
npm run lint

# Форматирование кода
npm run format
```

## 🚀 Деплой

### Vercel (рекомендуется)
```bash
# Установка Vercel CLI
npm i -g vercel

# Деплой
vercel
```

### Другие платформы
- Netlify
- GitHub Pages
- Railway
- Render

## 📈 Аналитика

- Google Analytics
- Yandex Metrica
- Performance monitoring
- Error tracking

## 🛡️ Лицензия

© 2025–2026 newermamalchik. Все права защищены.

## 📞 Контакты

- 📧 **Telegram**: [@mkphotoss](https://t.me/mkphotoss)
- 🎮 **Discord**: [newermamalchik](https://discord.com/users/660534347429969931)
- 💻 **GitHub**: [Flowery-arch](https://github.com/Flowery-arch)

## 🙏 Благодарности

Спасибо всем, кто использует и поддерживает этот проект!

---

<div align="center">
Made with ❤️ by newermamalchik
</div>
