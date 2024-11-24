<script lang="ts">
	import type { Snippet } from 'svelte';

	const { children }: { children: Snippet<[]> } = $props();
</script>

<h1 class="text-2xl font-bold">{@render children()}</h1>
