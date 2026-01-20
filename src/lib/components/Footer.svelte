<script lang="ts">
	import Icon from '@iconify/svelte';
	const currentYear = new Date().getFullYear();
</script>

<footer class="px-6 py-8 border-t border-[#27272a]">
	<div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
		<div class="flex items-center gap-2">
			<img src="/favicon.svg" alt="Logo" class="w-6 h-6 rounded" />
			<span class="text-[#fafafa] text-[13px]">newer__</span>
		</div>

		<p class="text-[#71717a] text-[12px]">
			© {currentYear} · Svelte + Bun
		</p>

		<div class="flex items-center gap-2">
			<a href="https://github.com/Flowery-arch" target="_blank" class="p-2 text-[#71717a] hover:text-[#fafafa] smooth">
				<Icon icon="mingcute:github-line" width="18" />
			</a>
			<a href="https://t.me/mkphotoss" target="_blank" class="p-2 text-[#71717a] hover:text-[#fafafa] smooth">
				<Icon icon="mingcute:telegram-line" width="18" />
			</a>
			<a href="https://discordapp.com/users/660534347429969931" target="_blank" class="p-2 text-[#71717a] hover:text-[#fafafa] smooth">
				<Icon icon="mingcute:discord-line" width="18" />
			</a>
		</div>
	</div>
</footer>
