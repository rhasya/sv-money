<script lang="ts">
	import { Label, type LabelRootProps } from 'bits-ui';
	import { cn } from '$lib/utils';

	const { class: className, children, ...props }: LabelRootProps = $props();
</script>

<Label.Root
	class={cn(
		'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
		className
	)}
	{...props}>{@render children?.()}</Label.Root
>
