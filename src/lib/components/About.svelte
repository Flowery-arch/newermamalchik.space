<script lang="ts">
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';

	let sectionRef: HTMLElement;
	let visible = $state(false);
	let weather = $state<{
		temp: number;
		tempF: number;
		description: string;
		uvIndex: number;
		airQuality: number;
	} | null>(null);

	const discordUserId = '660534347429969931';
	const githubUsername = 'Flowery-arch';

	const systemInfo = {
		os: 'Arch Linux',
		cpu: 'Ryzen 5 5500',
		gpu: 'RTX 4060',
		ram: '32GB'
	};

	// Расширенная информация о системе (как в neofetch)
	const fullSystemInfo = {
		user: 'newer',
		host: 'newer',
		os: 'Arch x86_64',
		kernel: '6.18.5-arch1-1',
		uptime: '~6 hours',
		packages: '1078 (pacman)',
		shell: 'zsh 5.9',
		resolution: '2560x1080@200Hz, 1920x1080@165Hz',
		de: 'Hyprland',
		wm: 'Wayland',
		terminal: 'kitty',
		cpu: 'AMD Ryzen 5 5500 (12) @ 4.27 GHz',
		gpu: 'NVIDIA GeForce RTX 4060',
		memory: '~17 GiB / 31 GiB'
	};

	// Modal states
	let showSystemModal = $state(false);
	let systemModalFullscreen = $state(false);
	let systemModalMinimized = $state(false);

	let showSpotifyModal = $state(false);
	let spotifyModalFullscreen = $state(false);
	let spotifyModalMinimized = $state(false);

	let showWeatherModal = $state(false);
	let weatherModalFullscreen = $state(false);
	let weatherModalMinimized = $state(false);

	let showAboutModal = $state(false);
	let aboutModalFullscreen = $state(false);
	let aboutModalMinimized = $state(false);

	// Minimized modals tracker
	let minimizedModals = $state<{id: string, title: string, icon: string}[]>([]);

	// Tiled modals for Hyprland-style view
	let tiledModals = $state<string[]>([]);
	let showTiledView = $state(false);
	let activeTiledModal = $state<string | null>(null);

	// Code snippet for About modal
	const codeSnippet = `<script>
  import About from './About.svelte';
<` + `/script>

<About />`;
	let codeCopied = $state(false);
	let skillsCollapsed = $state(false);

	async function copyCode() {
		await navigator.clipboard.writeText(codeSnippet);
		codeCopied = true;
		setTimeout(() => codeCopied = false, 2000);
	}

	// System Modal
	function openSystemModal() {
		showSystemModal = true;
		systemModalFullscreen = false;
		systemModalMinimized = false;
		document.body.style.overflow = 'hidden';
		minimizedModals = minimizedModals.filter(m => m.id !== 'system');
	}

	function closeSystemModal() {
		showSystemModal = false;
		systemModalFullscreen = false;
		systemModalMinimized = false;
		document.body.style.overflow = '';
		minimizedModals = minimizedModals.filter(m => m.id !== 'system');
	}

	function minimizeSystemModal() {
		systemModalMinimized = true;
		showSystemModal = false;
		document.body.style.overflow = '';
		if (!minimizedModals.find(m => m.id === 'system')) {
			minimizedModals = [...minimizedModals, { id: 'system', title: 'Система', icon: 'mingcute:laptop-line' }];
		}
	}

	function restoreSystemModal() {
		systemModalMinimized = false;
		showSystemModal = true;
		document.body.style.overflow = 'hidden';
		minimizedModals = minimizedModals.filter(m => m.id !== 'system');
	}

	function toggleSystemFullscreen() {
		systemModalFullscreen = !systemModalFullscreen;
	}

	// Spotify Modal
	function openSpotifyModal() {
		showSpotifyModal = true;
		spotifyModalFullscreen = false;
		spotifyModalMinimized = false;
		document.body.style.overflow = 'hidden';
		minimizedModals = minimizedModals.filter(m => m.id !== 'spotify');
	}

	function closeSpotifyModal() {
		showSpotifyModal = false;
		spotifyModalFullscreen = false;
		spotifyModalMinimized = false;
		document.body.style.overflow = '';
		minimizedModals = minimizedModals.filter(m => m.id !== 'spotify');
	}

	function minimizeSpotifyModal() {
		spotifyModalMinimized = true;
		showSpotifyModal = false;
		document.body.style.overflow = '';
		if (!minimizedModals.find(m => m.id === 'spotify')) {
			minimizedModals = [...minimizedModals, { id: 'spotify', title: 'Spotify', icon: 'mingcute:music-2-line' }];
		}
	}

	function restoreSpotifyModal() {
		spotifyModalMinimized = false;
		showSpotifyModal = true;
		document.body.style.overflow = 'hidden';
		minimizedModals = minimizedModals.filter(m => m.id !== 'spotify');
	}

	function toggleSpotifyFullscreen() {
		spotifyModalFullscreen = !spotifyModalFullscreen;
	}

	// Weather Modal
	function openWeatherModal() {
		showWeatherModal = true;
		weatherModalFullscreen = false;
		weatherModalMinimized = false;
		document.body.style.overflow = 'hidden';
		minimizedModals = minimizedModals.filter(m => m.id !== 'weather');
	}

	function closeWeatherModal() {
		showWeatherModal = false;
		weatherModalFullscreen = false;
		weatherModalMinimized = false;
		document.body.style.overflow = '';
		minimizedModals = minimizedModals.filter(m => m.id !== 'weather');
	}

	function minimizeWeatherModal() {
		weatherModalMinimized = true;
		showWeatherModal = false;
		document.body.style.overflow = '';
		if (!minimizedModals.find(m => m.id === 'weather')) {
			minimizedModals = [...minimizedModals, { id: 'weather', title: 'Погода', icon: 'mingcute:sun-line' }];
		}
	}

	function restoreWeatherModal() {
		weatherModalMinimized = false;
		showWeatherModal = true;
		document.body.style.overflow = 'hidden';
		minimizedModals = minimizedModals.filter(m => m.id !== 'weather');
	}

	function toggleWeatherFullscreen() {
		weatherModalFullscreen = !weatherModalFullscreen;
	}

	// About Modal
	function openAboutModal() {
		showAboutModal = true;
		aboutModalFullscreen = false;
		aboutModalMinimized = false;
		document.body.style.overflow = 'hidden';
		minimizedModals = minimizedModals.filter(m => m.id !== 'about');
	}

	function closeAboutModal() {
		showAboutModal = false;
		aboutModalFullscreen = false;
		aboutModalMinimized = false;
		document.body.style.overflow = '';
		minimizedModals = minimizedModals.filter(m => m.id !== 'about');
	}

	function minimizeAboutModal() {
		aboutModalMinimized = true;
		showAboutModal = false;
		document.body.style.overflow = '';
		if (!minimizedModals.find(m => m.id === 'about')) {
			minimizedModals = [...minimizedModals, { id: 'about', title: 'Обо мне', icon: 'mingcute:user-4-line' }];
		}
	}

	function restoreAboutModal() {
		aboutModalMinimized = false;
		showAboutModal = true;
		document.body.style.overflow = 'hidden';
		minimizedModals = minimizedModals.filter(m => m.id !== 'about');
	}

	function toggleAboutFullscreen() {
		aboutModalFullscreen = !aboutModalFullscreen;
	}

	function restoreModal(id: string) {
		if (id === 'system') restoreSystemModal();
		else if (id === 'spotify') restoreSpotifyModal();
		else if (id === 'weather') restoreWeatherModal();
		else if (id === 'about') restoreAboutModal();
	}

	// Open all minimized modals in tiled view
	function openTiledView() {
		if (minimizedModals.length > 1) {
			tiledModals = minimizedModals.map(m => m.id);
			showTiledView = true;
			activeTiledModal = tiledModals[0];
			document.body.style.overflow = 'hidden';
		} else if (minimizedModals.length === 1) {
			restoreModal(minimizedModals[0].id);
		}
	}

	function closeTiledView() {
		// Close all minimized modals completely
		tiledModals = [];
		showTiledView = false;
		activeTiledModal = null;
		minimizedModals = [];

		// Reset all minimized states
		systemModalMinimized = false;
		spotifyModalMinimized = false;
		weatherModalMinimized = false;
		aboutModalMinimized = false;

		document.body.style.overflow = '';
	}

	function selectTiledModal(id: string) {
		activeTiledModal = id;
	}

	function expandFromTiled(id: string) {
		// Close tiled view completely and open clicked modal
		tiledModals = [];
		showTiledView = false;
		activeTiledModal = null;
		minimizedModals = [];

		// Reset all minimized states
		systemModalMinimized = false;
		spotifyModalMinimized = false;
		weatherModalMinimized = false;
		aboutModalMinimized = false;

		// Open the clicked modal
		restoreModal(id);
	}

	function closeFromTiled(id: string) {
		tiledModals = tiledModals.filter(m => m !== id);
		minimizedModals = minimizedModals.filter(m => m.id !== id);

		// Reset the minimized state
		if (id === 'system') systemModalMinimized = false;
		else if (id === 'spotify') spotifyModalMinimized = false;
		else if (id === 'weather') weatherModalMinimized = false;
		else if (id === 'about') aboutModalMinimized = false;

		if (tiledModals.length <= 1) {
			if (tiledModals.length === 1) {
				const lastId = tiledModals[0];
				tiledModals = [];
				showTiledView = false;
				activeTiledModal = null;
				restoreModal(lastId);
			} else {
				showTiledView = false;
				activeTiledModal = null;
				document.body.style.overflow = '';
			}
		} else {
			activeTiledModal = tiledModals[0];
		}
	}

	function getModalContent(id: string) {
		return { id, title: getModalTitle(id), icon: getModalIcon(id) };
	}

	function getModalTitle(id: string): string {
		if (id === 'system') return 'Система';
		if (id === 'spotify') return 'Spotify';
		if (id === 'weather') return 'Погода';
		if (id === 'about') return 'Обо мне';
		return '';
	}

	function getModalIcon(id: string): string {
		if (id === 'system') return 'mingcute:laptop-line';
		if (id === 'spotify') return 'mingcute:music-2-line';
		if (id === 'weather') return 'mingcute:sun-line';
		if (id === 'about') return 'mingcute:user-4-line';
		return '';
	}

	// Spotify - текущий трек с прогрессом
	let currentTrack = $state<{
		name: string;
		artist: string;
		album?: string;
		cover?: string;
		isPlaying: boolean;
		progress: number;
		duration: number;
		deviceName?: string;
		volumePercent?: number;
	} | null>(null);

	// GitHub contributions
	let contributions = $state<{ date: string; count: number; level: number }[]>([]);
	let totalContributions = $state(0);

	// GitHub activity (recent commits)
	let recentActivity = $state<{
		repo: string;
		commits: number;
		url: string;
	}[]>([]);

	function formatTime(ms: number): string {
		const seconds = Math.floor(ms / 1000);
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}:${secs.toString().padStart(2, '0')}`;
	}

	async function fetchContributions() {
		try {
			// Используем GitHub GraphQL API через прокси или публичный сервис
			const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${githubUsername}?y=last`);
			const data = await res.json();

			if (data.contributions) {
				// Берем весь год (365 дней)
				const allDays = data.contributions.flat();
				contributions = allDays.map((day: any) => ({
					date: day.date,
					count: day.count,
					level: day.level
				}));
				totalContributions = data.total?.lastYear || allDays.reduce((sum: number, d: any) => sum + d.count, 0);
			}
		} catch {
			contributions = [];
		}
	}

	async function fetchActivity() {
		try {
			const res = await fetch(`https://api.github.com/users/${githubUsername}/events/public?per_page=30`);
			const events = await res.json();

			// Группируем PushEvent по репозиториям
			const repoCommits = new Map<string, { commits: number; url: string }>();

			for (const event of events) {
				if (event.type === 'PushEvent') {
					const repoName = event.repo.name.split('/')[1];
					const existing = repoCommits.get(repoName);
					const commitCount = event.payload.commits?.length || 1;

					if (existing) {
						existing.commits += commitCount;
					} else {
						repoCommits.set(repoName, {
							commits: commitCount,
							url: `https://github.com/${event.repo.name}`
						});
					}
				}
			}

			// Берем топ-3 репозитория
			recentActivity = Array.from(repoCommits.entries())
				.map(([repo, data]) => ({ repo, ...data }))
				.slice(0, 3);
		} catch {
			recentActivity = [];
		}
	}

	function getContributionColor(level: number): string {
		const colors = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'];
		return colors[level] || colors[0];
	}

	async function fetchSpotify() {
		try {
			const res = await fetch('/api/spotify/now-playing');
			const data = await res.json();

			if (data.isPlaying && data.title) {
				currentTrack = {
					name: data.title,
					artist: data.artist,
					album: data.album,
					cover: data.albumImageUrl,
					isPlaying: true,
					progress: data.progress || 0,
					duration: data.duration || 0,
					deviceName: data.deviceName,
					volumePercent: data.volumePercent
				};
			} else {
				currentTrack = null;
			}
		} catch {
			currentTrack = null;
		}
	}

	async function fetchWeather() {
		try {
			// Получаем погоду с UV индексом
			const weatherRes = await fetch('https://api.open-meteo.com/v1/forecast?latitude=59.9343&longitude=30.3351&current=temperature_2m,weather_code,uv_index&timezone=Europe/Moscow');
			const weatherData = await weatherRes.json();

			// Получаем качество воздуха
			const airRes = await fetch('https://air-quality-api.open-meteo.com/v1/air-quality?latitude=59.9343&longitude=30.3351&current=european_aqi&timezone=Europe/Moscow');
			const airData = await airRes.json();

			const temp = Math.round(weatherData.current.temperature_2m);
			const tempF = Math.round(temp * 9/5 + 32);
			const code = weatherData.current.weather_code;
			const uvIndex = weatherData.current.uv_index || 0;
			const airQuality = airData.current?.european_aqi || 50;

			let description = 'Ясно';
			if (code === 0) description = 'Ясно';
			else if (code <= 3) description = 'Облачно';
			else if (code <= 49) description = 'Дымка';
			else if (code <= 69) description = 'Дождь';
			else if (code <= 79) description = 'Снег';
			else if (code <= 99) description = 'Гроза';

			weather = { temp, tempF, description, uvIndex, airQuality };
		} catch {
			weather = { temp: -3, tempF: 27, description: 'Облачно', uvIndex: 0, airQuality: 50 };
		}
	}

	function getUvColor(uv: number): string {
		if (uv <= 2) return '#22c55e';
		if (uv <= 5) return '#eab308';
		if (uv <= 7) return '#f97316';
		return '#ef4444';
	}

	function getAirColor(aqi: number): string {
		if (aqi <= 50) return '#22c55e';
		if (aqi <= 100) return '#84cc16';
		if (aqi <= 150) return '#eab308';
		return '#ef4444';
	}

	onMount(() => {
		fetchWeather();
		fetchSpotify();
		fetchContributions();
		fetchActivity();

		// Обновляем Spotify каждую секунду для плавного прогресса
		const spotifyInterval = setInterval(fetchSpotify, 1000);
		// Обновляем GitHub contributions каждые 5 минут
		const contributionsInterval = setInterval(fetchContributions, 300000);
		// Обновляем activity каждые 5 минут
		const activityInterval = setInterval(fetchActivity, 300000);

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) visible = true;
			},
			{ threshold: 0.1 }
		);
		if (sectionRef) observer.observe(sectionRef);
		return () => {
			observer.disconnect();
			clearInterval(spotifyInterval);
			clearInterval(contributionsInterval);
			clearInterval(activityInterval);
		};
	});
