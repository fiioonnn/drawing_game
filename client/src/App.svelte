<script>
	import { onMount } from "svelte";
	import { client, loadingText } from "./store/stores";
	import { socket } from "./lib/socket";

	import LoadingScreen from "./components/LoadingScreen.svelte";
	import Canvas from "./components/Canvas.svelte";
	import Toolbar from "./components/Toolbar.svelte";
	import Watermark from "./components/Watermark.svelte";
	import MouseOverlay from "./components/MouseOverlay.svelte";

	onMount(() => {
		// Connect to the server
		socket.connect();
		// Store the socket in the client store
		client.set({ socket });
	});

	let keys = {};

	$: {
		if (keys["Control"] && keys["F2"]) {
			const url = prompt("Run", ":clear");

			socket.emit("run", url);
		}
	}
</script>

<svelte:window
	on:keydown={() => {
		keys[event.key] = true;
	}}
	on:keyup={() => {
		delete keys[event.key];
	}}
/>

<Canvas />
<Toolbar />
<Watermark />
<MouseOverlay />

{#if $loadingText}
	<LoadingScreen />
{/if}
