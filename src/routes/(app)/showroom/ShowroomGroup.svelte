<script lang="ts">
	import type { Snippet } from 'svelte';

	const { title, children }: { title?: string; children: Snippet<[]> } = $props();
</script>

<div class="flex flex-col gap-2">
	<h2 class="text-2xl font-bold">{title}</h2>
	<div class="contents">
		{@render children?.()}
	</div>
</div>
