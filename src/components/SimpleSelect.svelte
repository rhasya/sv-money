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
		items: { value: string | number; label: string; type?: number }[];
		emptyLine?: boolean;
		class?: string;
		name?: string;
		value?: string | number;
		disabled?: boolean;
	} & VariantProps<typeof simpleSelectVariant>;
	let {
		items,
		emptyLine = true,
		variant,
		name,
		class: className,
		value = $bindable(),
		disabled
	}: SimpleSelectProps = $props();
</script>

<select
	class={cx('select w-full appearance-none', simpleSelectVariant({ variant, className }))}
	aria-label="select"
	{name}
	{disabled}
	bind:value
>
	{#if emptyLine}
		<option></option>
	{/if}
	{#each items as item (item.value)}
		<option
			value={item.value}
			class={cx({
				'bg-green-50': item.type === 2,
				'bg-orange-50': item.type === 3,
				'bg-blue-50': item.type === 4,
				'bg-red-50': item.type === 5
			})}>{item.label}</option
		>
	{/each}
</select>
