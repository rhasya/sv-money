<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';
	const { class: className, children, ...props }: { class?: string; children?: Snippet } = $props();
</script>

<div class={cn('text-sm text-muted-foreground', className)} {...props}>
	{@render children?.()}
</div>
