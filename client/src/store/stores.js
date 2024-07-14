import { writable } from "svelte/store";

export const version = writable("1.0.0");

export const client = writable({
	socket: null,
});

export const loadingText = writable(null);

export const size = writable(5);
export const color = writable("black");
export const tool = writable("pen");

export const isDrawing = writable(false);
