<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLTdAttributes } from 'svelte/elements';

	const { children, class: className, ...props }: HTMLTdAttributes = $props();
</script>

<td class={cn('px-4 py-4 align-middle [&:has([role=checkbox])]:pr-0', className)} {...props}>
	{@render children?.()}
</td>
