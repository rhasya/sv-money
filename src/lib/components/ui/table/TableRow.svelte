<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';

	const { children, class: className, ...props }: HTMLAttributes<HTMLTableRowElement> = $props();
</script>

<tr
	class={cn(
		'hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors',
		className
	)}
	{...props}
>
	{@render children?.()}
</tr>
