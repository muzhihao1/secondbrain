<script>
	import '../app.css';
	import Toast from '$components/shared/Toast.svelte';
	import { onMount } from 'svelte';
	import { dbService } from '$services/dbService.js';
	import { syncStore } from '$stores/syncStore.js';

	// Initialize IndexedDB on mount
	onMount(async () => {
		await dbService.init();
		await syncStore.refreshPendingCount();
		console.log('App initialized');
	});
</script>

<div class="min-h-screen bg-background-primary">
	<slot />
</div>

<Toast />
