import { createServer } from "http";
import { Server } from "socket.io";
import crypto from "crypto";

const httpServer = createServer();
const io = new Server(httpServer, {
	transports: ["websocket"],
});

let store = [];
let storeHashed = [];
let duplicateCount = 0;

io.on("connection", (socket) => {
	socket.emit("store", store);

	socket.on("draw", (data) => {
		if (!validate(data)) return;

		const hashed = crypto
			.createHash("md5")
			.update(JSON.stringify({ ...data, id: null }))
			.digest("hex");

		if (storeHashed.includes(hashed)) {
			duplicateCount++;
		} else {
			storeHashed.push(hashed);
			store.push(data);
			io.emit("draw", data);
		}

		console.log(
			"Store length:",
			store.length,
			"Duplicates:",
			duplicateCount,
			"Duplicate rate:",
			((duplicateCount / store.length) * 100).toFixed(2) + "%"
		);
	});
});

function validate(data) {
	return true;
}

// at /canvas make send the data array through a stream
// nno cors

httpServer.on("request", (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");

	if (req.url === "/canvas") {
		res.setHeader("Content-Type", "application/json");
		res.write(JSON.stringify(store));
		res.end();
	}
});

httpServer.listen(3003);
