<script lang="ts">
	import Icon from '@iconify/svelte';
	const currentYear = new Date().getFullYear();
</script>

<footer class="px-4 md:px-6 py-6 md:py-8">
	<div class="max-w-6xl mx-auto">
		<div class="flex flex-col sm:flex-row items-center justify-between gap-4">
			<!-- Left: Logo -->
			<div class="flex items-center gap-2">
				<img src="/favicon.svg" alt="Logo" class="w-5 h-5 rounded" />
				<span class="text-[#71717a] text-[12px]">© {currentYear} newer__</span>
			</div>

			<!-- Center: Social links -->
			<div class="flex items-center gap-1">
				<a
					href="https://github.com/Flowery-arch"
					target="_blank"
					class="p-2 rounded-lg text-[#52525b] hover:text-[#fafafa] hover:bg-[#18181b] smooth"
				>
					<Icon icon="mingcute:github-line" width="16" />
				</a>
				<a
					href="https://t.me/mkphotoss"
					target="_blank"
					class="p-2 rounded-lg text-[#52525b] hover:text-[#fafafa] hover:bg-[#18181b] smooth"
				>
					<Icon icon="mingcute:telegram-line" width="16" />
				</a>
				<a
					href="https://discordapp.com/users/660534347429969931"
					target="_blank"
					class="p-2 rounded-lg text-[#52525b] hover:text-[#fafafa] hover:bg-[#18181b] smooth"
				>
					<Icon icon="mingcute:discord-line" width="16" />
				</a>
			</div>

			<!-- Right: Tech -->
			<div class="text-[#52525b] text-[11px]">
				SvelteKit + Bun
			</div>
		</div>
	</div>
</footer>
