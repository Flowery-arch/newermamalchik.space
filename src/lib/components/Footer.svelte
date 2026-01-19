<script lang="ts">
	import Icon from '@iconify/svelte';

	const currentYear = new Date().getFullYear();

	const links = [
		{ name: 'GitHub', href: 'https://github.com/Flowery-arch', icon: 'mingcute:github-line' },
		{ name: 'Telegram', href: 'https://t.me/mkphotoss', icon: 'mingcute:telegram-line' },
		{ name: 'Discord', href: 'https://discordapp.com/users/660534347429969931', icon: 'mingcute:discord-line' }
	];
</script>

<footer class="relative px-8 lg:px-24 py-10 border-t border-white/5">
	<div class="flex flex-col lg:flex-row items-center justify-between gap-6">
		<!-- Left side -->
		<div class="flex flex-col items-center lg:items-start gap-2">
			<a href="/" class="flex items-center gap-3 group">
				<div class="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center overflow-hidden">
					<img src="/favicon.svg" alt="Logo" class="w-5 h-5 object-contain" />
				</div>
				<span class="font-[family-name:var(--font-raleway)] font-semibold text-white text-[13px] group-hover:text-blue-200 smooth">
					newer<span class="text-white/40">__</span>
				</span>
			</a>
			<p class="font-[family-name:var(--font-zed)] text-white/40 text-[11px]">
				© {currentYear} Все права защищены
			</p>
		</div>

		<!-- Center -->
		<p class="font-[family-name:var(--font-zed)] text-white/30 text-[11px] flex items-center gap-2">
			Сделано с
			<span class="gradient-text">любовью</span>
			на
			<span class="text-orange-200">Svelte</span>
			+
			<span class="text-amber-200">Bun</span>
		</p>

		<!-- Right side - Social links -->
		<div class="flex items-center gap-3">
			{#each links as link}
				<a
					href={link.href}
					target="_blank"
					class="flex items-center justify-center w-9 h-9 rounded-full border border-dotted border-white/10 hover:border-white/30 hover:bg-white/5 smooth"
				>
					<Icon icon={link.icon} class="text-white/60 hover:text-white" width="16" />
				</a>
			{/each}
		</div>
	</div>
</footer>
