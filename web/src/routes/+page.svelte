<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		goto('/capture');
	});
</script>

<div class="min-h-screen bg-background-base flex items-center justify-center">
	<div class="text-center">
		<div class="text-6xl mb-4 animate-spin-slow">⏳</div>
		<p class="text-text-muted">加载中...</p>
	</div>
</div>
