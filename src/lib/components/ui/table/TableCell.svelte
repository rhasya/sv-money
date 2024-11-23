<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	const { children, class: className }: { children?: Snippet; class?: string } = $props();
</script>

<td class={cn('px-4 py-4 align-middle [&:has([role=checkbox])]:pr-0', className)}>
	{@render children?.()}
</td>
