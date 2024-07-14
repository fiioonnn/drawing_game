<script>
	import { onMount } from "svelte";
	import {
		color,
		size,
		tool,
		isDrawing,
		client,
		loadingText,
	} from "../store/stores";
	import { socket } from "../lib/socket";

	let canvas;
	let ctx;
	let previousPosition = null;
	let drawId;

	onMount(() => {
		resizeCanvas(canvas);

		ctx = canvas.getContext("2d");

		window.onresize = () => {
			resizeCanvas(canvas);
		};

		let prevPoint;

		socket.on("draw", (data) => {
			ctx.strokeStyle = data.color;
			ctx.lineWidth = data.size;
			ctx.lineCap = "round";

			ctx.globalCompositeOperation =
				data.tool === "eraser" ? "destination-out" : "source-over";

			ctx.beginPath();

			if (prevPoint && prevPoint.id === data.id) {
				ctx.moveTo(prevPoint.to.x, prevPoint.to.y);
			} else {
				ctx.moveTo(data.from.x, data.from.y);
			}

			ctx.lineTo(data.to.x, data.to.y);
			ctx.stroke();

			prevPoint = data;
		});

		socket.on("connect", () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			load();
		});
	});

	const resizeCanvas = (c) => {
		c.width = window.innerWidth;
		c.height = window.innerHeight;

		load();
	};

	const draw = (e) => {
		if (!$isDrawing) return;

		ctx.strokeStyle = $color;
		ctx.lineWidth = $size;
		ctx.lineCap = "round";

		ctx.globalCompositeOperation =
			$tool === "eraser" ? "destination-out" : "source-over";

		ctx.beginPath();
		ctx.moveTo(previousPosition.x, previousPosition.y);
		ctx.lineTo(e.clientX, e.clientY);
		ctx.stroke();

		previousPosition = { x: e.clientX, y: e.clientY };

		socket.emit("draw", {
			id: drawId,
			from: previousPosition,
			to: { x: e.clientX, y: e.clientY },
			color: $color,
			size: $size,
			tool: $tool,
		});
	};

	const load = () => {
		const req = fetch("http://localhost:3003/canvas", {
			signal: AbortSignal.timeout(10000),
		});

		// start the fetch and show the loading screen
		loadingText.set("Loading canvas...");

		req
			.then((res) => res.json())
			.then((data) => {
				data.forEach((point, index) => {
					let prevPoint;

					if (index > 0) {
						prevPoint = data[index - 1];
					} else {
						prevPoint = point;
					}

					ctx.strokeStyle = point.color;
					ctx.lineWidth = point.size;
					ctx.lineCap = "round";

					ctx.globalCompositeOperation =
						point.tool === "eraser" ? "destination-out" : "source-over";

					ctx.beginPath();
					if (prevPoint.id === point.id) {
						ctx.moveTo(prevPoint.from.x, prevPoint.from.y);
					} else {
						ctx.moveTo(point.from.x, point.from.y);
					}
					ctx.lineTo(point.to.x, point.to.y);
					ctx.stroke();
				});

				loadingText.set("");

				// if (!data.length) {
				// 	loadingText.set("");
				// }
			})
			.catch((err) => {
				loadingText.set("Failed to load canvas");
			});
	};
</script>

<canvas
	bind:this={canvas}
	on:pointerdown={(e) => (
		isDrawing.set(true),
		(previousPosition = { x: e.clientX, y: e.clientY }),
		(drawId = crypto.getRandomValues(new Uint32Array(3)).join("-"))
	)}
	on:pointerup={() => (isDrawing.set(false), (previousPosition = null))}
	on:pointermove={draw}
	on:pointerleave={() => (isDrawing.set(false), (previousPosition = null))}
></canvas>

<style>
</style>
