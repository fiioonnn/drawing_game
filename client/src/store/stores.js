import { writable } from "svelte/store";

export const version = writable("1.1.0");
export const serverUrl = writable("https://node1.sbooky.io");

export const client = writable({
	socket: null,
});

export const loadingText = writable(null);

export const size = writable(5);
export const color = writable("#ffffff");
export const tool = writable("pen");

export const isDrawing = writable(false);
export const onlineCount = writable(0);
