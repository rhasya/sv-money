<script lang="ts">
	import type { Snippet } from 'svelte';

	const { children }: { children?: Snippet } = $props();
</script>

<div class="text-sm [&_p]:leading-relaxed">
	{@render children?.()}
</div>
