<script>
	import { onMount } from "svelte";
	import { client, loadingText } from "./store/stores";
	import { socket } from "./lib/socket";

	import LoadingScreen from "./components/LoadingScreen.svelte";
	import Canvas from "./components/Canvas.svelte";
	import Toolbar from "./components/Toolbar.svelte";
	import Watermark from "./components/Watermark.svelte";

	onMount(() => {
		// Connect to the server
		socket.connect();
		// Store the socket in the client store
		client.set({ socket });
	});
</script>

<Canvas />
<Toolbar />
<Watermark />

{#if $loadingText}
	<LoadingScreen />
{/if}
