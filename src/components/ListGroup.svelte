<script lang="ts">
	import type { Snippet } from 'svelte';

	const { children }: { children?: Snippet<[]> } = $props();
</script>

<div
	class="flex flex-col divide-y divide-base-content/25 rounded-md border border-base-content/25 *:p-3 first:*:rounded-t-md last:*:rounded-b-md"
>
	{@render children?.()}
</div>
