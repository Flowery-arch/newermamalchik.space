<script lang="ts">
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';

	let sectionRef: HTMLElement;
	let visible = $state(false);
	let collapsed = $state(false);
	let codeCopied = $state(false);

	const skills = [
		{ category: 'Frontend', items: ['TypeScript', 'React', 'Next.js', 'Svelte', 'Tailwind'] },
		{ category: 'Backend', items: ['Node.js', 'Bun', 'Elysia', 'PostgreSQL', 'Redis'] },
		{ category: 'Discord', items: ['Discord.js', 'Sapphire', 'Slash Commands', 'OAuth2'] },
		{ category: 'Minecraft', items: ['Java', 'Paper API', 'Velocity', 'MySQL'] }
	];

	const tools = ['Git', 'Docker', 'Linux', 'VS Code', 'Figma', 'GitHub'];

	const codeSnippet = `<script lang="ts">
  import Skills from '$lib/components/Skills.svelte';
<` + `/script>

<Skills />`;

	async function copyCode() {
		await navigator.clipboard.writeText(codeSnippet);
		codeCopied = true;
		setTimeout(() => codeCopied = false, 2000);
	}

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) visible = true;
			},
			{ threshold: 0.1 }
		);
		if (sectionRef) observer.observe(sectionRef);
		return () => observer.disconnect();
	});
</script>

<section id="skills" bind:this={sectionRef} class="py-16 md:py-24 px-4 md:px-6">
	<div class="max-w-6xl mx-auto {visible ? 'animate-in' : 'opacity-0'}">

		<div class="mb-6 md:mb-8">
			<h2 class="text-2xl md:text-3xl font-bold text-[#fafafa] font-[family-name:var(--font-raleway)] mb-1 md:mb-2">
				Технологии
			</h2>
			<p class="text-[#71717a] text-[12px] md:text-[14px]">Чем я работаю</p>
		</div>

		<!-- Terminal style skills with collapse -->
		<div class="bento-item overflow-hidden mb-4 md:mb-6">
			<!-- Terminal header with window buttons -->
			<div class="flex items-center justify-between px-4 py-3 bg-[#18181b] border-b border-[#27272a]">
				<div class="flex items-center gap-2">
					<Icon icon="mingcute:code-line" class="text-[#71717a]" width="14" />
					<span class="text-[#a1a1aa] text-[11px] md:text-[12px]">skills.ts</span>
				</div>
				<div class="flex items-center gap-3">
					<!-- Copy button -->
					<button
						onclick={copyCode}
						class="flex items-center gap-1.5 px-2 py-1 rounded-md text-[#52525b] hover:text-[#fafafa] hover:bg-white/5 smooth text-[10px]"
					>
						{#if codeCopied}
							<Icon icon="mingcute:check-line" width="12" class="text-green-500" />
							<span class="text-green-500 hidden sm:inline">Скопировано</span>
						{:else}
							<Icon icon="mingcute:copy-2-line" width="12" />
							<span class="hidden sm:inline">Копировать</span>
						{/if}
					</button>
					<!-- Window buttons -->
					<div class="flex gap-1.5">
						<button class="window-btn w-3 h-3 rounded-full bg-[#ff5f57] smooth group relative">
							<Icon icon="mingcute:close-line" width="8" class="window-btn-icon absolute inset-0 m-auto text-[#7a0000] opacity-0 group-hover:opacity-100" />
						</button>
						<button
							onclick={() => collapsed = !collapsed}
							class="window-btn w-3 h-3 rounded-full bg-[#febc2e] smooth group relative"
						>
							<Icon icon="mingcute:minimize-line" width="8" class="window-btn-icon absolute inset-0 m-auto text-[#7a5500] opacity-0 group-hover:opacity-100" />
						</button>
						<button class="window-btn w-3 h-3 rounded-full bg-[#28c840] smooth group relative">
							<Icon icon="mingcute:fullscreen-line" width="8" class="window-btn-icon absolute inset-0 m-auto text-[#006400] opacity-0 group-hover:opacity-100" />
						</button>
					</div>
				</div>
			</div>

			<!-- Collapsible content -->
			<div class="skills-content {collapsed ? 'collapsed' : ''}">
				<div class="p-4 md:p-5">
					<div class="code-block font-mono text-[11px] md:text-[12px]">
						<div><span class="text-purple-400">const</span> <span class="text-blue-400">skills</span> = {'{'}</div>
						{#each skills as skill}
							<div class="pl-4">
								<span class="text-green-400">{skill.category.toLowerCase()}</span>: [<span class="text-amber-300">"{skill.items.join('", "')}"</span>],
							</div>
						{/each}
						<div>{'}'}</div>
					</div>
				</div>
			</div>

			<!-- Collapsed state indicator -->
			{#if collapsed}
				<button
					onclick={() => collapsed = false}
					class="w-full px-4 py-3 flex items-center justify-center gap-2 text-[#52525b] hover:text-[#a1a1aa] hover:bg-white/5 smooth"
				>
					<Icon icon="mingcute:arrow-down-line" width="14" />
					<span class="text-[11px]">Развернуть</span>
				</button>
			{/if}
		</div>

		<!-- Code snippet card -->
		<div class="bento-item overflow-hidden mb-4 md:mb-6">
			<div class="flex items-center justify-between px-4 py-3 bg-[#18181b] border-b border-[#27272a]">
				<div class="flex items-center gap-2">
					<Icon icon="mingcute:file-line" class="text-[#71717a]" width="14" />
					<span class="text-[#a1a1aa] text-[11px] md:text-[12px]">+page.svelte</span>
				</div>
			</div>
			<pre class="p-4 text-[11px] md:text-[12px] font-mono overflow-x-auto"><code class="text-[#71717a]"><span class="text-purple-400">&lt;script lang="ts"&gt;</span>
  <span class="text-blue-400">import</span> Skills <span class="text-blue-400">from</span> <span class="text-green-400">'$lib/components/Skills.svelte'</span>;
<span class="text-purple-400">&lt;/script&gt;</span>

<span class="text-purple-400">&lt;Skills /&gt;</span></code></pre>
		</div>

		<!-- Tools -->
		<div class="flex flex-wrap gap-2 md:gap-3">
			{#each tools as tool}
				<div class="px-3 md:px-4 py-1.5 md:py-2 bg-[#18181b] border border-[#27272a] rounded-lg text-[#a1a1aa] text-[11px] md:text-[13px] hover:border-[#3f3f46] smooth">
					{tool}
				</div>
			{/each}
		</div>

	</div>
</section>

<style>
	.skills-content {
		max-height: 500px;
		overflow: hidden;
		transition: max-height 0.3s ease, opacity 0.3s ease;
		opacity: 1;
	}

	.skills-content.collapsed {
		max-height: 0;
		opacity: 0;
	}

	.window-btn:hover {
		transform: scale(1.1);
	}

	.window-btn-icon {
		transition: opacity 0.15s ease;
	}

	.code-block {
		line-height: 1.6;
	}
</style>
