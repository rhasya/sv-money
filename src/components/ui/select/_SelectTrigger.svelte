<script lang="ts">
	import { Select, type SelectTriggerProps } from 'bits-ui';
	import { cn } from '@/lib/utils';
	const { children, class: className, ...props }: SelectTriggerProps = $props();
</script>

<Select.Trigger
	class={cn(
		'inline-flex h-9 w-full select-none items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
		className
	)}
	{...props}
>
	{@render children?.()}
</Select.Trigger>
