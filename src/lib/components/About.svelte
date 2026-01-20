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

	const systemInfo = {
		os: 'Arch Linux',
		cpu: 'Ryzen 5 5500',
		gpu: 'RTX 4060',
		ram: '32GB'
	};

	// Spotify - текущий трек с прогрессом
	let currentTrack = $state<{
		name: string;
		artist: string;
		cover?: string;
		isPlaying: boolean;
		progress: number;
		duration: number;
	} | null>(null);

	function formatTime(ms: number): string {
		const seconds = Math.floor(ms / 1000);
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}:${secs.toString().padStart(2, '0')}`;
	}

	async function fetchSpotify() {
		try {
			const res = await fetch('/api/spotify/now-playing');
			const data = await res.json();

			if (data.isPlaying && data.title) {
				currentTrack = {
					name: data.title,
					artist: data.artist,
					cover: data.albumImageUrl,
					isPlaying: true,
					progress: data.progress || 0,
					duration: data.duration || 0
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

		// Обновляем Spotify каждые 10 секунд для более точного прогресса
		const spotifyInterval = setInterval(fetchSpotify, 10000);

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
			<div class="col-span-2 bento-item p-4 md:p-6">
				<h3 class="text-[#fafafa] font-medium text-base md:text-lg mb-1 md:mb-2">newer__</h3>
				<p class="text-[#a1a1aa] text-[12px] md:text-[14px] leading-relaxed mb-3 md:mb-4">
					Специализируюсь на создании веб-платформ для Minecraft проектов,
					Discord ботов и API сервисов.
					<span class="hidden sm:inline">Создаю функциональные сайты, автоматизирую процессы через ботов.</span>
				</p>
				<div class="flex gap-2 md:gap-3">
					<a href="https://t.me/mkphotoss" target="_blank" class="p-1.5 md:p-2 rounded-lg bg-white/5 border border-white/10 text-[#a1a1aa] hover:text-[#fafafa] hover:border-white/20 smooth">
						<Icon icon="mingcute:telegram-line" width="16" class="md:w-[18px] md:h-[18px]" />
					</a>
					<a href="https://discordapp.com/users/{discordUserId}" target="_blank" class="p-1.5 md:p-2 rounded-lg bg-white/5 border border-white/10 text-[#a1a1aa] hover:text-[#fafafa] hover:border-white/20 smooth">
						<Icon icon="mingcute:discord-line" width="16" class="md:w-[18px] md:h-[18px]" />
					</a>
					<a href="https://github.com/Flowery-arch" target="_blank" class="p-1.5 md:p-2 rounded-lg bg-white/5 border border-white/10 text-[#a1a1aa] hover:text-[#fafafa] hover:border-white/20 smooth">
						<Icon icon="mingcute:github-line" width="16" class="md:w-[18px] md:h-[18px]" />
					</a>
				</div>
			</div>

			<!-- Weather card -->
			<div class="col-span-2 bento-item px-4 md:px-6 py-4 md:py-5">
				<div class="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0 mb-3 md:mb-4">
					<div class="flex gap-2 md:gap-3 items-center">
						<Icon icon="mingcute:sun-line" class="text-[#a1a1aa] opacity-80" width="14" />
						<p class="text-[#a1a1aa] text-[11px] md:text-[12px]">Погода</p>
					</div>
					<div class="flex gap-2 md:gap-3 items-center">
						<Icon icon="tabler:map-pin" class="text-white/60" width="14" />
						<p class="text-white text-[11px] md:text-[12px]">Санкт-Петербург</p>
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
			</div>

			<!-- Spotify card -->
			<div class="col-span-2 md:col-span-3 bento-item p-4 md:p-6 relative">
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
					</div>
				</div>
			</div>

			<!-- System card -->
			<div class="col-span-2 md:col-span-1 bento-item p-4 md:p-5">
				<div class="flex items-center gap-2 text-[#71717a] text-[10px] md:text-[11px] uppercase tracking-wider mb-2 md:mb-3">
					<Icon icon="mingcute:laptop-line" width="12" />
					Система
				</div>
				<div class="grid grid-cols-4 md:grid-cols-2 gap-2">
					{#each Object.entries(systemInfo) as [key, value]}
						<div>
							<div class="text-[#71717a] text-[9px] md:text-[10px] uppercase">{key}</div>
							<div class="text-[#fafafa] text-[11px] md:text-[12px]">{value}</div>
						</div>
					{/each}
				</div>
			</div>

		</div>

	</div>
</section>
