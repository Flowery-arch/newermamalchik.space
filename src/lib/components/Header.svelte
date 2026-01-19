<script lang="ts">
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';

	let scrolled = $state(false);
	let time = $state('');
	let date = $state('');

	const navLinks = [
		{ href: '#about', label: 'Обо мне' },
		{ href: '#projects', label: 'Проекты' },
		{ href: '#skills', label: 'Навыки' }
	];

	function updateTime() {
		const now = new Date();
		time = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
		date = now.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
	}

	onMount(() => {
		updateTime();
		const interval = setInterval(updateTime, 1000);

		const handleScroll = () => {
			scrolled = window.scrollY > 50;
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			clearInterval(interval);
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<header
	class="fixed top-0 left-0 right-0 z-100 smooth {scrolled ? 'header-scrolled' : ''}"
>
	<div class="flex items-center justify-between px-8 lg:px-24 py-4">
		<!-- Logo + Navigation -->
		<div class="flex items-center gap-8">
			<a href="/" class="flex items-center gap-3 group">
				<img src="/favicon.svg" alt="Logo" class="w-8 h-8 rounded-lg" />
				<span class="font-[family-name:var(--font-raleway)] font-semibold text-white text-[14px] group-hover:text-blue-300 smooth">
					newer<span class="text-white/40">__</span>
				</span>
			</a>

			<!-- Desktop Navigation (next to logo) -->
			<nav class="hidden lg:flex items-center gap-5">
				{#each navLinks as link}
					<a
						href={link.href}
						class="font-[family-name:var(--font-zed)] text-white/60 hover:text-white text-[12px] smooth"
					>
						{link.label}
					</a>
				{/each}
			</nav>
		</div>

		<!-- Right side -->
		<div class="flex items-center gap-3">
			<!-- Time display -->
			<div class="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border border-dotted border-white/10">
				<Icon icon="mingcute:time-line" class="text-white/40" width="12" />
				<span class="font-[family-name:var(--font-zed)] text-white/60 text-[11px]">{time}</span>
				<span class="text-white/20">•</span>
				<span class="font-[family-name:var(--font-zed)] text-white/40 text-[11px]">{date}</span>
			</div>

			<!-- Contact button -->
			<a
				href="https://t.me/mkphotoss"
				target="_blank"
				class="flex gap-2 items-center px-4 py-1.5 border border-dotted border-sky-300/30 hover:border-sky-300 rounded-full hover:bg-sky-500/10 f-smooth"
			>
				<Icon icon="mingcute:telegram-line" class="text-sky-300" width="14" />
				<span class="font-[family-name:var(--font-zed)] text-sky-300 text-[11px] hidden sm:inline">Связаться</span>
			</a>
		</div>
	</div>
</header>
