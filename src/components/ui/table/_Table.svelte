<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLTableAttributes } from 'svelte/elements';

	let { children, class: className, ...props }: HTMLTableAttributes = $props();
</script>

<div class="relative w-full overflow-auto">
	<table class={cn('w-full caption-bottom text-sm', className)} {...props}>
		{@render children?.()}
	</table>
</div>
