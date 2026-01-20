<script lang="ts">
	import { onMount } from 'svelte';

	let scrolled = $state(false);

	onMount(() => {
		const handleScroll = () => {
			scrolled = window.scrollY > 20;
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<header
	class="fixed top-0 left-0 right-0 z-[100] px-4 md:px-6 py-3 md:py-4 smooth {scrolled ? 'bg-[#09090b]/80 backdrop-blur-xl border-b border-[#27272a]' : ''}"
>
	<div class="max-w-6xl mx-auto flex items-center justify-between">
		<a href="/" class="flex items-center gap-2 group">
			<img src="/favicon.svg" alt="Logo" class="w-7 h-7 md:w-8 md:h-8 rounded-lg" />
			<span class="text-[#fafafa] text-sm font-medium hidden sm:block">newer__</span>
		</a>

		<nav class="hidden md:flex items-center gap-1">
			<a href="#projects" class="px-3 py-1.5 text-[13px] text-[#a1a1aa] hover:text-[#fafafa] hover:bg-[#27272a] rounded-lg smooth">
				Проекты
			</a>
			<a href="#skills" class="px-3 py-1.5 text-[13px] text-[#a1a1aa] hover:text-[#fafafa] hover:bg-[#27272a] rounded-lg smooth">
				Стек
			</a>
			<a href="#about" class="px-3 py-1.5 text-[13px] text-[#a1a1aa] hover:text-[#fafafa] hover:bg-[#27272a] rounded-lg smooth">
				Обо мне
			</a>
		</nav>

		<a
			href="https://t.me/mkphotoss"
			target="_blank"
			class="group relative px-3 md:px-4 py-1.5 rounded-lg text-[12px] md:text-[13px] font-medium overflow-hidden smooth"
		>
			<span class="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600"></span>
			<span class="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 smooth"></span>
			<span class="relative text-white">Связаться</span>
		</a>
	</div>
</header>
