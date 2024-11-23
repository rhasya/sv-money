<script lang="ts">
	import type { Snippet } from 'svelte';

	const { children }: { children: Snippet } = $props();
</script>

<td class="p-4 align-middle [&:has([role=checkbox])]:pr-0">
	{@render children?.()}
</td>
