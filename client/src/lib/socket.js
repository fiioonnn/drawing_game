import { io } from "socket.io-client";
import { loadingText } from "../store/stores";

const socket = io("http://localhost:3003", {
	transports: ["websocket"],
	autoConnect: false,
});

socket.on("connect", () => {
	loadingText.set(null);
});

socket.on("disconnect", () => {
	loadingText.set("Connection lost. Reconnecting...");
});

socket.on("connect_error", (error) => {
	loadingText.set("Failed to connect to the server. ");
});

export { socket };
