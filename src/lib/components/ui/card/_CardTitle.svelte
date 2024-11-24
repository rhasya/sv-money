<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';
	const { class: className, children, ...props }: { class?: string; children?: Snippet } = $props();
</script>

<div class={cn('text-2xl font-semibold leading-none tracking-tight', className)} {...props}>
	{@render children?.()}
</div>
