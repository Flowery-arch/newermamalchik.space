<script lang="ts">
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';

	let sectionRef: HTMLElement;
	let visible = $state(false);
	let activeTab = $state<'sites' | 'bots' | 'plugins' | 'api'>('sites');

	interface Project {
		name: string;
		description: string;
		stack: string[];
		url: string;
	}

	const projects = {
		sites: [
			{ name: 'FLW', description: 'Сайт Minecraft проекта с картой, вики и интеграциями', stack: ['Next.js', 'React', 'Bun'], url: 'https://flowerymc.online/' },
			{ name: 'Затмение', description: 'Веб-платформа для Minecraft проекта', stack: ['Next.js', 'React'], url: 'https://zatmenie.space/' },
			{ name: 'MoernCordd', description: 'Современный веб-проект', stack: ['Next.js', 'Tailwind'], url: 'https://moerncordd.vercel.app/' },
			{ name: 'RGB Community', description: 'Сайт для RGB сообщества', stack: ['Next.js', 'React'], url: 'https://rgb-community.vercel.app/' },
			{ name: 'OwlsVPN', description: 'Лендинг для VPN сервиса', stack: ['Next.js', 'Tailwind'], url: 'https://owlsvpn.vercel.app/' },
			{ name: 'Портфолио', description: 'Этот сайт', stack: ['SvelteKit', 'Tailwind'], url: '#' }
		],
		bots: [
			{ name: 'FLW Bot', description: 'Discord бот для проекта FLW', stack: ['TypeScript', 'Discord.js', 'Bun'], url: '#' }
		],
		plugins: [
			{ name: 'FLW Core', description: 'Основной плагин для Minecraft сервера', stack: ['Java', 'Paper API', 'MySQL'], url: '#' }
		],
		api: [
			{ name: 'API ЛК', description: 'Авторизация и управление профилем', stack: ['Bun', 'Elysia', 'PostgreSQL'], url: '#' },
			{ name: 'API Комментариев', description: 'Комментарии и лайки', stack: ['Bun', 'PostgreSQL'], url: '#' },
			{ name: 'API Ленты', description: 'Посты и новости', stack: ['Bun', 'PostgreSQL', 'Redis'], url: '#' },
			{ name: 'API Городов', description: 'Система городов сервера', stack: ['Bun', 'PostgreSQL'], url: '#' },
			{ name: 'API Картинок', description: 'Загрузка изображений', stack: ['Bun', 'S3', 'Sharp'], url: '#' }
		]
	} as const;

	const tabs = [
		{ id: 'sites' as const, label: 'Сайты', count: projects.sites.length },
		{ id: 'bots' as const, label: 'Боты', count: projects.bots.length },
		{ id: 'plugins' as const, label: 'Плагины', count: projects.plugins.length },
		{ id: 'api' as const, label: 'API', count: projects.api.length }
	];

	const currentProjects = $derived(projects[activeTab]);

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) visible = true;
			},
			{ threshold: 0.1 }
		);
		if (sectionRef) observer.observe(sectionRef);
		return () => observer.disconnect();
	});
</script>

<section id="projects" bind:this={sectionRef} class="py-16 md:py-24 px-4 md:px-6">
	<div class="max-w-6xl mx-auto {visible ? 'animate-in' : 'opacity-0'}">

		<!-- Header -->
		<div class="flex flex-col gap-4 md:gap-6 mb-6 md:mb-8">
			<div>
				<h2 class="text-2xl md:text-3xl font-bold text-[#fafafa] font-[family-name:var(--font-raleway)] mb-1 md:mb-2">
					Проекты
				</h2>
				<p class="text-[#71717a] text-[12px] md:text-[14px]">Что я создал</p>
			</div>

			<!-- Tabs - scrollable on mobile -->
			<div class="flex gap-1 p-1 bg-[#18181b] rounded-lg border border-[#27272a] overflow-x-auto no-scrollbar">
				{#each tabs as tab}
					<button
						onclick={() => activeTab = tab.id}
						class="px-3 md:px-4 py-1.5 md:py-2 rounded-md text-[12px] md:text-[13px] smooth cursor-pointer whitespace-nowrap {activeTab === tab.id ? 'bg-[#27272a] text-[#fafafa]' : 'text-[#71717a] hover:text-[#a1a1aa]'}"
					>
						{tab.label}
						<span class="ml-1 md:ml-1.5 text-[10px] md:text-[11px] opacity-60">{tab.count}</span>
					</button>
				{/each}
			</div>
		</div>

		<!-- Projects Grid -->
		<div class="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
			{#each currentProjects as project, i (project.name)}
				<div class="bento-item p-4 md:p-5 group" style="animation-delay: {i * 50}ms">
					<div class="flex items-start justify-between gap-3 md:gap-4">
						<div class="flex-1 min-w-0">
							<h3 class="text-[#fafafa] font-medium text-[14px] md:text-[15px] mb-1 md:mb-1.5">{project.name}</h3>
							<p class="text-[#71717a] text-[12px] md:text-[13px] mb-2 md:mb-3 line-clamp-2">{project.description}</p>
							<div class="flex flex-wrap gap-1 md:gap-1.5">
								{#each project.stack as tech}
									<span class="px-1.5 md:px-2 py-0.5 bg-[#27272a] rounded text-[10px] md:text-[11px] text-[#a1a1aa]">{tech}</span>
								{/each}
							</div>
						</div>
						{#if project.url !== '#'}
							<a
								href={project.url}
								target="_blank"
								class="p-1.5 md:p-2 rounded-lg border border-[#27272a] text-[#71717a] hover:text-[#fafafa] hover:border-[#71717a] smooth shrink-0"
							>
								<Icon icon="mingcute:external-link-line" width="14" class="md:w-4 md:h-4" />
							</a>
						{/if}
					</div>
				</div>
			{/each}
		</div>

	</div>
</section>
