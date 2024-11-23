<script lang="ts">
	import type { Snippet } from 'svelte';

	const { children }: { children: Snippet } = $props();
</script>

<thead class="[&_tr]:border-b">
	{@render children?.()}
</thead>
