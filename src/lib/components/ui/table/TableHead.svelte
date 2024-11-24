<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLThAttributes } from 'svelte/elements';

	const { children, class: className, ...props }: HTMLThAttributes = $props();
</script>

<th
	class={cn(
		'text-muted-foreground h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0',
		className
	)}
	{...props}
>
	{@render children?.()}
</th>
