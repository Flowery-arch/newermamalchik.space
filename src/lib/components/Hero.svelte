<script lang="ts">
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import MinecraftSkin3D from './MinecraftSkin3D.svelte';

	let visible = $state(false);

	onMount(() => {
		setTimeout(() => {
			visible = true;
		}, 100);
	});

	const highlights = [
		{ icon: 'mingcute:laptop-line', text: 'Сайты', color: '#60a5fa' },
		{ icon: 'mingcute:discord-line', text: 'Discord боты', color: '#818cf8' },
		{ icon: 'mingcute:game-2-line', text: 'Плагины', color: '#22c55e' },
		{ icon: 'mingcute:api-line', text: 'API', color: '#f59e0b' }
	];
</script>

<section class="flex flex-col relative min-h-screen">
	<!-- Gradient background -->
	<div class="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-transparent to-transparent"></div>

	<!-- Subtle grid -->
	<div class="absolute inset-0 h-full w-full grid-pattern z-5 opacity-50 mask-b-from-60"></div>

	<!-- Main content - asymmetric layout -->
	<div class="flex flex-1 flex-col lg:flex-row relative z-50">

		<!-- Left side - Text (takes more space) -->
		<div class="flex flex-col justify-center px-8 lg:px-16 xl:px-24 py-32 lg:py-0 lg:flex-1">
			<div class="flex flex-col items-start gap-6 max-w-2xl">

				<!-- Status badge -->
				<div
					class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 smooth {visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}"
					style="transition-delay: 0ms"
				>
					<div class="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
					<span class="font-[family-name:var(--font-zed)] text-green-300 text-[11px]">Доступен для работы</span>
				</div>

				<!-- Name and title -->
				<div class="flex flex-col gap-2 smooth {visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}" style="transition-delay: 100ms">
					<span class="font-[family-name:var(--font-zed)] text-white/50 text-[13px] tracking-wide">Привет, меня зовут</span>
					<h1 class="font-[family-name:var(--font-raleway)] font-bold text-white text-4xl lg:text-6xl tracking-tight">
						newer<span class="text-blue-400">__</span>
					</h1>
				</div>

				<!-- Description -->
				<p class="font-[family-name:var(--font-zed)] text-white/60 text-[13px] leading-relaxed smooth {visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}" style="transition-delay: 200ms">
					Создаю <span class="text-green-300">сайты для Minecraft серверов</span>, <span class="text-indigo-300">Discord ботов</span> и <span class="text-amber-300">API</span>. Использую Next.js, React, Svelte, TypeScript и Bun.
				</p>

				<!-- Highlights -->
				<div
					class="flex flex-wrap gap-2 mt-2 smooth {visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}"
					style="transition-delay: 300ms"
				>
					{#each highlights as item}
						<div
							class="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5"
						>
							<Icon icon={item.icon} width="14" style="color: {item.color}" />
							<span class="font-[family-name:var(--font-zed)] text-white/70 text-[12px]">{item.text}</span>
						</div>
					{/each}
				</div>

				<!-- CTA buttons -->
				<div
					class="flex flex-wrap gap-3 mt-4 smooth {visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}"
					style="transition-delay: 400ms"
				>
					<a
						href="#projects"
						class="flex gap-2 items-center px-5 py-2.5 bg-blue-500 hover:bg-blue-400 text-white rounded-xl f-smooth font-[family-name:var(--font-zed)] text-[13px] font-medium"
					>
						<Icon icon="mingcute:box-3-line" width="16" />
						Мои проекты
					</a>

					<a
						href="https://t.me/mkphotoss"
						target="_blank"
						class="flex gap-2 items-center px-5 py-2.5 border border-white/20 hover:border-white/40 hover:bg-white/5 rounded-xl f-smooth"
					>
						<Icon icon="mingcute:telegram-line" class="text-sky-300" width="16" />
						<span class="font-[family-name:var(--font-zed)] text-white text-[13px]">Написать</span>
					</a>
				</div>

				<!-- Stats row -->
				<div
					class="flex gap-8 mt-6 pt-6 border-t border-white/10 smooth {visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}"
					style="transition-delay: 500ms"
				>
					<div class="flex flex-col gap-1">
						<span class="font-[family-name:var(--font-raleway)] font-bold text-white text-2xl">6+</span>
						<span class="font-[family-name:var(--font-zed)] text-white/40 text-[11px]">Сайтов</span>
					</div>
					<div class="flex flex-col gap-1">
						<span class="font-[family-name:var(--font-raleway)] font-bold text-white text-2xl">5+</span>
						<span class="font-[family-name:var(--font-zed)] text-white/40 text-[11px]">API</span>
					</div>
					<div class="flex flex-col gap-1">
						<span class="font-[family-name:var(--font-raleway)] font-bold text-white text-2xl">2+</span>
						<span class="font-[family-name:var(--font-zed)] text-white/40 text-[11px]">Года опыта</span>
					</div>
				</div>
			</div>
		</div>

		<!-- Right side - 3D Skin (smaller, offset) -->
		<div
			class="hidden lg:flex items-center justify-center lg:w-[400px] xl:w-[480px] relative smooth {visible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}"
			style="transition-delay: 300ms"
		>
			<!-- Decorative elements -->
			<div class="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500/15 rounded-full blur-3xl"></div>
			<div class="absolute bottom-1/3 left-1/4 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl"></div>

			<!-- Skin container -->
			<div class="relative">
				<MinecraftSkin3D username="newer__" width={300} height={400} walk={true} />

				<!-- Floating label -->
				<div class="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-[#0a0d14]/90 backdrop-blur-sm">
					<div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
					<span class="font-[family-name:var(--font-zed)] text-white/60 text-[11px]">newer__</span>
				</div>
			</div>
		</div>
	</div>

	<!-- Scroll indicator -->
	<div
		class="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 smooth {visible ? 'opacity-60' : 'opacity-0'}"
		style="transition-delay: 600ms"
	>
		<div class="w-5 h-8 rounded-full border border-white/20 flex justify-center pt-2">
			<div class="w-1 h-2 bg-white/40 rounded-full animate-bounce"></div>
		</div>
	</div>
</section>
