<script lang="ts">
	import { cn } from '$lib/utils';
	import { Select, type SelectContentProps } from 'bits-ui';
	import { ChevronDown, ChevronUp } from 'lucide-svelte';

	let { class: className, children, ...props }: SelectContentProps = $props();
</script>

<Select.Portal>
	<Select.Content
		class={cn(
			'focus-override bg-popover text-popover-foreground z-50 max-h-96 w-[var(--bits-select-anchor-width)] min-w-[var(--bits-select-anchor-width)] overflow-hidden rounded-md border shadow-md select-none',
			className
		)}
		{...props}
	>
		<Select.ScrollUpButton class="flex justify-center">
			<ChevronUp class="h-4 w-4" />
		</Select.ScrollUpButton>
		<Select.Viewport class="p-1">
			{@render children?.()}
		</Select.Viewport>
		<Select.ScrollDownButton class="flex justify-center">
			<ChevronDown class="h-4 w-4" />
		</Select.ScrollDownButton>
	</Select.Content>
</Select.Portal>
