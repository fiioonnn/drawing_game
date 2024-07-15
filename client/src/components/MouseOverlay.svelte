<script>
	import { onMount } from "svelte";
	import { socket } from "../lib/socket";
	import Mouse from "./Mouse.svelte";

	let pos;
	let positions = {};

	onMount(() => {
		socket.on("mouse", (data) => {
			if (data.id === socket.id) return;

			positions[data.id] = data;
		});

		setInterval(() => {
			// remove all positions older than 5 seconds
			Object.keys(positions).forEach((key) => {
				if (positions[key].id === socket.id) return;
				if (Date.now() - positions[key].timestamp > 500) {
					positions = Object.fromEntries(
						Object.entries(positions).filter(([k, v]) => k !== key)
					);
				}
			});

			if (socket.disconnected) {
				positions = {};
			}
		}, 1000);
	});

	const handleMouseMove = (e) => {
		pos = { x: e.clientX, y: e.clientY };

		socket.emit("mouse", pos);
	};
</script>

<svelte:window on:mousemove={handleMouseMove} />

{#each Object.values(positions) as position (position.id)}
	<Mouse x={position.x} y={position.y} />
{/each}

<style>
</style>
