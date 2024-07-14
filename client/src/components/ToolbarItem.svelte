<script>
	import { color } from "../store/stores.js";

	export let active = false;
	export let toggle = false;
	export let parent = false;
	export let icon = "";
	export let fn = () => {};
</script>

<button
	class="toolbar__item toolbar__item--icon toolbar__item--icon-{icon}"
	class:toolbar__item--active={active && (toggle || parent)}
	class:toolbar__item--toggle={toggle}
	class:toolbar__item--parent={parent}
	on:click|self={() => {
		active = !active;
		fn();
	}}
	style="--color: {$color}"
>
	<slot />
</button>

<style>
	.toolbar__item {
		border: 0;
		background: var(--controls);
		width: 60px;
		height: 60px;
		margin: 0;
		border-radius: 10px;
		cursor: pointer;
		position: relative;
		display: grid;
		place-content: center;
	}

	.toolbar__item > .toolbar {
		display: none;
		position: absolute;
		top: calc(100% + 20px) !important;
		left: -10px;
		transform: translateX(0);
		padding: 10px;
		background: var(--foreground);
		border-radius: 20px;
		display: flex;
		gap: 10px;
		border: 1px solid red;
	}

	.toolbar__item img {
		opacity: 0.5;
		transition: 0.3s all ease;
		pointer-events: none;
	}

	.toolbar__item:hover > img {
		opacity: 1;
	}

	.toolbar__item--toggle::before {
		content: "";
		position: absolute;
		top: 5px;
		right: 5px;
		width: 10px;
		height: 10px;
		background: var(--indicator);
		border-radius: 50%;
		transition: 0.1s all ease;
	}

	.toolbar__item--active.toolbar__item--toggle::before {
		background: var(--green);
	}

	.toolbar__item--active .toolbar {
		display: flex;
	}

	.toolbar__item--icon::after {
		content: "";
		width: 25px;
		height: 25px;
		opacity: 0.5;
		transition: 0.3s all ease;
	}

	.toolbar__item--icon:hover::after {
		opacity: 1;
	}

	.toolbar__item--icon-eraser::after {
		background: url("../img/icons/eraser.svg") no-repeat center / contain;
	}

	.toolbar__item--icon-circle::after {
		border-radius: 50%;
		background: #fff;
	}

	.toolbar__item--icon-plus::after {
		background: url("../img/icons/plus.svg") no-repeat center / contain;
	}

	.toolbar__item--icon-minus::after {
		background: url("../img/icons/minus.svg") no-repeat center / contain;
	}

	.toolbar__item--icon-circle-medium::after {
		width: 15px;
		height: 15px;
		border-radius: 50%;
		background: #fff;
	}

	.toolbar__item--icon-circle-small::after {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: #fff;
	}

	.toolbar__item--icon-circle-tiny::after {
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: #fff;
	}

	.toolbar__item--icon-colors::after {
		width: 25px;
		height: 25px;
		border-radius: 50%;
		background: var(--color);
		opacity: 1;
	}
	.toolbar__item--icon-colors-red::after {
		border-radius: 50%;
		background: #d13030;
		opacity: 1;
	}

	.toolbar__item--icon-colors-green::after {
		border-radius: 50%;
		background: #26ac26;
		opacity: 1;
	}

	.toolbar__item--icon-colors-blue::after {
		border-radius: 50%;
		background: #196bc9;
		opacity: 1;
	}
	.toolbar__item--icon-colors-white::after {
		border-radius: 50%;
		background: #fff;
		opacity: 1;
	}
	.toolbar__item--icon-colors-black::after {
		border-radius: 50%;
		background: #000;
		opacity: 1;
	}
</style>
