<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	interface Props {
		username?: string;
		width?: number;
		height?: number;
		walk?: boolean;
	}

	let { username = 'newer__', width = 300, height = 400, walk = true }: Props = $props();

	let container: HTMLDivElement;
	let skinViewer: any = null;

	onMount(async () => {
		if (typeof window === 'undefined') return;

		const skinview3d = await import('skinview3d');
		const { SkinViewer, WalkingAnimation, IdleAnimation } = skinview3d;

		skinViewer = new SkinViewer({
			canvas: document.createElement('canvas'),
			width,
			height,
			skin: `https://mc-heads.net/skin/${username}`
		});

		skinViewer.controls.enableRotate = true;
		skinViewer.controls.enableZoom = false;
		skinViewer.controls.enablePan = false;
		skinViewer.autoRotate = true;
		skinViewer.autoRotateSpeed = 1;

		if (walk) {
			skinViewer.animation = new WalkingAnimation();
			skinViewer.animation.speed = 0.6;
		} else {
			skinViewer.animation = new IdleAnimation();
			skinViewer.animation.speed = 0.5;
		}

		skinViewer.camera.position.set(0, 0, 60);
		skinViewer.camera.lookAt(0, 0, 0);

		if (container) {
			container.appendChild(skinViewer.canvas);
		}
	});

	onDestroy(() => {
		if (skinViewer) {
			skinViewer.dispose();
		}
	});
</script>

<div
	bind:this={container}
	class="skin-viewer"
	style="width: {width}px; height: {height}px;"
></div>
