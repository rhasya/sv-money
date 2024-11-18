<script lang="ts">
	import { Select, type SelectItemProps } from 'bits-ui';
	import { cn } from '@/lib/utils';
	import { Check } from 'lucide-svelte';
	let {
		class: className,
		selected = false,
		highlighted = false,
		children,
		...props
	}: SelectItemProps & {
		selected?: boolean;
		highlighted?: boolean;
	} = $props();
</script>

<Select.Item
	class={cn(
		'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
		'data-[highlighted]:bg-accent',
		className
	)}
	{...props}
>
	{@render children?.({ selected, highlighted })}
	{#if selected}
		<span class="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
			<Check class="h-4 w-4" />
		</span>
	{/if}
</Select.Item>
