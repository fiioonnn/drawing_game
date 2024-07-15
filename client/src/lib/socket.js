import { io } from "socket.io-client";
import { loadingText, onlineCount, serverUrl } from "../store/stores";

let url = null;

serverUrl.subscribe((value) => {
	url = value;
});

const socket = io(url, {
	transports: ["websocket"],
	autoConnect: false,
});

socket.on("connect", () => {
	loadingText.set(null);
});

socket.on("disconnect", (error) => {
	loadingText.set("Connection lost. Reconnecting...");
	console.error(error);
	setTimeout(() => {
		if (socket.disconnected) {
			// reload page
			window.location.reload();
		}
	}, 3500);
});

socket.on("connect_error", (error) => {
	loadingText.set("Failed to connect to the server. ");
});

socket.on("info:online_count", (data) => {
	onlineCount.set(data);
});

export { socket };
