<script lang="ts">
	import type { Snippet } from 'svelte';

	const { children }: { children: Snippet } = $props();
</script>

<tbody class="[&_tr:last-child]:border-0">
	{@render children?.()}
</tbody>
