<script lang="ts">
	import { Select } from 'bits-ui';
	import { Check, ChevronDown, ChevronsUpDown, ChevronUp } from 'lucide-svelte';

	let {
		value = $bindable(),
		items,
		name,
		form
	}: {
		items: { label: string; value: string }[];
		value?: string;
		name?: string;
		form?: string;
	} = $props();
</script>

<Select.Root type="single" allowDeselect={false} bind:value>
	<Select.Trigger class="border-input flex h-7 w-full items-center justify-between border px-2">
		<input type="hidden" {name} {form} {value} />
		<span>{items.find((i) => i.value === value)?.label}</span>
		<ChevronsUpDown class="h-4 w-4" />
	</Select.Trigger>
	<Select.Portal>
		<Select.Content
			class="bg-popover text-popover-foreground z-50 max-h-96 w-[calc(var(--bits-select-anchor-width)+2rem)] min-w-[var(--bits-select-anchor-width)] overflow-hidden rounded-md border shadow-md select-none"
		>
			<Select.ScrollUpButton class="flex justify-center">
				<ChevronUp class="h-4 w-4" />
			</Select.ScrollUpButton>
			<Select.Viewport class="p-1">
				<Select.Item
					class="focus:bg-accent focus:text-accent-foreground data-[highlighted]:bg-muted relative flex w-full cursor-default items-center rounded-sm py-1.5 pr-2 pl-8 text-sm outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
					value="">&nbsp;</Select.Item
				>
				{#each items as item}
					<Select.Item
						class="focus:bg-accent focus:text-accent-foreground data-[highlighted]:bg-muted relative flex w-full cursor-default items-center rounded-sm py-1.5 pr-2 pl-8 text-sm outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
						value={item.value}
					>
						{#snippet children({ selected })}
							{#if selected}<Check class="absolute left-3 h-4 w-4" />{/if}
							{item.label}
						{/snippet}
					</Select.Item>
				{/each}
			</Select.Viewport>
			<Select.ScrollDownButton class="flex justify-center">
				<ChevronDown class="h-4 w-4" />
			</Select.ScrollDownButton>
		</Select.Content>
	</Select.Portal>
</Select.Root>
