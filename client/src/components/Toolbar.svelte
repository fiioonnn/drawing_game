<script>
	import { onMount } from "svelte";
	import { isDrawing, color, size, tool } from "./../store/stores.js";
	import ToolbarItem from "./ToolbarItem.svelte";

	$: sizeIcon = getSizeIcon($size);

	const getSizeIcon = (size) => {
		switch (size) {
			case 5:
				return "circle-tiny";
			case 10:
				return "circle-small";
			case 15:
				return "circle-medium";
			case 25:
				return "circle";
		}
	};
</script>

<div class="toolbar" data-drawing={$isDrawing}>
	<ToolbarItem
		icon="eraser"
		toggle={true}
		fn={() => {
			tool.update((tool) => (tool === "eraser" ? "pen" : "eraser"));
		}}
	/>
	<ToolbarItem icon={sizeIcon} parent={true}>
		<div class="toolbar toolbar--sub">
			<ToolbarItem icon="circle" fn={() => size.set(25)} />
			<ToolbarItem icon="circle-medium" fn={() => size.set(15)} />
			<ToolbarItem icon="circle-small" fn={() => size.set(10)} />
			<ToolbarItem icon="circle-tiny" fn={() => size.set(5)} />
		</div>
	</ToolbarItem>
	<ToolbarItem icon="colors" parent={true}>
		<div class="toolbar toolbar--sub">
			<ToolbarItem icon="colors-white" fn={() => color.set("#ffffff")} />
			<ToolbarItem icon="colors-black" fn={() => color.set("#000000")} />
			<ToolbarItem icon="colors-red" fn={() => color.set("#d13030")} />
			<ToolbarItem icon="colors-green" fn={() => color.set("#26ac26")} />
			<ToolbarItem icon="colors-blue" fn={() => color.set("#196bc9")} />
		</div>
	</ToolbarItem>
</div>

<style lang="scss">
	.toolbar {
		position: fixed;
		top: 20px;
		left: 50%;
		transform: translateX(-50%);
		padding: 10px;
		background: var(--foreground);
		border-radius: 20px;
		display: flex;
		gap: 10px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		transition: 0.3s all ease;
	}
	.toolbar[data-drawing="true"] {
		pointer-events: none;
		opacity: 0;
	}
	.toolbar--sub {
		display: none;
		top: calc(100% + 20px);
		left: -10px;
		position: absolute;
		transform: translateX(0);
		z-index: 100;
	}

	:global(.toolbar__item--active > .toolbar) {
		display: flex;
	}
</style>
