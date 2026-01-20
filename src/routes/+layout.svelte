<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>newer__ - Разработчик Minecraft платформ и Discord ботов</title>
	<meta name="description" content="newer__ - разработчик из России. Специализируюсь на создании веб-платформ для Minecraft проектов, Discord ботов и API сервисов. TypeScript, Svelte, React, Node.js." />
	<meta name="keywords" content="newer__, minecraft, discord, бот, плагин, api, сайт сервера, разработчик, svelte, typescript, next.js, портфолио" />
	<meta name="author" content="newer__ (Flowery-arch)" />
	<meta property="og:title" content="newer__ - Разработчик Minecraft платформ и Discord ботов" />
	<meta property="og:description" content="Личное портфолио разработчика newer__. Создаю современные веб-платформы, Discord боты и API для Minecraft проектов." />
	<meta property="og:type" content="website" />
	<meta name="theme-color" content="#60a5fa" />
	<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
</svelte:head>

<div class="noise"></div>
<div class="min-h-screen flex flex-col">
	<Header />
	<main class="flex-1 flex flex-col">
		{@render children()}
	</main>
	<Footer />
</div>
