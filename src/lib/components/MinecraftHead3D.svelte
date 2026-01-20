<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	interface Props {
		username?: string;
		size?: number;
	}

	let { username = 'newer__', size = 80 }: Props = $props();

	let canvas: HTMLCanvasElement;
	let skinViewer: any = null;

	onMount(async () => {
		if (typeof window === 'undefined' || !canvas) return;

		const skinview3d = await import('skinview3d');
		const { SkinViewer } = skinview3d;

		skinViewer = new SkinViewer({
			canvas: canvas,
			width: size,
			height: size,
			skin: `https://mc-heads.net/skin/${username}`
		});

		skinViewer.controls.enableRotate = false;
		skinViewer.controls.enableZoom = false;
		skinViewer.controls.enablePan = false;
		skinViewer.autoRotate = false;

		// Показываем только голову
		skinViewer.playerObject.skin.body.visible = false;
		skinViewer.playerObject.skin.leftArm.visible = false;
		skinViewer.playerObject.skin.rightArm.visible = false;
		skinViewer.playerObject.skin.leftLeg.visible = false;
		skinViewer.playerObject.skin.rightLeg.visible = false;

		// Приблизить камеру и центрировать голову
		skinViewer.camera.position.set(0, 10, 14);
		skinViewer.camera.lookAt(0, 10, 0);
		skinViewer.fov = 50;
	});

	onDestroy(() => {
		if (skinViewer) {
			skinViewer.dispose();
		}
	});
</script>

<div class="skin-viewer rounded-xl overflow-hidden" style="width: {size}px; height: {size}px;">
	<canvas bind:this={canvas} width={size} height={size}></canvas>
</div>
