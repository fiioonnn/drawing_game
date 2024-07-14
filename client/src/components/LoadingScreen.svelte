<script>
	import { loadingText } from "./../store/stores.js";
</script>

<div class="loading-screen">
	<div class="loading-screen__loader"></div>
	<p class="loading-screen__text">{$loadingText}<span>Please</span></p>
</div>

<style>
	.loading-screen {
		padding: 20px;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(10px);
		z-index: 1000;
		display: grid;
		place-content: center;
		user-select: none;
		gap: 20px;
		text-align: center;
	}

	.loading-screen__text {
		font-size: 40px;
		text-transform: uppercase;
		animation: breathe 1s infinite alternate linear;
		letter-spacing: 2px;
	}

	.loading-screen__text span {
		font-size: 20px;
		display: block;
	}

	.loading-screen__loader {
		border: 3px solid var(--background);
		border-bottom: 3px solid var(--text);
		border-radius: 50%;
		width: 30px;
		height: 30px;
		margin: 0 auto;
		animation:
			spin 1s linear infinite,
			breathe 1s infinite alternate linear;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	@keyframes breathe {
		to {
			opacity: 0.5;
		}
	}
</style>
