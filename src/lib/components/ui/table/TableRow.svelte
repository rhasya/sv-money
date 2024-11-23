<script lang="ts">
	import type { Snippet } from 'svelte';

	const { children }: { children: Snippet } = $props();
</script>

<tr class="hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors">
	{@render children?.()}
</tr>
