<script lang="ts">
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';

	let sectionRef: HTMLElement;
	let visible = $state(false);

	const skills = [
		{ category: 'Frontend', items: ['TypeScript', 'React', 'Next.js', 'Svelte', 'Tailwind'] },
		{ category: 'Backend', items: ['Node.js', 'Bun', 'Elysia', 'PostgreSQL', 'Redis'] },
		{ category: 'Discord', items: ['Discord.js', 'Sapphire', 'Slash Commands', 'OAuth2'] },
		{ category: 'Minecraft', items: ['Java', 'Paper API', 'Velocity', 'MySQL'] }
	];

	const tools = ['Git', 'Docker', 'Linux', 'VS Code', 'Figma', 'GitHub'];

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

<section id="skills" bind:this={sectionRef} class="py-24 px-6">
	<div class="max-w-6xl mx-auto {visible ? 'animate-in' : 'opacity-0'}">

		<div class="mb-8">
			<h2 class="text-3xl font-bold text-[#fafafa] font-[family-name:var(--font-raleway)] mb-2">
				Технологии
			</h2>
			<p class="text-[#71717a] text-[14px]">Чем я работаю</p>
		</div>

		<!-- Terminal style skills -->
		<div class="terminal mb-8">
			<div class="terminal-header">
				<div class="terminal-dot bg-[#ff5f56]"></div>
				<div class="terminal-dot bg-[#ffbd2e]"></div>
				<div class="terminal-dot bg-[#27c93f]"></div>
				<span class="ml-3 text-[12px] text-[#71717a]">skills.ts</span>
			</div>
			<div class="p-5">
				<div class="code-block">
					<div><span class="keyword">const</span> <span class="function">skills</span> = {'{'}</div>
					{#each skills as skill, i}
						<div class="pl-4">
							<span class="string">{skill.category.toLowerCase()}</span>: [<span class="string">"{skill.items.join('", "')}"</span>],
						</div>
					{/each}
					<div>{'}'}</div>
				</div>
			</div>
		</div>

		<!-- Tools -->
		<div class="flex flex-wrap gap-3">
			{#each tools as tool}
				<div class="px-4 py-2 bg-[#18181b] border border-[#27272a] rounded-lg text-[#a1a1aa] text-[13px] hover:border-[#71717a] smooth">
					{tool}
				</div>
			{/each}
		</div>

	</div>
</section>
