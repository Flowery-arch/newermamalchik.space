<script lang="ts">
	import { onMount } from 'svelte';
	import MinecraftSkin3D from './MinecraftSkin3D.svelte';

	let visible = $state(false);

	onMount(() => {
		setTimeout(() => visible = true, 100);
	});
</script>

<section class="min-h-screen flex items-center justify-center px-4 md:px-6 pt-16 md:pt-20 pb-8">
	<div class="max-w-6xl w-full">
		<!-- Bento Grid Layout -->
		<div class="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">

			<!-- Main intro card - spans 2 columns on both mobile and desktop -->
			<div class="col-span-2 bento-item p-5 md:p-8 {visible ? 'animate-in' : 'opacity-0'}">
				<div class="flex flex-col gap-4 md:gap-6">
					<div class="flex items-center gap-2 md:gap-3">
						<div class="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500 animate-pulse"></div>
						<span class="text-[11px] md:text-[13px] text-[#a1a1aa]">Доступен для работы</span>
					</div>

					<div>
						<h1 class="text-2xl sm:text-3xl md:text-5xl font-bold text-[#fafafa] font-[family-name:var(--font-raleway)] mb-2 md:mb-3">
							Привет, я <span class="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">newer__</span>
						</h1>
						<p class="text-[#a1a1aa] text-[13px] md:text-[15px] leading-relaxed max-w-xl">
							Создаю сайты для <span class="text-green-400">Minecraft серверов</span>,
							<span class="text-indigo-400">Discord ботов</span> и
							<span class="text-amber-400">API</span>.
							<span class="hidden sm:inline">Работаю с Next.js, React, Svelte, TypeScript и Bun.</span>
						</p>
					</div>

					<div class="flex flex-wrap gap-1.5 md:gap-2">
						<span class="badge text-[10px] md:text-[12px]">
							<span class="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-blue-500"></span>
							Next.js
						</span>
						<span class="badge text-[10px] md:text-[12px]">
							<span class="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-cyan-500"></span>
							React
						</span>
						<span class="badge text-[10px] md:text-[12px]">
							<span class="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-orange-500"></span>
							Svelte
						</span>
						<span class="badge text-[10px] md:text-[12px]">
							<span class="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-blue-400"></span>
							TypeScript
						</span>
					</div>

					<div class="flex gap-2 md:gap-3 pt-1 md:pt-2">
						<a
							href="#projects"
							class="px-4 md:px-5 py-2 md:py-2.5 rounded-lg md:rounded-xl text-[12px] md:text-[13px] text-[#a1a1aa] hover:text-[#fafafa] border border-[#27272a] hover:border-[#3f3f46] hover:bg-[#18181b] smooth"
						>
							Смотреть проекты
						</a>
						<a
							href="https://github.com/Flowery-arch"
							target="_blank"
							class="px-4 md:px-5 py-2 md:py-2.5 rounded-lg md:rounded-xl text-[12px] md:text-[13px] text-[#a1a1aa] hover:text-[#fafafa] border border-[#27272a] hover:border-[#3f3f46] hover:bg-[#18181b] smooth"
						>
							GitHub
						</a>
					</div>
				</div>
			</div>

			<!-- 3D Skin card -->
			<div class="col-span-2 md:col-span-1 bento-item p-4 md:p-6 flex items-center justify-center glow-purple {visible ? 'animate-in' : 'opacity-0'}" style="animation-delay: 100ms">
				<MinecraftSkin3D username="newer__" width={200} height={280} walk={true} />
			</div>

			<!-- Stats cards -->
			<div class="bento-item p-4 md:p-6 {visible ? 'animate-in' : 'opacity-0'}" style="animation-delay: 200ms">
				<div class="text-[#71717a] text-[10px] md:text-[11px] uppercase tracking-wider mb-1 md:mb-2">Проекты</div>
				<div class="text-2xl md:text-4xl font-bold text-[#fafafa] font-[family-name:var(--font-raleway)]">6+</div>
				<div class="text-[#a1a1aa] text-[11px] md:text-[13px] mt-0.5 md:mt-1">Сайтов создано</div>
			</div>

			<div class="bento-item p-4 md:p-6 {visible ? 'animate-in' : 'opacity-0'}" style="animation-delay: 250ms">
				<div class="text-[#71717a] text-[10px] md:text-[11px] uppercase tracking-wider mb-1 md:mb-2">API</div>
				<div class="text-2xl md:text-4xl font-bold text-[#fafafa] font-[family-name:var(--font-raleway)]">5+</div>
				<div class="text-[#a1a1aa] text-[11px] md:text-[13px] mt-0.5 md:mt-1">Сервисов</div>
			</div>

			<div class="bento-item p-4 md:p-6 {visible ? 'animate-in' : 'opacity-0'}" style="animation-delay: 300ms">
				<div class="text-[#71717a] text-[10px] md:text-[11px] uppercase tracking-wider mb-1 md:mb-2">Опыт</div>
				<div class="text-2xl md:text-4xl font-bold text-[#fafafa] font-[family-name:var(--font-raleway)]">2+</div>
				<div class="text-[#a1a1aa] text-[11px] md:text-[13px] mt-0.5 md:mt-1">Года в разработке</div>
			</div>

		</div>
	</div>
</section>
