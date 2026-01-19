<script lang="ts">
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';

	let sectionRef: HTMLElement;
	let visible = $state(false);
	let activeTab = $state<'sites' | 'bots' | 'plugins' | 'api'>('sites');

	interface Project {
		name: string;
		description: string;
		accentColor: string;
		stack: string[];
		url: string;
	}

	const sites: Project[] = [
		{
			name: 'FLW',
			description: 'Мой личный Minecraft проект - полнофункциональный сайт с онлайн картой, вики, системой управления и интеграцией с игровым сервером.',
			accentColor: '#60a5fa',
			stack: ['TypeScript', 'Next.js', 'React', 'Bun'],
			url: 'https://flowerymc.online/'
		},
		{
			name: 'Затмение',
			description: 'Веб-платформа для Minecraft проекта с современным дизайном и функциональностью.',
			accentColor: '#a855f7',
			stack: ['TypeScript', 'Next.js', 'React'],
			url: 'https://zatmenie.space/'
		},
		{
			name: 'MoernCordd',
			description: 'Современный веб-проект с уникальным дизайном и функциональностью.',
			accentColor: '#f97316',
			stack: ['TypeScript', 'Next.js', 'React', 'Tailwind'],
			url: 'https://moerncordd.vercel.app/'
		},
		{
			name: 'RGB Community',
			description: 'Сайт для RGB сообщества с интерактивными элементами.',
			accentColor: '#ec4899',
			stack: ['TypeScript', 'Next.js', 'React'],
			url: 'https://rgb-community.vercel.app/'
		},
		{
			name: 'OwlsVPN',
			description: 'Лендинг для VPN сервиса с современным UI/UX.',
			accentColor: '#22c55e',
			stack: ['TypeScript', 'Next.js', 'Tailwind'],
			url: 'https://owlsvpn.vercel.app/'
		},
		{
			name: 'Портфолио',
			description: 'Сайт моего портфолио с информацией о проектах, навыках и контактах.',
			accentColor: '#3b82f6',
			stack: ['TypeScript', 'Svelte', 'SvelteKit', 'Tailwind'],
			url: 'https://newermamalchik.space/'
		}
	];

	const bots: Project[] = [
		{
			name: 'FLW Bot',
			description: 'Многофункциональный Discord бот для проекта FLW. Работает с сервером, получает данные о проекте и игроках.',
			accentColor: '#5865f2',
			stack: ['TypeScript', 'Discord.js', 'Bun'],
			url: '#'
		}
	];

	const plugins: Project[] = [
		{
			name: 'FLW Core',
			description: 'Основной плагин для Minecraft сервера FLW. Ядро системы с API для других плагинов.',
			accentColor: '#22c55e',
			stack: ['Java', 'Paper API', 'MySQL'],
			url: '#'
		}
	];

	const apis: Project[] = [
		{
			name: 'API Личного кабинета',
			description: 'API для личного кабинета на сайте FLW. Авторизация, управление профилем и интеграция с игровым сервером.',
			accentColor: '#10b981',
			stack: ['TypeScript', 'Bun', 'Elysia', 'PostgreSQL'],
			url: '#'
		},
		{
			name: 'API Комментариев и лайков',
			description: 'API для системы комментариев и лайков. Модерация контента и уведомления.',
			accentColor: '#ec4899',
			stack: ['TypeScript', 'Bun', 'PostgreSQL'],
			url: '#'
		},
		{
			name: 'API Постов и ленты',
			description: 'API для публикации постов и формирования ленты новостей.',
			accentColor: '#8b5cf6',
			stack: ['TypeScript', 'Bun', 'PostgreSQL', 'Redis'],
			url: '#'
		},
		{
			name: 'API Городов',
			description: 'API для системы городов на сервере. Создание, управление и статистика.',
			accentColor: '#06b6d4',
			stack: ['TypeScript', 'Bun', 'PostgreSQL'],
			url: '#'
		},
		{
			name: 'API Загрузки картинок',
			description: 'API для загрузки и хранения изображений в ленту и профили.',
			accentColor: '#f97316',
			stack: ['TypeScript', 'Bun', 'S3', 'Sharp'],
			url: '#'
		}
	];

	const tabs = [
		{ id: 'sites' as const, label: 'Сайты', icon: 'mingcute:laptop-line', count: sites.length },
		{ id: 'bots' as const, label: 'Боты', icon: 'mingcute:discord-line', count: bots.length },
		{ id: 'plugins' as const, label: 'Плагины', icon: 'mingcute:game-2-line', count: plugins.length },
		{ id: 'api' as const, label: 'API', icon: 'mingcute:api-line', count: apis.length }
	];

	const currentProjects = $derived(
		activeTab === 'sites' ? sites :
		activeTab === 'bots' ? bots :
		activeTab === 'plugins' ? plugins : apis
	);

	onMount(() => {
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
	id="projects"
	bind:this={sectionRef}
	class="relative py-24 lg:py-32"
>
	<!-- Background -->
	<div class="absolute inset-0 h-full w-full grid-pattern z-5 opacity-40 mask-y-from-80"></div>

	<div class="px-8 lg:px-16 xl:px-24 relative z-50 {visible ? 'animate-fade-in-up' : 'opacity-0'}">

		<!-- Header - left aligned -->
		<div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
			<div class="flex flex-col gap-3">
				<div class="flex items-center gap-3">
					<div class="w-10 h-10 rounded-xl bg-blue-500/15 flex items-center justify-center">
						<Icon icon="mingcute:box-3-line" class="text-blue-400" width="20" />
					</div>
					<h2 class="font-[family-name:var(--font-raleway)] font-bold text-white text-3xl lg:text-4xl">
						Проекты
					</h2>
				</div>
				<p class="font-[family-name:var(--font-zed)] text-white/50 text-[13px] max-w-lg">
					Веб-платформы, боты, плагины и API сервисы
				</p>
			</div>

			<!-- Tabs - inline on desktop -->
			<div class="flex gap-2 flex-wrap">
				{#each tabs as tab}
					<button
						onclick={() => activeTab = tab.id}
						class="flex gap-2 items-center px-3.5 py-2 rounded-lg smooth cursor-pointer {activeTab === tab.id ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white hover:bg-white/5'}"
					>
						<Icon icon={tab.icon} width="14" />
						<span class="font-[family-name:var(--font-zed)] text-[12px]">{tab.label}</span>
						<span class="font-[family-name:var(--font-zed)] text-[10px] px-1.5 py-0.5 rounded bg-white/10">{tab.count}</span>
					</button>
				{/each}
			</div>
		</div>

		<!-- Projects list - vertical cards -->
		<div class="flex flex-col gap-4">
			{#each currentProjects as project, i (project.name)}
				<div
					class="group flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8 p-5 lg:p-6 rounded-2xl border border-white/8 hover:border-white/15 bg-white/3 hover:bg-white/5 smooth"
				>
					<!-- Color indicator + name -->
					<div class="flex items-center gap-4 lg:min-w-[200px]">
						<div
							class="w-3 h-3 rounded-full flex-shrink-0"
							style="background-color: {project.accentColor}"
						></div>
						<h3 class="font-[family-name:var(--font-raleway)] font-semibold text-white text-[17px]">
							{project.name}
						</h3>
					</div>

					<!-- Description -->
					<p class="font-[family-name:var(--font-zed)] text-white/60 text-[13px] leading-relaxed flex-1">
						{project.description}
					</p>

					<!-- Stack tags -->
					<div class="flex flex-wrap gap-1.5 lg:min-w-[180px]">
						{#each project.stack.slice(0, 3) as tech}
							<span class="px-2 py-0.5 rounded text-[10px] font-[family-name:var(--font-zed)] bg-white/5 text-white/50">
								{tech}
							</span>
						{/each}
						{#if project.stack.length > 3}
							<span class="px-2 py-0.5 rounded text-[10px] font-[family-name:var(--font-zed)] bg-white/5 text-white/30">
								+{project.stack.length - 3}
							</span>
						{/if}
					</div>

					<!-- Link button -->
					{#if project.url !== '#'}
						<a
							href={project.url}
							target="_blank"
							class="flex gap-2 items-center px-4 py-2 rounded-lg border border-white/10 hover:border-white/25 hover:bg-white/5 smooth lg:ml-auto"
						>
							<Icon icon="mingcute:external-link-line" class="text-white/60" width="14" />
							<span class="font-[family-name:var(--font-zed)] text-white/80 text-[12px]">Открыть</span>
						</a>
					{:else}
						<div class="flex gap-2 items-center px-4 py-2 rounded-lg border border-white/5 lg:ml-auto">
							<Icon icon="mingcute:lock-line" class="text-white/30" width="14" />
							<span class="font-[family-name:var(--font-zed)] text-white/30 text-[12px]">Приватный</span>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>
