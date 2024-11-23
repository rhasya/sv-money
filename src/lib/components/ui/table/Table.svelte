<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	const {
		children,
		class: className,
		narrow = false
	}: { children?: Snippet; class?: string; narrow?: boolean } = $props();
</script>

<table
	class={cn(
		'w-full caption-bottom text-sm',
		narrow && '[&_tr:not([data-edit])_td]:py-1',
		className
	)}
>
	{@render children?.()}
</table>
