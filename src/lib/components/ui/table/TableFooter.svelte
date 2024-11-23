<script lang="ts">
	import type { Snippet } from 'svelte';

	const { children }: { children: Snippet } = $props();
</script>

<tfoot class="bg-muted/50 border-t font-medium [&>tr]:last:border-b-0">
	{@render children?.()}
</tfoot>
