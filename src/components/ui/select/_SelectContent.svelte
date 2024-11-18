<script lang="ts">
	import { cn } from '@/lib/utils';
	import { Select, type SelectContentProps } from 'bits-ui';

	let { class: className, children, ...props }: SelectContentProps = $props();
</script>

<Select.Portal>
	<Select.Content
		class={cn(
			'focus-override z-50 max-h-96 w-[var(--bits-select-anchor-width)] min-w-[var(--bits-select-anchor-width)] select-none overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
			className
		)}
		{...props}
	>
		<Select.Viewport class="p-1">
			{@render children?.()}
		</Select.Viewport>
	</Select.Content>
</Select.Portal>
