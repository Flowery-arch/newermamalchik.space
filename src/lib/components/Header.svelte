<script lang="ts">
	import { onMount } from 'svelte';

	let scrolled = $state(false);
	let currentTime = $state('');
	let currentDate = $state('');

	function updateDateTime() {
		const now = new Date();
		currentTime = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
		currentDate = now.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
	}

	onMount(() => {
		updateDateTime();
		const timeInterval = setInterval(updateDateTime, 1000);

		const handleScroll = () => {
			scrolled = window.scrollY > 20;
		};
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
			clearInterval(timeInterval);
		};
	});
</script>

<header
	class="fixed top-0 left-0 right-0 z-[100] px-4 md:px-6 py-3 md:py-4 smooth {scrolled ? 'bg-[#09090b]/80 backdrop-blur-xl border-b border-[#27272a]' : ''}"
>
	<div class="max-w-6xl mx-auto flex items-center justify-between">
		<div class="flex items-center gap-1 md:gap-2">
			<a href="/" class="flex items-center gap-2 group">
				<img src="/favicon.svg" alt="Logo" class="w-7 h-7 md:w-8 md:h-8 rounded-lg" />
				<span class="text-[#fafafa] text-sm font-medium hidden sm:block">newer__</span>
			</a>

			<nav class="hidden md:flex items-center gap-1 ml-4">
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
		</div>

		<div class="flex items-center gap-2 text-[12px] md:text-[13px] text-[#a1a1aa]">
			<span class="hidden sm:block">{currentDate}</span>
			<span class="text-[#fafafa] font-medium">{currentTime}</span>
		</div>
	</div>
</header>
