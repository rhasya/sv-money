<script lang="ts">
	import type { Snippet } from 'svelte';

	const { children }: { children: Snippet } = $props();
</script>

<table class="w-full caption-bottom text-sm">
	{@render children?.()}
</table>
