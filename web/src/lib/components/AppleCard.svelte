<script>
	export let gradient = '';
	export let onClick = () => {};
	export let className = '';
</script>

<!-- Apple-style Glassmorphism Card -->
<button
	on:click={onClick}
	class="
		apple-card
		{gradient ? `bg-gradient-to-br ${gradient}` : 'bg-background-secondary/70'}
		backdrop-blur-lg
		border border-white/5
		rounded-lg
		shadow-medium
		p-5
		text-left
		w-full
		transition-all duration-200 ease-apple
		hover:scale-[1.02]
		hover:shadow-strong
		active:scale-[0.98]
		{className}
	"
>
	<slot />
</button>

<style>
	.apple-card {
		-webkit-tap-highlight-color: transparent;
		cursor: pointer;
	}
</style>
