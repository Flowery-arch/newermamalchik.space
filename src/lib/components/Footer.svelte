<script lang="ts">
	import Icon from '@iconify/svelte';
	const currentYear = new Date().getFullYear();
</script>

<footer class="px-4 md:px-6 py-12 md:py-16">
	<div class="max-w-6xl mx-auto">
		<!-- Main footer content -->
		<div class="flex flex-col items-center text-center gap-6 md:gap-8">
			<!-- Logo and tagline -->
			<div class="flex flex-col items-center gap-3">
				<div class="flex items-center gap-2">
					<img src="/favicon.svg" alt="Logo" class="w-8 h-8 rounded-lg" />
					<span class="text-[#fafafa] text-lg font-medium">newer__</span>
				</div>
				<p class="text-[#71717a] text-[13px] max-w-xs">
					Создаю веб-решения для Minecraft серверов и не только
				</p>
			</div>

			<!-- Social links -->
			<div class="flex items-center gap-1">
				<a
					href="https://github.com/Flowery-arch"
					target="_blank"
					class="p-3 rounded-lg text-[#71717a] hover:text-[#fafafa] hover:bg-[#18181b] smooth"
				>
					<Icon icon="mingcute:github-line" width="20" />
				</a>
				<a
					href="https://t.me/mkphotoss"
					target="_blank"
					class="p-3 rounded-lg text-[#71717a] hover:text-[#fafafa] hover:bg-[#18181b] smooth"
				>
					<Icon icon="mingcute:telegram-line" width="20" />
				</a>
				<a
					href="https://discordapp.com/users/660534347429969931"
					target="_blank"
					class="p-3 rounded-lg text-[#71717a] hover:text-[#fafafa] hover:bg-[#18181b] smooth"
				>
					<Icon icon="mingcute:discord-line" width="20" />
				</a>
			</div>

			<!-- Divider -->
			<div class="w-full max-w-xs h-px bg-[#27272a]"></div>

			<!-- Copyright -->
			<div class="flex flex-col sm:flex-row items-center gap-2 text-[#52525b] text-[12px]">
				<span>© {currentYear} newer__</span>
				<span class="hidden sm:block">·</span>
				<span>Сделано на SvelteKit + Bun</span>
			</div>
		</div>
	</div>
</footer>