</script>

<section id="about" bind:this={sectionRef} class="py-16 md:py-24 px-4 md:px-6">
	<div class="max-w-6xl mx-auto {visible ? 'animate-in' : 'opacity-0'}">

		<div class="mb-6 md:mb-8">
			<h2 class="text-2xl md:text-3xl font-bold text-[#fafafa] font-[family-name:var(--font-raleway)] mb-1 md:mb-2">
				Обо мне
			</h2>
			<p class="text-[#71717a] text-[12px] md:text-[14px]">Немного информации</p>
		</div>

		<div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">

			<!-- Main info card -->
			<button
				onclick={openAboutModal}
				class="col-span-2 bento-item p-4 md:p-6 text-left cursor-pointer hover:border-[#3f3f46] smooth group"
			>
				<div class="flex items-center justify-between mb-1 md:mb-2">
					<h3 class="text-[#fafafa] font-medium text-base md:text-lg">newer__</h3>
					<Icon icon="mingcute:arrow-right-up-line" class="text-[#52525b] group-hover:text-[#a1a1aa] smooth" width="14" />
				</div>
				<p class="text-[#a1a1aa] text-[12px] md:text-[14px] leading-relaxed mb-3 md:mb-4">
					Специализируюсь на создании веб-платформ для Minecraft проектов,
					Discord ботов и API сервисов.
					<span class="hidden sm:inline">Создаю функциональные сайты, автоматизирую процессы через ботов.</span>
				</p>
				<div class="flex gap-2 md:gap-3">
					<span class="p-1.5 md:p-2 rounded-lg bg-white/5 border border-white/10 text-[#a1a1aa]">
						<Icon icon="mingcute:telegram-line" width="16" class="md:w-[18px] md:h-[18px]" />
					</span>
					<span class="p-1.5 md:p-2 rounded-lg bg-white/5 border border-white/10 text-[#a1a1aa]">
						<Icon icon="mingcute:discord-line" width="16" class="md:w-[18px] md:h-[18px]" />
					</span>
					<span class="p-1.5 md:p-2 rounded-lg bg-white/5 border border-white/10 text-[#a1a1aa]">
						<Icon icon="mingcute:github-line" width="16" class="md:w-[18px] md:h-[18px]" />
					</span>
				</div>
			</button>

			<!-- Weather card -->
			<button
				onclick={openWeatherModal}
				class="col-span-2 bento-item px-4 md:px-6 py-4 md:py-5 text-left cursor-pointer hover:border-[#3f3f46] smooth group"
			>
				<div class="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0 mb-3 md:mb-4">
					<div class="flex gap-2 md:gap-3 items-center">
						<Icon icon="mingcute:sun-line" class="text-[#a1a1aa] opacity-80" width="14" />
						<p class="text-[#a1a1aa] text-[11px] md:text-[12px]">Погода</p>
					</div>
					<div class="flex gap-2 md:gap-3 items-center">
						<Icon icon="tabler:map-pin" class="text-white/60" width="14" />
						<p class="text-white text-[11px] md:text-[12px]">Санкт-Петербург</p>
						<Icon icon="mingcute:arrow-right-up-line" class="text-[#52525b] group-hover:text-[#a1a1aa] smooth" width="14" />
					</div>
				</div>

				{#if weather}
					<div class="flex flex-col gap-1.5 md:gap-2 items-start">
						<h1 class="font-[family-name:var(--font-raleway)] text-white text-[16px] md:text-[18px] font-semibold">
							{weather.description}
						</h1>
						<div class="flex gap-2 md:gap-4 items-center">
							<p class="text-white/50 text-[11px] md:text-[12px]">Температура:</p>
							<p class="text-white/70 text-[11px] md:text-[12px]">
								{weather.temp} °C
								<span class="text-[10px] md:text-[11px] opacity-40">•</span>
								{weather.tempF} °F
							</p>
						</div>
						<div class="flex flex-wrap gap-3 md:gap-6 items-center w-full">
							<div class="flex gap-2 md:gap-3 items-center">
								<p class="text-white/50 text-[11px] md:text-[12px]">UV:</p>
								<p class="text-[11px] md:text-[12px]" style="color: {getUvColor(weather.uvIndex)}">
									{weather.uvIndex.toFixed(1)}
								</p>
							</div>
							<div class="flex gap-2 md:gap-3 items-center">
								<p class="text-white/50 text-[11px] md:text-[12px]">Воздух:</p>
								<p class="text-[11px] md:text-[12px]" style="color: {getAirColor(weather.airQuality)}">
									{weather.airQuality}
								</p>
							</div>
						</div>
					</div>
				{:else}
					<div class="text-[#71717a] text-[12px] md:text-[13px]">Загрузка...</div>
				{/if}
			</button>

			<!-- Spotify card -->
			<button
				onclick={openSpotifyModal}
				class="col-span-2 md:col-span-3 bento-item p-4 md:p-6 relative text-left cursor-pointer hover:border-[#3f3f46] smooth group"
			>
				<div class="absolute top-4 right-4">
					<Icon icon="mingcute:arrow-right-up-line" class="text-[#52525b] group-hover:text-[#a1a1aa] smooth" width="14" />
				</div>
				<div class="relative flex flex-row gap-4 md:gap-8 items-center">
					<!-- Album cover with glow -->
					<div class="flex relative shrink-0">
						{#if currentTrack?.cover}
							<div class="relative">
								<!-- Subtle glow effect behind cover -->
								<div class="absolute -inset-2 md:-inset-3 blur-xl md:blur-2xl opacity-40">
									<img src={currentTrack.cover} alt="" class="size-20 md:size-26 rounded-xl" />
								</div>
								<!-- Main cover image -->
								<img
									src={currentTrack.cover}
									alt="Album"
									class="relative size-14 md:size-20 rounded-lg md:rounded-xl object-cover shadow-2xl ring-1 ring-white/10"
								/>
							</div>
						{:else}
							<div class="flex justify-center items-center text-center size-14 md:size-20 rounded-lg md:rounded-xl bg-neutral-900/50 ring-1 ring-white/10">
								<Icon icon="mingcute:music-2-line" class="text-[#71717a]" width="20" />
							</div>
						{/if}
					</div>

					<!-- Track info and progress -->
					<div class="flex flex-col gap-1.5 md:gap-2 w-full min-w-0">
						<div class="flex flex-col gap-1 items-start">
							<div class="gap-2 md:gap-4 flex items-center w-full">
								<h1 class="font-[family-name:var(--font-raleway)] text-[#fafafa] font-semibold text-[14px] md:text-[18px] truncate">
									{currentTrack ? currentTrack.name : "Сейчас ничего не играет"}
								</h1>
								{#if currentTrack?.isPlaying}
									<div class="flex gap-0.5 md:gap-1 items-center shrink-0">
										<span class="w-0.5 md:w-1 h-2 md:h-3 bg-green-500 rounded-full animate-pulse"></span>
										<span class="w-0.5 md:w-1 h-3 md:h-4 bg-green-500 rounded-full animate-pulse" style="animation-delay: 0.2s"></span>
										<span class="w-0.5 md:w-1 h-1.5 md:h-2 bg-green-500 rounded-full animate-pulse" style="animation-delay: 0.4s"></span>
									</div>
								{/if}
							</div>
							<p class="text-[#a1a1aa] text-[11px] md:text-[12px] truncate w-full">
								{currentTrack ? currentTrack.artist : 'Тут мог быть крутой артист'}
							</p>
						</div>

						<!-- Progress bar -->
						<div class="flex items-center gap-2 md:gap-4 w-full mt-1 md:mt-2">
							<span class="text-[#71717a] text-[10px] md:text-[12px] min-w-[28px] md:min-w-[35px]">
								{currentTrack ? formatTime(currentTrack.progress) : '0:00'}
							</span>
							<div class="flex-1 h-0.5 md:h-1 bg-white/10 rounded-full overflow-hidden">
								<div
									class="h-full bg-white/80 rounded-full smooth"
									style="width: {currentTrack ? (currentTrack.progress / currentTrack.duration) * 100 : 0}%"
								></div>
							</div>
							<span class="text-[#71717a] text-[10px] md:text-[12px] min-w-[28px] md:min-w-[35px]">
								{currentTrack ? formatTime(currentTrack.duration) : '0:00'}
							</span>
						</div>

						<!-- Volume and Device info -->
						{#if currentTrack}
							<div class="flex items-center gap-3 md:gap-4 mt-1">
								{#if currentTrack.volumePercent !== undefined && currentTrack.volumePercent !== null}
									<div class="flex items-center gap-1.5">
										<Icon icon="mingcute:volume-line" class="text-[#52525b]" width="14" />
										<span class="text-[#a1a1aa] text-[10px] md:text-[12px]">{currentTrack.volumePercent}%</span>
									</div>
								{/if}
								{#if currentTrack.deviceName}
									<span class="text-[#3f3f46] text-[10px] hidden md:block">•</span>
									<div class="hidden md:flex items-center gap-1.5">
										<Icon icon="mingcute:laptop-2-line" class="text-[#52525b]" width="14" />
										<span class="text-[#a1a1aa] text-[10px] md:text-[12px]">{currentTrack.deviceName}</span>
									</div>
								{/if}
							</div>
						{/if}
					</div>
				</div>
			</button>

			<!-- System card -->
			<button
				onclick={openSystemModal}
				class="col-span-2 md:col-span-1 bento-item p-4 md:p-5 text-left cursor-pointer hover:border-[#3f3f46] smooth group"
			>
				<div class="flex items-center justify-between mb-2 md:mb-3">
					<div class="flex items-center gap-2 text-[#71717a] text-[10px] md:text-[11px] uppercase tracking-wider">
						<Icon icon="mingcute:laptop-line" width="12" />
						Система
					</div>
					<Icon icon="mingcute:arrow-right-up-line" class="text-[#52525b] group-hover:text-[#a1a1aa] smooth" width="14" />
				</div>
				<div class="grid grid-cols-4 md:grid-cols-2 gap-2">
					{#each Object.entries(systemInfo) as [key, value]}
						<div>
							<div class="text-[#71717a] text-[9px] md:text-[10px] uppercase">{key}</div>
							<div class="text-[#fafafa] text-[11px] md:text-[12px]">{value}</div>
						</div>
					{/each}
				</div>
			</button>

			<!-- GitHub Contributions card -->
			<div class="col-span-2 md:col-span-4 bento-item p-4 md:p-5">
				<div class="flex items-center justify-between mb-3">
					<div class="flex items-center gap-2 text-[#71717a] text-[10px] md:text-[11px] uppercase tracking-wider">
						<Icon icon="mingcute:github-line" width="12" />
						GitHub
					</div>
				</div>
				{#if contributions.length > 0}
					<a href="https://github.com/{githubUsername}" target="_blank" class="block group">
						<div class="flex items-center gap-3 md:gap-4">
							<!-- Stats left -->
							<div class="hidden md:flex flex-col gap-3 min-w-[120px]">
								<div>
									<div class="text-[#fafafa] text-xl font-bold font-[family-name:var(--font-raleway)]">{totalContributions}</div>
									<div class="text-[#71717a] text-[10px]">contributions за год</div>
								</div>
								{#if recentActivity.length > 0}
									<div class="flex flex-col gap-1.5">
										<div class="text-[#52525b] text-[9px] uppercase tracking-wider">Недавно</div>
										{#each recentActivity as activity}
											<div class="flex items-center justify-between gap-2">
												<span class="text-[#a1a1aa] text-[11px] truncate max-w-[80px]">{activity.repo}</span>
												<span class="text-[#39d353] text-[10px]">{activity.commits}</span>
											</div>
										{/each}
									</div>
								{/if}
							</div>

							<!-- Graph -->
							<div class="flex gap-[2px] md:gap-[3px] overflow-hidden flex-1 justify-center">
								{#each { length: 52 } as _, weekIndex}
									<div class="flex flex-col gap-[2px] md:gap-[3px]">
										{#each { length: 7 } as _, dayIndex}
											{@const index = weekIndex * 7 + dayIndex}
											{@const day = contributions[index]}
											{#if day}
												<div
													class="w-[5px] h-[5px] md:w-[9px] md:h-[9px] rounded-[2px] smooth group-hover:scale-105"
													style="background-color: {getContributionColor(day.level)}"
													title="{day.count} contributions on {day.date}"
												></div>
											{:else}
												<div class="w-[5px] h-[5px] md:w-[9px] md:h-[9px] rounded-[2px]" style="background-color: #161b22"></div>
											{/if}
										{/each}
									</div>
								{/each}
							</div>

							<!-- Legend right -->
							<div class="hidden md:flex flex-col gap-2 min-w-[70px] items-end">
								<div class="flex items-center gap-1.5">
									<span class="text-[#71717a] text-[10px]">Less</span>
									{#each [0, 1, 2, 3, 4] as level}
										<div
											class="w-[9px] h-[9px] rounded-[2px]"
											style="background-color: {getContributionColor(level)}"
										></div>
									{/each}
									<span class="text-[#71717a] text-[10px]">More</span>
								</div>
								<div class="text-[#52525b] text-[10px] text-right">
									Нажми для<br/>профиля
								</div>
							</div>
						</div>

						<!-- Mobile stats -->
						<div class="flex md:hidden items-center justify-between mt-3 pt-3 border-t border-white/5">
							<div class="text-[#a1a1aa] text-[11px]">
								<span class="text-[#fafafa] font-medium">{totalContributions}</span> contributions
							</div>
							<div class="flex items-center gap-1">
								<span class="text-[#71717a] text-[9px]">Less</span>
								{#each [0, 1, 2, 3, 4] as level}
									<div
										class="w-[8px] h-[8px] rounded-[2px]"
										style="background-color: {getContributionColor(level)}"
									></div>
								{/each}
								<span class="text-[#71717a] text-[9px]">More</span>
							</div>
						</div>
					</a>
				{:else}
					<div class="text-[#71717a] text-[12px]">Загрузка...</div>
				{/if}
			</div>

		</div>

	</div>
</section>

<!-- Minimized modals dock -->
{#if minimizedModals.length > 0 && !showTiledView}
	<div class="fixed bottom-4 left-1/2 -translate-x-1/2 z-[250] flex gap-2 items-center">
		{#if minimizedModals.length > 1}
			<!-- Only show tile all button when 2+ modals -->
			<button
				onclick={openTiledView}
				class="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#18181b] border border-[#3f3f46] hover:border-[#52525b] text-[#a1a1aa] hover:text-[#fafafa] smooth animate-slide-up"
			>
				<Icon icon="mingcute:layout-grid-line" width="16" />
				<span class="text-[12px]">Развернуть все ({minimizedModals.length})</span>
			</button>
		{:else}
			<!-- Show individual button only when 1 modal -->
			{#each minimizedModals as modal}
				<button
					onclick={() => restoreModal(modal.id)}
					class="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#18181b] border border-[#27272a] hover:border-[#3f3f46] text-[#a1a1aa] hover:text-[#fafafa] smooth animate-slide-up"
				>
					<Icon icon={modal.icon} width="16" />
					<span class="text-[12px]">{modal.title}</span>
					<Icon icon="mingcute:arrow-up-line" width="14" class="text-[#52525b]" />
				</button>
			{/each}
		{/if}
	</div>
{/if}

<!-- System Modal -->
{#if showSystemModal}
	<div
		class="fixed inset-0 z-[200] flex items-center justify-center {systemModalFullscreen ? '' : 'p-4'}"
		onclick={closeSystemModal}
		onkeydown={(e) => e.key === 'Escape' && closeSystemModal()}
		role="dialog"
		aria-modal="true"
		tabindex="-1"
	>
		<div class="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"></div>

		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div
			class="relative bg-[#0d0d0f] border border-[#27272a] overflow-hidden animate-scale-in smooth {systemModalFullscreen ? 'w-full h-full rounded-none' : 'w-full max-w-2xl max-h-[90vh] rounded-xl md:rounded-2xl'}"
			onclick={(e) => e.stopPropagation()}
		>
			<div class="flex items-center justify-between px-4 py-3 bg-[#18181b] border-b border-[#27272a]">
				<div class="flex items-center gap-2">
					<Icon icon="mingcute:laptop-line" class="text-[#71717a]" width="14" />
					<span class="text-[#a1a1aa] text-[12px]">newer@newer ~ fastfetch</span>
				</div>
				<div class="flex gap-1.5 window-buttons">
					<button onclick={closeSystemModal} class="window-btn w-3 h-3 rounded-full bg-[#ff5f57] smooth group relative">
						<Icon icon="mingcute:close-line" width="8" class="window-btn-icon absolute inset-0 m-auto text-[#7a0000] opacity-0 group-hover:opacity-100" />
					</button>
					<button onclick={minimizeSystemModal} class="window-btn w-3 h-3 rounded-full bg-[#febc2e] smooth group relative">
						<Icon icon="mingcute:minimize-line" width="8" class="window-btn-icon absolute inset-0 m-auto text-[#7a5500] opacity-0 group-hover:opacity-100" />
					</button>
					<button onclick={toggleSystemFullscreen} class="window-btn w-3 h-3 rounded-full bg-[#28c840] smooth group relative">
						<Icon icon="mingcute:fullscreen-line" width="8" class="window-btn-icon absolute inset-0 m-auto text-[#006400] opacity-0 group-hover:opacity-100" />
					</button>
				</div>
			</div>

			<div class="p-4 md:p-6 font-mono text-[11px] md:text-[13px] leading-relaxed {systemModalFullscreen ? 'h-[calc(100%-52px)] overflow-auto' : ''}">
				<div class="flex flex-col sm:flex-row gap-4 md:gap-10">
					<div class="hidden sm:block text-[#1793d1] whitespace-pre text-[10px] md:text-[11px] leading-[1.1]">{`
       /\\
      /  \\
     /\\   \\
    /      \\
   /   ,,   \\
  /   |  |  -\\
 /_-''    ''-_\\`}</div>

					<div class="flex-1 space-y-1">
						<div class="text-[#1793d1] font-bold mb-2 text-[12px] md:text-[14px]">
							{fullSystemInfo.user}@{fullSystemInfo.host}
						</div>
						<div class="w-full h-px bg-[#27272a] mb-2"></div>

						{#each Object.entries(fullSystemInfo) as [key, value]}
							{#if key !== 'user' && key !== 'host'}
								<div class="flex flex-wrap">
									<span class="text-[#1793d1] min-w-[70px] md:min-w-[100px]">{key}</span>
									<span class="text-[#71717a] mx-1 md:mx-2">→</span>
									<span class="text-[#fafafa] break-all">{value}</span>
								</div>
							{/if}
						{/each}

						<div class="flex gap-1 mt-4 pt-4 border-t border-[#27272a] flex-wrap">
							{#each ['#0d0d0f', '#ff5f57', '#28c840', '#febc2e', '#1793d1', '#a855f7', '#06b6d4', '#fafafa'] as color}
								<div class="w-5 h-5 md:w-6 md:h-6 rounded" style="background-color: {color}"></div>
							{/each}
						</div>
						<div class="flex gap-1 flex-wrap">
							{#each ['#27272a', '#ef4444', '#22c55e', '#eab308', '#3b82f6', '#c084fc', '#22d3ee', '#a1a1aa'] as color}
								<div class="w-5 h-5 md:w-6 md:h-6 rounded" style="background-color: {color}"></div>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}

<!-- Spotify Modal -->
{#if showSpotifyModal}
	<div
		class="fixed inset-0 z-[200] flex items-center justify-center {spotifyModalFullscreen ? '' : 'p-4'}"
		onclick={closeSpotifyModal}
		onkeydown={(e) => e.key === 'Escape' && closeSpotifyModal()}
		role="dialog"
		aria-modal="true"
		tabindex="-1"
	>
		<div class="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"></div>

		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div
			class="relative bg-[#0d0d0f] border border-[#27272a] overflow-hidden animate-scale-in smooth {spotifyModalFullscreen ? 'w-full h-full rounded-none' : 'w-full max-w-2xl max-h-[90vh] rounded-xl md:rounded-2xl'}"
			onclick={(e) => e.stopPropagation()}
		>
			<div class="flex items-center justify-between px-4 py-3 bg-[#18181b] border-b border-[#27272a]">
				<div class="flex items-center gap-2">
					<Icon icon="mingcute:music-2-line" class="text-[#71717a]" width="14" />
					<span class="text-[#a1a1aa] text-[12px]">Spotify — Сейчас играет</span>
				</div>
				<div class="flex gap-1.5 window-buttons">
					<button onclick={closeSpotifyModal} class="window-btn w-3 h-3 rounded-full bg-[#ff5f57] smooth group relative">
						<Icon icon="mingcute:close-line" width="8" class="window-btn-icon absolute inset-0 m-auto text-[#7a0000] opacity-0 group-hover:opacity-100" />
					</button>
					<button onclick={minimizeSpotifyModal} class="window-btn w-3 h-3 rounded-full bg-[#febc2e] smooth group relative">
						<Icon icon="mingcute:minimize-line" width="8" class="window-btn-icon absolute inset-0 m-auto text-[#7a5500] opacity-0 group-hover:opacity-100" />
					</button>
					<button onclick={toggleSpotifyFullscreen} class="window-btn w-3 h-3 rounded-full bg-[#28c840] smooth group relative">
						<Icon icon="mingcute:fullscreen-line" width="8" class="window-btn-icon absolute inset-0 m-auto text-[#006400] opacity-0 group-hover:opacity-100" />
					</button>
				</div>
			</div>

			<div class="{spotifyModalFullscreen ? 'h-[calc(100%-52px)] flex flex-col' : 'p-4 md:p-6'}">
				{#if spotifyModalFullscreen}
					<!-- Fullscreen Spotify Client Style -->
					<div class="flex-1 flex flex-col relative overflow-hidden">
						<!-- Background gradient from album -->
						{#if currentTrack?.cover}
							<div class="absolute inset-0 opacity-30">
								<img src={currentTrack.cover} alt="" class="w-full h-full object-cover blur-3xl scale-150" />
							</div>
							<div class="absolute inset-0 bg-gradient-to-b from-transparent via-[#0d0d0f]/80 to-[#0d0d0f]"></div>
						{/if}

						<!-- Main content -->
						<div class="relative flex-1 flex items-center justify-center p-8">
							<div class="flex flex-col md:flex-row items-center gap-8 md:gap-12 max-w-4xl w-full">
								<!-- Album art -->
								{#if currentTrack?.cover}
									<img
										src={currentTrack.cover}
										alt="Album"
										class="size-48 md:size-72 rounded-lg shadow-2xl"
									/>
								{:else}
									<div class="flex justify-center items-center size-48 md:size-72 rounded-lg bg-[#282828]">
										<Icon icon="mingcute:music-2-line" class="text-[#535353]" width="80" />
									</div>
								{/if}

								<!-- Track info -->
								<div class="flex-1 text-center md:text-left">
									<p class="text-[#a1a1aa] text-[11px] md:text-[12px] uppercase tracking-wider mb-2">Сейчас играет</p>
									<h2 class="font-[family-name:var(--font-raleway)] text-[#fafafa] font-bold text-2xl md:text-4xl mb-2">
										{currentTrack ? currentTrack.name : "Ничего не играет"}
									</h2>
									<p class="text-[#a1a1aa] text-base md:text-lg">
										{currentTrack ? currentTrack.artist : 'Включи что-нибудь в Spotify'}
									</p>
									{#if currentTrack?.album}
										<p class="text-[#71717a] text-[13px] md:text-[14px] mt-1">{currentTrack.album}</p>
									{/if}
								</div>
							</div>
						</div>

						<!-- Bottom player bar -->
						<div class="relative bg-[#181818] border-t border-[#282828] p-4 md:p-6">
							{#if currentTrack}
								<!-- Progress bar -->
								<div class="flex items-center gap-3 md:gap-4 mb-4 max-w-2xl mx-auto">
									<span class="text-[#a1a1aa] text-[11px] min-w-[35px] text-right">
										{formatTime(currentTrack.progress)}
									</span>
									<div class="flex-1 h-1 bg-[#535353] rounded-full overflow-hidden group cursor-not-allowed">
										<div
											class="h-full bg-[#1db954] rounded-full"
											style="width: {(currentTrack.progress / currentTrack.duration) * 100}%"
										></div>
									</div>
									<span class="text-[#a1a1aa] text-[11px] min-w-[35px]">
										{formatTime(currentTrack.duration)}
									</span>
								</div>

								<!-- Controls -->
								<div class="flex items-center justify-center gap-4 md:gap-6">
									<!-- Shuffle (disabled) -->
									<button class="text-[#535353] cursor-not-allowed" disabled title="Недоступно">
										<Icon icon="mingcute:shuffle-line" width="20" />
									</button>
									<!-- Previous (disabled) -->
									<button class="text-[#535353] cursor-not-allowed" disabled title="Недоступно">
										<Icon icon="mingcute:skip-previous-fill" width="28" />
									</button>
									<!-- Play/Pause (disabled) -->
									<button class="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#535353] flex items-center justify-center cursor-not-allowed" disabled title="Недоступно">
										{#if currentTrack.isPlaying}
											<Icon icon="mingcute:pause-fill" class="text-[#181818]" width="24" />
										{:else}
											<Icon icon="mingcute:play-fill" class="text-[#181818]" width="24" />
										{/if}
									</button>
									<!-- Next (disabled) -->
									<button class="text-[#535353] cursor-not-allowed" disabled title="Недоступно">
										<Icon icon="mingcute:skip-forward-fill" width="28" />
									</button>
									<!-- Repeat (disabled) -->
									<button class="text-[#535353] cursor-not-allowed" disabled title="Недоступно">
										<Icon icon="mingcute:repeat-line" width="20" />
									</button>
								</div>

								<!-- Volume and device -->
								<div class="flex items-center justify-between mt-4 max-w-2xl mx-auto">
									<div class="flex items-center gap-2 text-[#a1a1aa]">
										{#if currentTrack.volumePercent !== undefined && currentTrack.volumePercent !== null}
											<Icon icon="mingcute:volume-line" width="16" />
											<div class="w-20 h-1 bg-[#535353] rounded-full overflow-hidden cursor-not-allowed">
												<div class="h-full bg-[#a1a1aa] rounded-full" style="width: {currentTrack.volumePercent}%"></div>
											</div>
											<span class="text-[11px]">{currentTrack.volumePercent}%</span>
										{/if}
									</div>
									{#if currentTrack.deviceName}
										<div class="flex items-center gap-2 text-[#1db954]">
											<Icon icon="mingcute:laptop-2-line" width="16" />
											<span class="text-[11px]">{currentTrack.deviceName}</span>
										</div>
									{/if}
								</div>
							{:else}
								<div class="text-center text-[#71717a] py-4">Включи музыку в Spotify</div>
							{/if}
						</div>
					</div>
				{:else}
					<!-- Normal modal view -->
					<div class="flex flex-col items-center gap-4 md:gap-6">
						{#if currentTrack?.cover}
							<div class="relative">
								<div class="absolute -inset-3 md:-inset-4 blur-2xl md:blur-3xl opacity-50">
									<img src={currentTrack.cover} alt="" class="size-32 md:size-48 rounded-xl md:rounded-2xl" />
								</div>
								<img
									src={currentTrack.cover}
									alt="Album"
									class="relative size-32 md:size-48 rounded-xl md:rounded-2xl object-cover shadow-2xl ring-1 ring-white/10"
								/>
							</div>
						{:else}
							<div class="flex justify-center items-center size-32 md:size-48 rounded-xl md:rounded-2xl bg-neutral-900/50 ring-1 ring-white/10">
								<Icon icon="mingcute:music-2-line" class="text-[#71717a]" width="40" />
							</div>
						{/if}

						<div class="text-center w-full">
							<h2 class="font-[family-name:var(--font-raleway)] text-[#fafafa] font-bold text-lg md:text-2xl mb-1">
								{currentTrack ? currentTrack.name : "Ничего не играет"}
							</h2>
							<p class="text-[#a1a1aa] text-[12px] md:text-[14px]">
								{currentTrack ? currentTrack.artist : 'Включи что-нибудь в Spotify'}
							</p>
						</div>

						{#if currentTrack}
							<div class="w-full max-w-md">
								<div class="flex items-center gap-3 md:gap-4 w-full">
									<span class="text-[#71717a] text-[11px] md:text-[12px] min-w-[30px] md:min-w-[35px]">
										{formatTime(currentTrack.progress)}
									</span>
									<div class="flex-1 h-1 md:h-1.5 bg-white/10 rounded-full overflow-hidden">
										<div
											class="h-full bg-green-500 rounded-full smooth"
											style="width: {(currentTrack.progress / currentTrack.duration) * 100}%"
										></div>
									</div>
									<span class="text-[#71717a] text-[11px] md:text-[12px] min-w-[30px] md:min-w-[35px]">
										{formatTime(currentTrack.duration)}
									</span>
								</div>
							</div>

							<div class="flex items-center gap-2 text-green-500">
								<div class="flex gap-0.5 items-center">
									<span class="w-0.5 md:w-1 h-2 md:h-3 bg-green-500 rounded-full animate-pulse"></span>
									<span class="w-0.5 md:w-1 h-3 md:h-4 bg-green-500 rounded-full animate-pulse" style="animation-delay: 0.2s"></span>
									<span class="w-0.5 md:w-1 h-1.5 md:h-2 bg-green-500 rounded-full animate-pulse" style="animation-delay: 0.4s"></span>
								</div>
								<span class="text-[11px] md:text-[13px]">Сейчас играет</span>
							</div>
						{/if}
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}

<!-- Weather Modal -->
{#if showWeatherModal}
	<div
		class="fixed inset-0 z-[200] flex items-center justify-center {weatherModalFullscreen ? '' : 'p-4'}"
		onclick={closeWeatherModal}
		onkeydown={(e) => e.key === 'Escape' && closeWeatherModal()}
		role="dialog"
		aria-modal="true"
		tabindex="-1"
	>
		<div class="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"></div>

		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div
			class="relative bg-[#0d0d0f] border border-[#27272a] overflow-hidden animate-scale-in smooth {weatherModalFullscreen ? 'w-full h-full rounded-none' : 'w-full max-w-2xl max-h-[90vh] rounded-xl md:rounded-2xl'}"
			onclick={(e) => e.stopPropagation()}
		>
			<div class="flex items-center justify-between px-4 py-3 bg-[#18181b] border-b border-[#27272a]">
				<div class="flex items-center gap-2">
					<Icon icon="mingcute:sun-line" class="text-[#71717a]" width="14" />
					<span class="text-[#a1a1aa] text-[12px]">Погода — Санкт-Петербург</span>
				</div>
				<div class="flex gap-1.5 window-buttons">
					<button onclick={closeWeatherModal} class="window-btn w-3 h-3 rounded-full bg-[#ff5f57] smooth group relative">
						<Icon icon="mingcute:close-line" width="8" class="window-btn-icon absolute inset-0 m-auto text-[#7a0000] opacity-0 group-hover:opacity-100" />
					</button>
					<button onclick={minimizeWeatherModal} class="window-btn w-3 h-3 rounded-full bg-[#febc2e] smooth group relative">
						<Icon icon="mingcute:minimize-line" width="8" class="window-btn-icon absolute inset-0 m-auto text-[#7a5500] opacity-0 group-hover:opacity-100" />
					</button>
					<button onclick={toggleWeatherFullscreen} class="window-btn w-3 h-3 rounded-full bg-[#28c840] smooth group relative">
						<Icon icon="mingcute:fullscreen-line" width="8" class="window-btn-icon absolute inset-0 m-auto text-[#006400] opacity-0 group-hover:opacity-100" />
					</button>
				</div>
			</div>

			<div class="{weatherModalFullscreen ? 'h-[calc(100%-52px)] flex flex-col' : 'p-4 md:p-6'}">
				{#if weatherModalFullscreen}
					<!-- Fullscreen Weather Style -->
					<div class="flex-1 flex flex-col overflow-auto p-6 md:p-8">
						<div class="max-w-4xl mx-auto w-full space-y-6">
							<!-- Main weather card -->
							<div class="bento-item p-6 md:p-8">
								<div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
									<!-- Location and description -->
									<div>
										<div class="flex items-center gap-2 mb-2">
											<Icon icon="tabler:map-pin" class="text-[#71717a]" width="16" />
											<span class="text-[#a1a1aa] text-sm">Санкт-Петербург, Россия</span>
										</div>
										{#if weather}
											<h1 class="font-[family-name:var(--font-raleway)] text-[#fafafa] font-bold text-6xl md:text-8xl mb-2">
												{weather.temp}°
											</h1>
											<p class="text-[#a1a1aa] text-lg md:text-xl">{weather.description}</p>
											<p class="text-[#52525b] text-sm mt-1">{weather.tempF}°F</p>
										{/if}
									</div>

									<!-- Weather Icon -->
									<div class="hidden md:block">
										{#if weather?.description === 'Ясно'}
											<Icon icon="mingcute:sun-line" class="text-[#71717a]" width="80" />
										{:else if weather?.description === 'Облачно'}
											<Icon icon="mingcute:cloud-line" class="text-[#71717a]" width="80" />
										{:else if weather?.description === 'Дождь'}
											<Icon icon="mingcute:rainy-line" class="text-[#71717a]" width="80" />
										{:else if weather?.description === 'Снег'}
											<Icon icon="mingcute:snow-line" class="text-[#71717a]" width="80" />
										{:else if weather?.description === 'Гроза'}
											<Icon icon="mingcute:thunderstorm-line" class="text-[#71717a]" width="80" />
										{:else}
											<Icon icon="mingcute:haze-line" class="text-[#71717a]" width="80" />
										{/if}
									</div>
								</div>
							</div>

							<!-- Weather details grid -->
							<div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
								<!-- UV Index -->
								<div class="bento-item p-4">
									<div class="flex items-center gap-2 mb-2">
										<Icon icon="mingcute:sun-line" class="text-[#71717a]" width="16" />
										<span class="text-[#71717a] text-[10px] uppercase tracking-wider">UV Индекс</span>
									</div>
									<span class="text-2xl md:text-3xl font-bold font-[family-name:var(--font-raleway)]" style="color: {weather ? getUvColor(weather.uvIndex) : '#fafafa'}">
										{weather?.uvIndex.toFixed(1) || '—'}
									</span>
									<p class="text-[#52525b] text-[11px] mt-1">
										{#if weather}
											{#if weather.uvIndex <= 2}Низкий{:else if weather.uvIndex <= 5}Умеренный{:else if weather.uvIndex <= 7}Высокий{:else}Очень высокий{/if}
										{/if}
									</p>
								</div>

								<!-- Air Quality -->
								<div class="bento-item p-4">
									<div class="flex items-center gap-2 mb-2">
										<Icon icon="mingcute:wind-line" class="text-[#71717a]" width="16" />
										<span class="text-[#71717a] text-[10px] uppercase tracking-wider">Воздух</span>
									</div>
									<span class="text-2xl md:text-3xl font-bold font-[family-name:var(--font-raleway)]" style="color: {weather ? getAirColor(weather.airQuality) : '#fafafa'}">
										{weather?.airQuality || '—'}
									</span>
									<p class="text-[#52525b] text-[11px] mt-1">
										{#if weather}
											{#if weather.airQuality <= 50}Хорошо{:else if weather.airQuality <= 100}Приемлемо{:else if weather.airQuality <= 150}Умеренно{:else}Плохо{/if}
										{/if}
									</p>
								</div>

								<!-- Humidity placeholder -->
								<div class="bento-item p-4">
									<div class="flex items-center gap-2 mb-2">
										<Icon icon="mingcute:drop-line" class="text-[#71717a]" width="16" />
										<span class="text-[#71717a] text-[10px] uppercase tracking-wider">Влажность</span>
									</div>
									<span class="text-[#fafafa] text-2xl md:text-3xl font-bold font-[family-name:var(--font-raleway)]">—</span>
									<p class="text-[#52525b] text-[11px] mt-1">Нет данных</p>
								</div>

								<!-- Wind placeholder -->
								<div class="bento-item p-4">
									<div class="flex items-center gap-2 mb-2">
										<Icon icon="mingcute:windy-line" class="text-[#71717a]" width="16" />
										<span class="text-[#71717a] text-[10px] uppercase tracking-wider">Ветер</span>
									</div>
									<span class="text-[#fafafa] text-2xl md:text-3xl font-bold font-[family-name:var(--font-raleway)]">—</span>
									<p class="text-[#52525b] text-[11px] mt-1">Нет данных</p>
								</div>
							</div>
						</div>
					</div>
				{:else}
					<!-- Normal modal view -->
					{#if weather}
						<div class="flex flex-col gap-4 md:gap-6">
							<div class="flex flex-col gap-3">
								<div class="flex items-center gap-2">
									<Icon icon="tabler:map-pin" class="text-[#71717a]" width="14" />
									<span class="text-[#fafafa] text-[12px] md:text-[14px]">Санкт-Петербург, Россия</span>
								</div>

								<div class="flex items-baseline gap-3">
									<h2 class="font-[family-name:var(--font-raleway)] text-[#fafafa] font-bold text-4xl md:text-6xl">
										{weather.temp}°C
									</h2>
									<span class="text-[#71717a] text-base md:text-lg">{weather.tempF}°F</span>
								</div>

								<p class="text-[#a1a1aa] text-base md:text-lg">{weather.description}</p>
							</div>

							<div class="grid grid-cols-2 gap-2 md:gap-4">
								<div class="bento-item p-3 md:p-4">
									<div class="flex items-center gap-2 mb-1 md:mb-2">
										<Icon icon="mingcute:sun-line" class="text-amber-400" width="14" />
										<span class="text-[#71717a] text-[10px] md:text-[11px] uppercase tracking-wider">UV Индекс</span>
									</div>
									<span class="text-xl md:text-2xl font-bold font-[family-name:var(--font-raleway)]" style="color: {getUvColor(weather.uvIndex)}">
										{weather.uvIndex.toFixed(1)}
									</span>
									<p class="text-[#52525b] text-[10px] md:text-[11px] mt-1">
										{#if weather.uvIndex <= 2}Низкий{:else if weather.uvIndex <= 5}Умеренный{:else if weather.uvIndex <= 7}Высокий{:else}Очень высокий{/if}
									</p>
								</div>
								<div class="bento-item p-3 md:p-4">
									<div class="flex items-center gap-2 mb-1 md:mb-2">
										<Icon icon="mingcute:wind-line" class="text-cyan-400" width="14" />
										<span class="text-[#71717a] text-[10px] md:text-[11px] uppercase tracking-wider">Воздух</span>
									</div>
									<span class="text-xl md:text-2xl font-bold font-[family-name:var(--font-raleway)]" style="color: {getAirColor(weather.airQuality)}">
										{weather.airQuality}
									</span>
									<p class="text-[#52525b] text-[10px] md:text-[11px] mt-1">
										{#if weather.airQuality <= 50}Хорошо{:else if weather.airQuality <= 100}Приемлемо{:else if weather.airQuality <= 150}Умеренно{:else}Плохо{/if}
									</p>
								</div>
							</div>
						</div>
					{:else}
						<div class="text-[#71717a] text-[12px]">Загрузка...</div>
					{/if}
				{/if}
			</div>
		</div>
	</div>
{/if}

<!-- About Modal -->
{#if showAboutModal}
	<div
		class="fixed inset-0 z-[200] flex items-center justify-center {aboutModalFullscreen ? '' : 'p-4'}"
		onclick={closeAboutModal}
		onkeydown={(e) => e.key === 'Escape' && closeAboutModal()}
		role="dialog"
		aria-modal="true"
		tabindex="-1"
	>
		<div class="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"></div>

		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div
			class="relative bg-[#0d0d0f] border border-[#27272a] overflow-hidden animate-scale-in smooth {aboutModalFullscreen ? 'w-full h-full rounded-none' : 'w-full max-w-2xl max-h-[90vh] rounded-xl md:rounded-2xl'}"
			onclick={(e) => e.stopPropagation()}
		>
			<div class="flex items-center justify-between px-4 py-3 bg-[#18181b] border-b border-[#27272a]">
				<div class="flex items-center gap-2">
					<Icon icon="mingcute:user-4-line" class="text-[#71717a]" width="14" />
					<span class="text-[#a1a1aa] text-[12px]">Обо мне — newer__</span>
				</div>
				<div class="flex gap-1.5 window-buttons">
					<button onclick={closeAboutModal} class="window-btn w-3 h-3 rounded-full bg-[#ff5f57] smooth group relative">
						<Icon icon="mingcute:close-line" width="8" class="window-btn-icon absolute inset-0 m-auto text-[#7a0000] opacity-0 group-hover:opacity-100" />
					</button>
					<button onclick={minimizeAboutModal} class="window-btn w-3 h-3 rounded-full bg-[#febc2e] smooth group relative">
						<Icon icon="mingcute:minimize-line" width="8" class="window-btn-icon absolute inset-0 m-auto text-[#7a5500] opacity-0 group-hover:opacity-100" />
					</button>
					<button onclick={toggleAboutFullscreen} class="window-btn w-3 h-3 rounded-full bg-[#28c840] smooth group relative">
						<Icon icon="mingcute:fullscreen-line" width="8" class="window-btn-icon absolute inset-0 m-auto text-[#006400] opacity-0 group-hover:opacity-100" />
					</button>
				</div>
			</div>

			<div class="{aboutModalFullscreen ? 'h-[calc(100%-52px)] flex flex-col' : 'p-4 md:p-6'}">
				{#if aboutModalFullscreen}
					<!-- Fullscreen Profile Style -->
					<div class="flex-1 overflow-auto p-6 md:p-8">
						<div class="max-w-4xl mx-auto space-y-6">
							<!-- Profile header card -->
							<div class="bento-item p-6 md:p-8">
								<div class="flex flex-col md:flex-row md:items-center gap-6">
									<!-- Profile icon -->
									<div class="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#18181b] border border-[#27272a] flex items-center justify-center shrink-0">
										<Icon icon="mingcute:user-4-fill" class="text-[#52525b]" width="40" />
									</div>

									<div class="flex-1">
										<h1 class="font-[family-name:var(--font-raleway)] text-[#fafafa] font-bold text-2xl md:text-4xl mb-2">newer__</h1>
										<p class="text-[#71717a] text-sm md:text-base mb-4">Full-stack Developer</p>

										<!-- Social links -->
										<div class="flex gap-2">
											<a href="https://t.me/mkphotoss" target="_blank" class="p-2.5 rounded-lg bg-[#18181b] border border-[#27272a] text-[#71717a] hover:text-[#fafafa] hover:border-[#3f3f46] smooth">
												<Icon icon="mingcute:telegram-line" width="18" />
											</a>
											<a href="https://discordapp.com/users/{discordUserId}" target="_blank" class="p-2.5 rounded-lg bg-[#18181b] border border-[#27272a] text-[#71717a] hover:text-[#fafafa] hover:border-[#3f3f46] smooth">
												<Icon icon="mingcute:discord-line" width="18" />
											</a>
											<a href="https://github.com/Flowery-arch" target="_blank" class="p-2.5 rounded-lg bg-[#18181b] border border-[#27272a] text-[#71717a] hover:text-[#fafafa] hover:border-[#3f3f46] smooth">
												<Icon icon="mingcute:github-line" width="18" />
											</a>
										</div>
									</div>
								</div>
							</div>

							<!-- About section -->
							<div class="bento-item p-5 md:p-6">
								<div class="flex items-center gap-2 mb-3">
									<Icon icon="mingcute:information-line" class="text-[#71717a]" width="16" />
									<h2 class="text-[#71717a] text-[11px] uppercase tracking-wider">О себе</h2>
								</div>
								<p class="text-[#a1a1aa] text-[13px] leading-relaxed">
									Специализируюсь на создании веб-платформ для Minecraft проектов, Discord ботов и API сервисов.
									Создаю функциональные сайты с современным дизайном, автоматизирую процессы через ботов.
								</p>
							</div>

							<!-- Skills section -->
							<div class="bento-item p-5 md:p-6">
								<div class="flex items-center gap-2 mb-4">
									<Icon icon="mingcute:code-line" class="text-[#71717a]" width="16" />
									<h2 class="text-[#71717a] text-[11px] uppercase tracking-wider">Навыки</h2>
								</div>
								<div class="flex flex-wrap gap-2">
									{#each ['TypeScript', 'React', 'Svelte', 'Next.js', 'Node.js', 'Bun', 'PostgreSQL', 'TailwindCSS'] as skill}
										<span class="px-3 py-1.5 rounded-lg bg-[#18181b] border border-[#27272a] text-[#a1a1aa] text-[12px]">
											{skill}
										</span>
									{/each}
								</div>
							</div>

							<!-- Specializations -->
							<div class="grid md:grid-cols-3 gap-3 md:gap-4">
								<div class="bento-item p-5">
									<Icon icon="mingcute:world-2-line" class="text-[#71717a] mb-3" width="24" />
									<h3 class="text-[#fafafa] font-medium mb-2 text-sm">Web Development</h3>
									<p class="text-[#52525b] text-[12px]">Современные веб-приложения с SvelteKit, Next.js и React</p>
								</div>
								<div class="bento-item p-5">
									<Icon icon="mingcute:discord-line" class="text-[#71717a] mb-3" width="24" />
									<h3 class="text-[#fafafa] font-medium mb-2 text-sm">Discord Bots</h3>
									<p class="text-[#52525b] text-[12px]">Боты с Discord.js и Sapphire framework</p>
								</div>
								<div class="bento-item p-5">
									<Icon icon="mingcute:game-2-line" class="text-[#71717a] mb-3" width="24" />
									<h3 class="text-[#fafafa] font-medium mb-2 text-sm">Minecraft</h3>
									<p class="text-[#52525b] text-[12px]">Плагины на Java с Paper API</p>
								</div>
							</div>
						</div>
					</div>
				{:else}
					<!-- Normal modal view -->
					<div class="flex flex-col gap-3 md:gap-4">
						<!-- About section -->
						<div class="bento-item p-3 md:p-4">
							<div class="flex items-center gap-2 mb-2">
								<Icon icon="mingcute:user-4-line" class="text-[#71717a]" width="14" />
								<span class="text-[#71717a] text-[10px] md:text-[11px] uppercase tracking-wider">О себе</span>
							</div>
							<p class="text-[#a1a1aa] text-[11px] md:text-[13px] leading-relaxed">
								Специализируюсь на создании веб-платформ для Minecraft проектов, Discord ботов и API сервисов.
								Создаю функциональные сайты с современным дизайном, автоматизирую процессы через ботов.
							</p>
						</div>

					<!-- Skills section with collapse -->
					<div class="bento-item overflow-hidden">
						<button
							onclick={() => skillsCollapsed = !skillsCollapsed}
							class="w-full p-3 md:p-4 flex items-center justify-between cursor-pointer hover:bg-white/5 smooth"
						>
							<div class="flex items-center gap-2">
								<Icon icon="mingcute:code-line" class="text-[#71717a]" width="14" />
								<span class="text-[#71717a] text-[10px] md:text-[11px] uppercase tracking-wider">Навыки</span>
							</div>
							<Icon
								icon="mingcute:down-line"
								class="text-[#52525b] smooth {skillsCollapsed ? 'rotate-180' : ''}"
								width="16"
							/>
						</button>
						<div class="skills-content {skillsCollapsed ? 'collapsed' : ''}">
							<div class="px-3 md:px-4 pb-3 md:pb-4">
								<div class="flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-4">
									{#each ['Next.js', 'React', 'Svelte', 'TypeScript', 'Bun', 'Node.js', 'TailwindCSS', 'PostgreSQL'] as skill}
										<span class="px-2 md:px-2.5 py-0.5 md:py-1 rounded-lg bg-white/5 border border-white/10 text-[#a1a1aa] text-[10px] md:text-[12px]">
											{skill}
										</span>
									{/each}
								</div>

								<!-- Code snippet -->
								<div class="rounded-lg md:rounded-xl bg-[#0d0d0f] border border-[#27272a] overflow-hidden">
									<div class="flex items-center justify-between px-2 md:px-3 py-1.5 md:py-2 border-b border-[#27272a]">
										<span class="text-[#52525b] text-[9px] md:text-[10px]">About.svelte</span>
										<button
											onclick={copyCode}
											class="flex items-center gap-1 md:gap-1.5 px-1.5 md:px-2 py-0.5 md:py-1 rounded-md text-[#52525b] hover:text-[#fafafa] hover:bg-white/5 smooth text-[9px] md:text-[10px]"
										>
											{#if codeCopied}
												<Icon icon="mingcute:check-line" width="10" class="text-green-500" />
												<span class="text-green-500 hidden sm:inline">Скопировано</span>
											{:else}
												<Icon icon="mingcute:copy-2-line" width="10" />
												<span class="hidden sm:inline">Копировать</span>
											{/if}
										</button>
									</div>
									<pre class="p-2 md:p-3 text-[10px] md:text-[11px] font-mono overflow-x-auto"><code class="text-[#71717a]"><span class="text-purple-400">&lt;script&gt;</span>
  <span class="text-blue-400">import</span> About <span class="text-blue-400">from</span> <span class="text-green-400">'./About.svelte'</span>;
<span class="text-purple-400">&lt;/script&gt;</span>

<span class="text-purple-400">&lt;About /&gt;</span></code></pre>
								</div>
							</div>
						</div>
					</div>

					<!-- Contact section -->
					<div class="bento-item p-3 md:p-4">
						<div class="flex items-center gap-2 mb-2 md:mb-3">
							<Icon icon="mingcute:mail-line" class="text-[#71717a]" width="14" />
							<span class="text-[#71717a] text-[10px] md:text-[11px] uppercase tracking-wider">Связаться</span>
						</div>
						<div class="flex flex-wrap gap-1.5 md:gap-2">
							<a href="https://t.me/mkphotoss" target="_blank" class="flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1.5 md:py-2 rounded-lg bg-white/5 border border-white/10 text-[#a1a1aa] hover:text-[#fafafa] hover:border-white/20 smooth">
								<Icon icon="mingcute:telegram-line" width="14" />
								<span class="text-[10px] md:text-[12px]">Telegram</span>
							</a>
							<a href="https://discordapp.com/users/{discordUserId}" target="_blank" class="flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1.5 md:py-2 rounded-lg bg-white/5 border border-white/10 text-[#a1a1aa] hover:text-[#fafafa] hover:border-white/20 smooth">
								<Icon icon="mingcute:discord-line" width="14" />
								<span class="text-[10px] md:text-[12px]">Discord</span>
							</a>
							<a href="https://github.com/Flowery-arch" target="_blank" class="flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1.5 md:py-2 rounded-lg bg-white/5 border border-white/10 text-[#a1a1aa] hover:text-[#fafafa] hover:border-white/20 smooth">
								<Icon icon="mingcute:github-line" width="14" />
								<span class="text-[10px] md:text-[12px]">GitHub</span>
							</a>
						</div>
					</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}

<!-- Tiled View (Hyprland-style) -->
{#if showTiledView}
	<div
		class="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md animate-fade-in"
		onclick={closeTiledView}
		onkeydown={(e) => e.key === 'Escape' && closeTiledView()}
		role="dialog"
		aria-modal="true"
		tabindex="-1"
	>
		<!-- Tiled container -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div
			class="h-full flex flex-col p-4 md:p-6"
			onclick={(e) => e.stopPropagation()}
		>
			<!-- Header -->
			<div class="flex items-center justify-between mb-4">
				<div class="flex items-center gap-3">
					<Icon icon="mingcute:layout-grid-line" class="text-[#71717a]" width="18" />
					<span class="text-[#a1a1aa] text-[13px]">Открытые окна ({tiledModals.length})</span>
				</div>
				<button
					onclick={closeTiledView}
					class="p-2 rounded-lg bg-[#18181b] border border-[#27272a] text-[#71717a] hover:text-[#fafafa] hover:border-[#3f3f46] smooth"
				>
					<Icon icon="mingcute:close-line" width="18" />
				</button>
			</div>

			<!-- Tiled grid -->
			<div class="flex-1 min-h-0 grid gap-3 {tiledModals.length === 2 ? 'grid-cols-1 md:grid-cols-2' : tiledModals.length === 3 ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-2'}">
				{#each tiledModals as modalId}
					{@const isActive = activeTiledModal === modalId}
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<div
						ondblclick={() => expandFromTiled(modalId)}
						class="relative bg-[#0d0d0f] border rounded-xl overflow-hidden flex flex-col min-h-0 smooth
							{isActive ? 'border-[#3f3f46]' : 'border-[#27272a] hover:border-[#3f3f46]'}"
					>
						<!-- Modal header -->
						<div class="flex-shrink-0 flex items-center justify-between px-3 py-2 bg-[#18181b] border-b border-[#27272a]">
							<div class="flex items-center gap-2">
								<Icon icon={getModalIcon(modalId)} class="text-[#71717a]" width="14" />
								<span class="text-[#a1a1aa] text-[11px]">{getModalTitle(modalId)}</span>
							</div>
							<div class="flex gap-1.5">
								<button
									onclick={(e) => { e.stopPropagation(); closeFromTiled(modalId); }}
									class="w-3 h-3 rounded-full bg-[#ff5f57] hover:scale-110 smooth"
									aria-label="Закрыть"
								></button>
								<button
									onclick={(e) => { e.stopPropagation(); }}
									class="w-3 h-3 rounded-full bg-[#febc2e] hover:scale-110 smooth"
									aria-label="Свернуть"
								></button>
								<button
									onclick={(e) => { e.stopPropagation(); expandFromTiled(modalId); }}
									class="w-3 h-3 rounded-full bg-[#28c840] hover:scale-110 smooth"
									aria-label="Развернуть"
								></button>
							</div>
						</div>

						<!-- Modal content - такой же как в обычных модалках -->
						<div class="flex-1 min-h-0 p-4 overflow-auto">
							{#if modalId === 'system'}
								<!-- System content - как в обычной модалке -->
								<div class="font-mono text-[11px] md:text-[13px] leading-relaxed">
									<div class="flex flex-col sm:flex-row gap-4 md:gap-10">
										<div class="hidden sm:block text-[#1793d1] whitespace-pre text-[10px] md:text-[11px] leading-[1.1]">{`
       /\\
      /  \\
     /\\   \\
    /      \\
   /   ,,   \\
  /   |  |  -\\
 /_-''    ''-_\\`}</div>

										<div class="flex-1 space-y-1">
											<div class="text-[#1793d1] font-bold mb-2 text-[12px] md:text-[14px]">
												{fullSystemInfo.user}@{fullSystemInfo.host}
											</div>
											<div class="w-full h-px bg-[#27272a] mb-2"></div>

											{#each Object.entries(fullSystemInfo) as [key, value]}
												{#if key !== 'user' && key !== 'host'}
													<div class="flex flex-wrap">
														<span class="text-[#1793d1] min-w-[70px] md:min-w-[100px]">{key}</span>
														<span class="text-[#71717a] mx-1 md:mx-2">→</span>
														<span class="text-[#fafafa] break-all">{value}</span>
													</div>
												{/if}
											{/each}

											<div class="flex gap-1 mt-4 pt-4 border-t border-[#27272a] flex-wrap">
												{#each ['#0d0d0f', '#ff5f57', '#28c840', '#febc2e', '#1793d1', '#a855f7', '#06b6d4', '#fafafa'] as color}
													<div class="w-5 h-5 md:w-6 md:h-6 rounded" style="background-color: {color}"></div>
												{/each}
											</div>
											<div class="flex gap-1 flex-wrap">
												{#each ['#27272a', '#ef4444', '#22c55e', '#eab308', '#3b82f6', '#c084fc', '#22d3ee', '#a1a1aa'] as color}
													<div class="w-5 h-5 md:w-6 md:h-6 rounded" style="background-color: {color}"></div>
												{/each}
											</div>
										</div>
									</div>
								</div>
							{:else if modalId === 'spotify'}
								<!-- Spotify content - точно как в обычной модалке -->
								<div class="flex flex-col items-center gap-4 md:gap-6">
									{#if currentTrack?.cover}
										<div class="relative">
											<div class="absolute -inset-3 md:-inset-4 blur-2xl md:blur-3xl opacity-50">
												<img src={currentTrack.cover} alt="" class="size-32 md:size-48 rounded-xl md:rounded-2xl" />
											</div>
											<img
												src={currentTrack.cover}
												alt="Album"
												class="relative size-32 md:size-48 rounded-xl md:rounded-2xl object-cover shadow-2xl ring-1 ring-white/10"
											/>
										</div>
									{:else}
										<div class="flex justify-center items-center size-32 md:size-48 rounded-xl md:rounded-2xl bg-neutral-900/50 ring-1 ring-white/10">
											<Icon icon="mingcute:music-2-line" class="text-[#71717a]" width="40" />
										</div>
									{/if}

									<div class="text-center w-full">
										<h2 class="font-[family-name:var(--font-raleway)] text-[#fafafa] font-bold text-lg md:text-2xl mb-1">
											{currentTrack ? currentTrack.name : "Ничего не играет"}
										</h2>
										<p class="text-[#a1a1aa] text-[12px] md:text-[14px]">
											{currentTrack ? currentTrack.artist : 'Включи что-нибудь в Spotify'}
										</p>
										{#if currentTrack?.album}
											<p class="text-[#52525b] text-[11px] md:text-[12px] mt-1">{currentTrack.album}</p>
										{/if}
									</div>

									{#if currentTrack}
										<div class="w-full max-w-md">
											<div class="flex items-center gap-3 md:gap-4 w-full">
												<span class="text-[#71717a] text-[11px] md:text-[12px] min-w-[30px] md:min-w-[35px]">
													{formatTime(currentTrack.progress)}
												</span>
												<div class="flex-1 h-1 md:h-1.5 bg-white/10 rounded-full overflow-hidden">
													<div
														class="h-full bg-green-500 rounded-full smooth"
														style="width: {(currentTrack.progress / currentTrack.duration) * 100}%"
													></div>
												</div>
												<span class="text-[#71717a] text-[11px] md:text-[12px] min-w-[30px] md:min-w-[35px]">
													{formatTime(currentTrack.duration)}
												</span>
											</div>
										</div>

										<div class="flex items-center gap-2 text-green-500">
											<div class="flex gap-0.5 items-center">
												<span class="w-0.5 md:w-1 h-2 md:h-3 bg-green-500 rounded-full animate-pulse"></span>
												<span class="w-0.5 md:w-1 h-3 md:h-4 bg-green-500 rounded-full animate-pulse" style="animation-delay: 0.2s"></span>
												<span class="w-0.5 md:w-1 h-1.5 md:h-2 bg-green-500 rounded-full animate-pulse" style="animation-delay: 0.4s"></span>
											</div>
											<span class="text-[11px] md:text-[13px]">Сейчас играет</span>
										</div>

										{#if currentTrack.deviceName}
											<div class="flex items-center gap-2 text-[#52525b] text-[10px] md:text-[11px]">
												<Icon icon="mingcute:device-line" width="14" />
												<span>{currentTrack.deviceName}</span>
												{#if currentTrack.volumePercent !== undefined}
													<span>• {currentTrack.volumePercent}%</span>
												{/if}
											</div>
										{/if}
									{/if}
								</div>
							{:else if modalId === 'weather'}
								<!-- Weather content - точно как в обычной модалке -->
								{#if weather}
									<div class="flex flex-col gap-4 md:gap-6">
										<div class="flex flex-col gap-3">
											<div class="flex items-center gap-2">
												<Icon icon="tabler:map-pin" class="text-[#71717a]" width="14" />
												<span class="text-[#fafafa] text-[12px] md:text-[14px]">Санкт-Петербург, Россия</span>
											</div>

											<div class="flex items-baseline gap-3">
												<h2 class="font-[family-name:var(--font-raleway)] text-[#fafafa] font-bold text-4xl md:text-6xl">
													{weather.temp}°C
												</h2>
												<span class="text-[#71717a] text-base md:text-lg">{weather.tempF}°F</span>
											</div>

											<p class="text-[#a1a1aa] text-base md:text-lg">{weather.description}</p>
										</div>

										<div class="grid grid-cols-2 gap-2 md:gap-4">
											<div class="bento-item p-3 md:p-4">
												<div class="flex items-center gap-2 mb-1 md:mb-2">
													<Icon icon="mingcute:sun-line" class="text-amber-400" width="14" />
													<span class="text-[#71717a] text-[10px] md:text-[11px] uppercase tracking-wider">UV Индекс</span>
												</div>
												<span class="text-xl md:text-2xl font-bold font-[family-name:var(--font-raleway)]" style="color: {getUvColor(weather.uvIndex)}">
													{weather.uvIndex.toFixed(1)}
												</span>
												<p class="text-[#52525b] text-[10px] md:text-[11px] mt-1">
													{#if weather.uvIndex <= 2}Низкий{:else if weather.uvIndex <= 5}Умеренный{:else if weather.uvIndex <= 7}Высокий{:else}Очень высокий{/if}
												</p>
											</div>
											<div class="bento-item p-3 md:p-4">
												<div class="flex items-center gap-2 mb-1 md:mb-2">
													<Icon icon="mingcute:wind-line" class="text-cyan-400" width="14" />
													<span class="text-[#71717a] text-[10px] md:text-[11px] uppercase tracking-wider">Воздух</span>
												</div>
												<span class="text-xl md:text-2xl font-bold font-[family-name:var(--font-raleway)]" style="color: {getAirColor(weather.airQuality)}">
													{weather.airQuality}
												</span>
												<p class="text-[#52525b] text-[10px] md:text-[11px] mt-1">
													{#if weather.airQuality <= 50}Хорошо{:else if weather.airQuality <= 100}Приемлемо{:else if weather.airQuality <= 150}Умеренно{:else}Плохо{/if}
												</p>
											</div>
										</div>
									</div>
								{:else}
									<div class="text-[#71717a] text-[12px]">Загрузка...</div>
								{/if}
							{:else if modalId === 'about'}
								<!-- About content - точно как в обычной модалке -->
								<div class="flex flex-col gap-3 md:gap-4">
									<!-- О себе -->
									<div class="bento-item p-3 md:p-4">
										<div class="flex items-center gap-2 mb-2">
											<Icon icon="mingcute:user-4-line" class="text-[#71717a]" width="14" />
											<span class="text-[#71717a] text-[10px] md:text-[11px] uppercase tracking-wider">О себе</span>
										</div>
										<p class="text-[#a1a1aa] text-[11px] md:text-[13px] leading-relaxed">
											Специализируюсь на создании веб-платформ для Minecraft проектов, Discord ботов и API сервисов.
											Создаю функциональные сайты с современным дизайном, автоматизирую процессы через ботов.
										</p>
									</div>

									<!-- Навыки -->
									<div class="bento-item p-3 md:p-4">
										<div class="flex items-center gap-2 mb-2 md:mb-3">
											<Icon icon="mingcute:code-line" class="text-[#71717a]" width="14" />
											<span class="text-[#71717a] text-[10px] md:text-[11px] uppercase tracking-wider">Навыки</span>
										</div>
										<div class="flex flex-wrap gap-1.5 md:gap-2">
											{#each ['Next.js', 'React', 'Svelte', 'TypeScript', 'Bun', 'Node.js', 'TailwindCSS', 'PostgreSQL'] as skill}
												<span class="px-2 md:px-2.5 py-0.5 md:py-1 rounded-lg bg-white/5 border border-white/10 text-[#a1a1aa] text-[10px] md:text-[12px]">
													{skill}
												</span>
											{/each}
										</div>
									</div>

									<!-- Связаться -->
									<div class="bento-item p-3 md:p-4">
										<div class="flex items-center gap-2 mb-2 md:mb-3">
											<Icon icon="mingcute:mail-line" class="text-[#71717a]" width="14" />
											<span class="text-[#71717a] text-[10px] md:text-[11px] uppercase tracking-wider">Связаться</span>
										</div>
										<div class="flex flex-wrap gap-1.5 md:gap-2">
											<a href="https://t.me/mkphotoss" target="_blank" class="flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1.5 md:py-2 rounded-lg bg-white/5 border border-white/10 text-[#a1a1aa] hover:text-[#fafafa] hover:border-white/20 smooth">
												<Icon icon="mingcute:telegram-line" width="14" />
												<span class="text-[10px] md:text-[12px]">Telegram</span>
											</a>
											<a href="https://discordapp.com/users/{discordUserId}" target="_blank" class="flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1.5 md:py-2 rounded-lg bg-white/5 border border-white/10 text-[#a1a1aa] hover:text-[#fafafa] hover:border-white/20 smooth">
												<Icon icon="mingcute:discord-line" width="14" />
												<span class="text-[10px] md:text-[12px]">Discord</span>
											</a>
											<a href="https://github.com/Flowery-arch" target="_blank" class="flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1.5 md:py-2 rounded-lg bg-white/5 border border-white/10 text-[#a1a1aa] hover:text-[#fafafa] hover:border-white/20 smooth">
												<Icon icon="mingcute:github-line" width="14" />
												<span class="text-[10px] md:text-[12px]">GitHub</span>
											</a>
										</div>
									</div>
								</div>
							{/if}
						</div>
					</div>
				{/each}
			</div>

			<!-- Bottom hint -->
			<div class="mt-4 text-center text-[#52525b] text-[11px]">
				<span class="text-[#71717a]">ESC</span> — свернуть все • <span class="text-[#71717a]">Двойной клик</span> — развернуть окно
			</div>
		</div>
	</div>
{/if}

<style>
	@keyframes fade-in {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	@keyframes scale-in {
		from {
			opacity: 0;
			transform: scale(0.95);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	@keyframes slide-up {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-fade-in {
		animation: fade-in 0.2s ease-out forwards;
	}

	.animate-scale-in {
		animation: scale-in 0.2s ease-out forwards;
	}

	.animate-slide-up {
		animation: slide-up 0.3s ease-out forwards;
	}

	.window-btn:hover {
		transform: scale(1.1);
	}

	/* Skills collapse animation */
	.skills-content {
		max-height: 500px;
		overflow: hidden;
		transition: max-height 0.3s ease, opacity 0.3s ease;
		opacity: 1;
	}

	.skills-content.collapsed {
		max-height: 0;
		opacity: 0;
	}

	/* Rotate animation for chevron */
	:global(.rotate-180) {
		transform: rotate(180deg);
	}
</style>
