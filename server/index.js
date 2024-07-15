const { createServer } = require("http");
const { Server } = require("socket.io");
const crypto = require("crypto");
const fs = require("fs");

const httpServer = createServer();
const io = new Server(httpServer, {
	transports: ["websocket"],
	cors: {
		origin: "*",
	},
});

let store = [];
let storeHashed = [];
let duplicateCount = 0;

const password = "booo";

io.on("connection", (socket) => {
	io.emit("info:online_count", io.engine.clientsCount);

	socket.on("run", (data) => {
		const pw = data.split(":")[0];
		const action = data.split(":")[1];

		if (action === "clear" && pw === password) {
			store = [];
			storeHashed = [];
			duplicateCount = 0;
			io.emit("clear");
		}
	});

	socket.on("disconnect", () => {
		io.emit("info:online_count", io.engine.clientsCount);
	});

	socket.on("mouse", (data) => {
		const timestamp = new Date().getTime();
		io.emit("mouse", { ...data, id: socket.id, timestamp });
	});

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

httpServer.on("request", (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");

	if (req.url === "/canvas") {
		res.setHeader("Content-Type", "application/json");
		res.write(JSON.stringify(store));
		res.end();
	}
});

function validate(data) {
	return true;
}

// httpServer.on("request", (req, res) => {
// 	res.writeHead(200, { "Content-Type": "text/plain" });
// 	res.end("Hello world\n");
// });

function init() {
	if (fs.existsSync("store.json")) {
		store = JSON.parse(fs.readFileSync("store.json"));
		storeHashed = JSON.parse(fs.readFileSync("storeHashed.json"));
	}
}

init();

function backup() {
	fs.writeFileSync("store.json", JSON.stringify(store));
	fs.writeFileSync("storeHashed.json", JSON.stringify(storeHashed));
}

setInterval(backup, 10000);

httpServer.listen(process.env.PORT || 3000);
