<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	const { children, class: className }: { children: Snippet; class?: string } = $props();
</script>

<th
	class={cn(
		'text-muted-foreground h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0',
		className
	)}
>
	{@render children?.()}
</th>
