<script lang="ts">
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';

	let sectionRef: HTMLElement;
	let visible = $state(false);

	interface Skill {
		name: string;
		icon: string;
		level: 'expert' | 'advanced' | 'intermediate';
	}

	interface SkillCategory {
		title: string;
		icon: string;
		color: string;
		skills: Skill[];
	}

	const categories: SkillCategory[] = [
		{
			title: 'Фронтенд',
			icon: 'mingcute:code-line',
			color: '#60a5fa',
			skills: [
				{ name: 'TypeScript', icon: 'logos:typescript-icon', level: 'expert' },
				{ name: 'React', icon: 'logos:react', level: 'expert' },
				{ name: 'Next.js', icon: 'logos:nextjs-icon', level: 'expert' },
				{ name: 'Svelte', icon: 'logos:svelte-icon', level: 'advanced' },
				{ name: 'Tailwind', icon: 'logos:tailwindcss-icon', level: 'expert' }
			]
		},
		{
			title: 'Бэкенд',
			icon: 'mingcute:server-2-line',
			color: '#a855f7',
			skills: [
				{ name: 'Node.js', icon: 'logos:nodejs-icon', level: 'expert' },
				{ name: 'Bun', icon: 'logos:bun', level: 'expert' },
				{ name: 'Elysia', icon: 'simple-icons:elysia', level: 'advanced' },
				{ name: 'PostgreSQL', icon: 'logos:postgresql', level: 'advanced' },
				{ name: 'Redis', icon: 'logos:redis', level: 'intermediate' }
			]
		},
		{
			title: 'Discord',
			icon: 'mingcute:discord-line',
			color: '#818cf8',
			skills: [
				{ name: 'Discord.js', icon: 'logos:discord-icon', level: 'expert' },
				{ name: 'Sapphire', icon: 'mingcute:diamond-line', level: 'advanced' },
				{ name: 'Slash Commands', icon: 'mingcute:terminal-line', level: 'expert' },
				{ name: 'OAuth2', icon: 'mingcute:key-2-line', level: 'advanced' }
			]
		},
		{
			title: 'Minecraft',
			icon: 'mingcute:game-2-line',
			color: '#22c55e',
			skills: [
				{ name: 'Java', icon: 'logos:java', level: 'advanced' },
				{ name: 'Paper API', icon: 'mingcute:file-code-line', level: 'advanced' },
				{ name: 'Velocity', icon: 'mingcute:rocket-line', level: 'intermediate' },
				{ name: 'MySQL', icon: 'logos:mysql', level: 'advanced' }
			]
		}
	];

	const tools = [
		{ name: 'Git', icon: 'logos:git-icon' },
		{ name: 'Docker', icon: 'logos:docker-icon' },
		{ name: 'Linux', icon: 'logos:linux-tux' },
		{ name: 'VS Code', icon: 'logos:visual-studio-code' },
		{ name: 'Figma', icon: 'logos:figma' },
		{ name: 'GitHub', icon: 'logos:github-icon' }
	];

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
	id="skills"
	bind:this={sectionRef}
	class="relative py-24 lg:py-32"
>
	<!-- Background -->
	<div class="absolute inset-0 h-full w-full dot-pattern z-5 opacity-50 mask-y-from-80"></div>

	<div class="px-8 lg:px-16 xl:px-24 relative z-50 {visible ? 'animate-fade-in-up' : 'opacity-0'}">

		<!-- Header -->
		<div class="flex flex-col gap-3 mb-12">
			<div class="flex items-center gap-3">
				<div class="w-10 h-10 rounded-xl bg-violet-500/15 flex items-center justify-center">
					<Icon icon="mingcute:tool-line" class="text-violet-400" width="20" />
				</div>
				<h2 class="font-[family-name:var(--font-raleway)] font-bold text-white text-3xl lg:text-4xl">
					Технологии
				</h2>
			</div>
			<p class="font-[family-name:var(--font-zed)] text-white/50 text-[13px] max-w-lg">
				Инструменты и технологии, которые использую в работе
			</p>
		</div>

		<!-- Skills - horizontal scrollable on mobile, grid on desktop -->
		<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
			{#each categories as category}
				<div class="flex flex-col gap-4 p-5 rounded-2xl border border-white/8 bg-white/3">
					<!-- Category header -->
					<div class="flex items-center gap-3">
						<div
							class="w-8 h-8 rounded-lg flex items-center justify-center"
							style="background-color: {category.color}15"
						>
							<Icon icon={category.icon} width="16" style="color: {category.color}" />
						</div>
						<span class="font-[family-name:var(--font-raleway)] font-semibold text-white text-[15px]">{category.title}</span>
					</div>

					<!-- Skills list -->
					<div class="flex flex-wrap gap-2">
						{#each category.skills as skill}
							<div class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 hover:border-white/15 smooth">
								<Icon icon={skill.icon} width="14" />
								<span class="font-[family-name:var(--font-zed)] text-white/70 text-[12px]">{skill.name}</span>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>

		<!-- Tools section -->
		<div class="flex flex-col gap-5">
			<div class="flex items-center gap-4">
				<div class="h-px bg-white/10 flex-1"></div>
				<span class="font-[family-name:var(--font-zed)] text-white/30 text-[11px] uppercase tracking-wider">Инструменты</span>
				<div class="h-px bg-white/10 flex-1"></div>
			</div>

			<div class="flex flex-wrap justify-center gap-3">
				{#each tools as tool}
					<div class="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/8 hover:border-white/20 bg-white/3 hover:bg-white/5 smooth cursor-default">
						<Icon icon={tool.icon} width="16" />
						<span class="font-[family-name:var(--font-zed)] text-white/60 text-[12px]">{tool.name}</span>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
