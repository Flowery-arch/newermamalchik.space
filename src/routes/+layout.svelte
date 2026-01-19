<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>newer__ | Full-stack разработчик</title>
	<meta name="description" content="Full-stack разработчик из России. Создаю сайты для Minecraft серверов, Discord ботов, плагины и API сервисы." />
	<meta name="keywords" content="minecraft, discord, бот, плагин, api, сайт сервера, разработчик, svelte, typescript, next.js" />
	<meta name="author" content="newer__" />
	<meta property="og:title" content="newer__ | Full-stack разработчик" />
	<meta property="og:description" content="Создаю сайты для Minecraft серверов, Discord ботов, плагины и API." />
	<meta property="og:type" content="website" />
	<meta name="theme-color" content="#60a5fa" />
	<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
</svelte:head>

<div class="min-h-screen flex flex-col">
	<Header />
	<main class="flex-1 flex flex-col">
		{@render children()}
	</main>
	<Footer />
</div>
