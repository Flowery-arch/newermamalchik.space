<script lang="ts">
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';

	let sectionRef: HTMLElement;
	let visible = $state(false);
	let weather = $state<{ temp: number; description: string; icon: string } | null>(null);

	const systemInfo = {
		os: 'Arch Linux',
		kernel: '6.18.3-arch1-1',
		cpu: {
			name: 'AMD Ryzen 5 5500',
			cores: 6,
			threads: 12,
			architecture: 'x86_64'
		},
		gpu: {
			name: 'NVIDIA GeForce RTX 4060',
			vram: 8
		},
		ram: {
			total: 31
		},
		storage: {
			total: 1490
		}
	};

	const contacts = [
		{ href: 'https://t.me/mkphotoss', icon: 'mingcute:telegram-line', label: 'Telegram', color: '#38bdf8' },
		{ href: 'https://discordapp.com/users/660534347429969931', icon: 'mingcute:discord-line', label: 'Discord', color: '#818cf8' },
		{ href: 'https://github.com/Flowery-arch', icon: 'mingcute:github-line', label: 'GitHub', color: '#ffffff' }
	];

	async function fetchWeather() {
		try {
			const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=59.9343&longitude=30.3351&current=temperature_2m,weather_code&timezone=Europe/Moscow');
			const data = await res.json();
			const temp = Math.round(data.current.temperature_2m);
			const code = data.current.weather_code;

			// Weather code to description and icon
			let description = 'Ясно';
			let icon = 'mingcute:sun-line';

			if (code === 0) {
				description = 'Ясно';
				icon = 'mingcute:sun-line';
			} else if (code <= 3) {
				description = 'Облачно';
				icon = 'mingcute:cloud-line';
			} else if (code <= 49) {
				description = 'Туман';
				icon = 'mingcute:mist-line';
			} else if (code <= 69) {
				description = 'Дождь';
				icon = 'mingcute:rainy-line';
			} else if (code <= 79) {
				description = 'Снег';
				icon = 'mingcute:snow-line';
			} else if (code <= 99) {
				description = 'Гроза';
				icon = 'mingcute:thunderstorms-line';
			}

			weather = { temp, description, icon };
		} catch {
			weather = { temp: -5, description: 'Облачно', icon: 'mingcute:cloud-line' };
		}
	}

	onMount(() => {
		fetchWeather();

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						visible = true;
					}
				});
			},
			{ threshold: 0.1 }
		);

		if (sectionRef) {
			observer.observe(sectionRef);
		}

		return () => observer.disconnect();
	});
</script>

<section
	id="about"
	bind:this={sectionRef}
	class="relative py-12 sm:py-16 lg:py-24"
>
	<!-- Background -->
	<div class="absolute inset-0 h-full w-full dot-pattern z-5 opacity-60 mask-y-from-80"></div>

	<div class="px-4 sm:px-6 lg:px-16 xl:px-24 relative z-50 {visible ? 'animate-fade-in-up' : 'opacity-0'}">

		<!-- Grid layout -->
		<div class="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">

			<!-- Left column - Main content -->
			<div class="lg:col-span-7 flex flex-col gap-6">

				<!-- Header -->
				<div class="flex flex-col gap-2">
					<h2 class="font-[family-name:var(--font-raleway)] font-bold text-white text-2xl lg:text-3xl">
						Обо мне
					</h2>
					<p class="font-[family-name:var(--font-zed)] text-white/40 text-[11px]">newer__ / Разработчик</p>
				</div>

				<!-- Description -->
				<div class="flex flex-col gap-3">
					<p class="font-[family-name:var(--font-zed)] text-white/70 text-[13px] leading-relaxed">
						Специализируюсь на создании веб-платформ для Minecraft проектов, Discord ботов и API сервисов.
						Создаю функциональные сайты для игровых серверов, автоматизирую процессы через ботов.
					</p>
					<p class="font-[family-name:var(--font-zed)] text-white/50 text-[12px] leading-relaxed">
						Использую Next.js, React, Svelte, TypeScript и Bun.
					</p>
				</div>

				<!-- Contact buttons -->
				<div class="flex flex-wrap gap-2">
					{#each contacts as contact}
						<a
							href={contact.href}
							target="_blank"
							class="flex gap-2 items-center px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/25 bg-white/5 hover:bg-white/8 smooth"
						>
							<Icon icon={contact.icon} width="14" style="color: {contact.color}" />
							<span class="font-[family-name:var(--font-zed)] text-white/80 text-[11px]">{contact.label}</span>
						</a>
					{/each}
				</div>
			</div>

			<!-- Right column - Cards -->
			<div class="lg:col-span-5 flex flex-col gap-3 sm:gap-4">

				<!-- Weather card -->
				<div class="glass-card rounded-xl border border-white/10 p-4">
					<div class="flex items-center justify-between">
						<div class="flex items-center gap-3">
							<div class="w-8 h-8 rounded-lg bg-cyan-500/15 flex items-center justify-center">
								{#if weather}
									<Icon icon={weather.icon} class="text-cyan-400" width="16" />
								{:else}
									<Icon icon="mingcute:cloud-line" class="text-cyan-400" width="16" />
								{/if}
							</div>
							<div class="flex flex-col">
								<span class="font-[family-name:var(--font-zed)] text-white/40 text-[10px]">Санкт-Петербург</span>
								<span class="font-[family-name:var(--font-zed)] text-white text-[13px]">
									{#if weather}
										{weather.temp}°C · {weather.description}
									{:else}
										Загрузка...
									{/if}
								</span>
							</div>
						</div>
						<Icon icon="mingcute:location-line" class="text-white/20" width="14" />
					</div>
				</div>

				<!-- System info card -->
				<div class="glass-card rounded-xl border border-white/10 overflow-hidden flex-1">
					<div class="flex flex-col p-4 gap-4 h-full">

						<!-- Card header -->
						<div class="flex items-center justify-between">
							<div class="flex items-center gap-2">
								<div class="w-7 h-7 rounded-lg bg-blue-500/15 flex items-center justify-center">
									<Icon icon="mingcute:laptop-line" class="text-blue-400" width="14" />
								</div>
								<span class="font-[family-name:var(--font-zed)] text-white/50 text-[10px] uppercase tracking-wider">Система</span>
							</div>
							<div class="flex items-center gap-1">
								<div class="w-2 h-2 rounded-full bg-red-400/80"></div>
								<div class="w-2 h-2 rounded-full bg-yellow-400/80"></div>
								<div class="w-2 h-2 rounded-full bg-green-400/80"></div>
							</div>
						</div>

						<!-- Specs list - compact -->
						<div class="grid grid-cols-2 gap-x-4 gap-y-2 text-[11px]">
							<div class="flex justify-between">
								<span class="font-[family-name:var(--font-zed)] text-white/40">OS</span>
								<span class="font-[family-name:var(--font-zed)] text-white">{systemInfo.os}</span>
							</div>
							<div class="flex justify-between">
								<span class="font-[family-name:var(--font-zed)] text-white/40">CPU</span>
								<span class="font-[family-name:var(--font-zed)] text-white/70">R5 5500</span>
							</div>
							<div class="flex justify-between">
								<span class="font-[family-name:var(--font-zed)] text-white/40">GPU</span>
								<span class="font-[family-name:var(--font-zed)] text-white">RTX 4060</span>
							</div>
							<div class="flex justify-between">
								<span class="font-[family-name:var(--font-zed)] text-white/40">RAM</span>
								<span class="font-[family-name:var(--font-zed)] text-white/70">31GB</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
