<script>
	export let x = 0;
	export let y = 0;

	//random hex color
	const randomColor = () => {
		return "#" + Math.floor(Math.random() * 16777215).toString(16);
	};
</script>

<div class="mouse" style="--x: {x}px; --y: {y}px;">
	<svg
		width="67"
		height="78"
		viewBox="0 0 67 78"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M0.423616 7.21863C0.127379 2.28324 5.59272 -0.87219 9.71878 1.85205L63.4592 37.3344C67.737 40.1588 66.7318 46.7002 61.8034 48.1101L36.1468 55.4494C35.1999 55.7203 34.3343 56.22 33.6263 56.9046L14.4419 75.4542C10.7567 79.0175 4.58914 76.6172 4.282 71.5003L0.423616 7.21863Z"
			fill={randomColor()}
		/>
	</svg>
</div>

<style>
	.mouse {
		width: 20px;
		height: 20px;
		position: fixed;

		top: var(--y);
		left: var(--x);
		pointer-events: none;
	}
	.mouse svg {
		width: 20px;
		height: 20px;
		filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.5));
	}
</style>
