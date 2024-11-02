<script lang="ts">
	import type { Snippet } from 'svelte';

	const { children }: { children?: Snippet<[]> } = $props();
</script>

<div class="mt-4 w-full rounded bg-red-200 px-4 py-2">
	{@render children?.()}
</div>
