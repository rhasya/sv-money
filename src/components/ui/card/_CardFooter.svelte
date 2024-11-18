<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';
	const { class: className, children, ...props }: { class?: string; children?: Snippet } = $props();
</script>

<div class={cn('flex items-center p-6 pt-0', className)} {...props}>
	{@render children?.()}
</div>
