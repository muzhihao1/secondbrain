<script>
	import { uiStore } from '$stores/uiStore.js';
	import { fade, fly } from 'svelte/transition';
</script>

{#if $uiStore.toasts.length > 0}
	<div class="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
		{#each $uiStore.toasts as toast (toast.id)}
			<div
				transition:fly={{ x: 300, duration: 300 }}
				class="toast px-4 py-3 rounded-lg shadow-lg flex items-center gap-3"
				class:toast-success={toast.type === 'success'}
				class:toast-error={toast.type === 'error'}
				class:toast-warning={toast.type === 'warning'}
				class:toast-info={toast.type === 'info'}
			>
				{#if toast.type === 'success'}
					<span class="text-xl">✅</span>
				{:else if toast.type === 'error'}
					<span class="text-xl">❌</span>
				{:else if toast.type === 'warning'}
					<span class="text-xl">⚠️</span>
				{:else}
					<span class="text-xl">ℹ️</span>
				{/if}

				<p class="text-sm font-medium">{toast.message}</p>

				<button
					on:click={() => uiStore.removeToast(toast.id)}
					class="ml-auto text-white hover:opacity-75"
				>
					×
				</button>
			</div>
		{/each}
	</div>
{/if}

<style>
	.toast {
		color: white;
		min-width: 250px;
	}

	.toast-success {
		background-color: #10b981;
	}

	.toast-error {
		background-color: #ef4444;
	}

	.toast-warning {
		background-color: #f59e0b;
	}

	.toast-info {
		background-color: #3b82f6;
	}
</style>
