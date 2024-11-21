<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';

	let { children, class: className, ...props }: HTMLAttributes<HTMLTableSectionElement> = $props();
</script>

<thead class={cn('[&_tr]:border-b', className)} {...props}>
	{@render children?.()}
</thead>
