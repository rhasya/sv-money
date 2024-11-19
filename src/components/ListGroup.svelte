<script lang="ts">
	import type { Snippet } from 'svelte';

	const { children }: { children?: Snippet<[]> } = $props();
</script>

<div class="flex flex-col divide-y rounded-md border first:*:rounded-t-md last:*:rounded-b-md">
	{@render children?.()}
</div>
