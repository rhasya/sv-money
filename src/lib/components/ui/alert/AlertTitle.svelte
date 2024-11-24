<script lang="ts">
	import type { Snippet } from 'svelte';

	const { children }: { children?: Snippet } = $props();
</script>

<h5 class="mb-1 leading-none font-medium tracking-tight">
	{@render children?.()}
</h5>
