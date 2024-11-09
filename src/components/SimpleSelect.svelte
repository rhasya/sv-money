<script lang="ts">
	import { cva, cx, type VariantProps } from 'class-variance-authority';

	const simpleSelectVariant = cva('', {
		variants: {
			variant: {
				default:
					'h-9 border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-ring',
				small: 'h-7 rounded-sm focus:outline-none focus:ring-2 focus:ring-ring'
			}
		},
		defaultVariants: {
			variant: 'default'
		}
	});

	type SimpleSelectProps = {
		items: { value: string | number; label: string }[];
		emptyLine?: boolean;
		class?: string;
		name?: string;
		value?: string | number;
	} & VariantProps<typeof simpleSelectVariant>;
	let {
		items,
		emptyLine = true,
		variant,
		name,
		class: className,
		value = $bindable()
	}: SimpleSelectProps = $props();
</script>

<select
	class={cx(
		'w-full whitespace-nowrap bg-transparent px-3 text-sm ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
		simpleSelectVariant({ variant, className })
	)}
	{name}
	bind:value
>
	{#if emptyLine}
		<option></option>
	{/if}
	{#each items as item (item.value)}
		<option value={item.value}>{item.label}</option>
	{/each}
</select>
