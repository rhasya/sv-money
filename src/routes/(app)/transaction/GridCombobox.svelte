<script lang="ts">
	import Input from '@components/ui/input/_Input.svelte';
	import { Combobox } from 'bits-ui';
	import { Check, ChevronDown, ChevronsUpDown, ChevronUp } from 'lucide-svelte';

	let {
		value = $bindable(),
		items,
		name
	}: {
		items: { label: string; value: string }[];
		value?: string;
		name?: string;
	} = $props();

	let searchValue = $state('');
	let open = $state(false);
	let defaultValue = $state('');
	const filteredItems = $derived(items.filter((i) => i.label.includes(searchValue)));

	$effect(() => {
		if (searchValue) {
			open = true;
		}
	});

	$effect(() => {
		const obj = items.find(({ value: v }) => v === value);
		if (obj) {
			defaultValue = obj.label;
		}
	});

	function handleInput(e: Event & { currentTarget: HTMLInputElement }) {
		searchValue = e.currentTarget.value;
	}
</script>

<Combobox.Root
	type="single"
	allowDeselect={false}
	bind:value
	bind:open
	onOpenChange={(o) => {
		if (!o) searchValue = '';
	}}
	{name}
	{items}
>
	<div class="relative">
		<Combobox.Input>
			{#snippet child({ props })}
				<input
					{...props}
					oninput={handleInput}
					bind:value={defaultValue}
					class="border-input flex h-7 w-full items-center justify-between border px-2"
				/>
			{/snippet}
		</Combobox.Input>
		<Combobox.Trigger tabindex={-1} class="absolute top-0 right-2 bottom-0 z-1 align-middle">
			<ChevronsUpDown class="h-4 w-4" />
		</Combobox.Trigger>
	</div>
	<Combobox.Portal>
		<Combobox.Content
			class="bg-popover text-popover-foreground z-50 max-h-96 w-[calc(var(--bits-combobox-anchor-width)+2rem)] min-w-[var(--bits-combobox-anchor-width)] overflow-hidden rounded-md border shadow-md select-none"
		>
			<Combobox.ScrollUpButton class="flex justify-center">
				<ChevronUp class="h-4 w-4" />
			</Combobox.ScrollUpButton>
			<Combobox.Viewport class="p-1">
				{#each filteredItems as item}
					<Combobox.Item
						class="focus:bg-accent focus:text-accent-foreground data-[highlighted]:bg-muted relative flex w-full cursor-default items-center rounded-sm py-1.5 pr-2 pl-8 text-sm outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
						value={item.value}
						label={item.label}
					>
						{#snippet children({ selected })}
							{#if selected}<Check class="absolute left-3 h-4 w-4" />{/if}
							{item.label}
						{/snippet}
					</Combobox.Item>
				{:else}
					<span class="block px-5 py-2 text-sm text-muted-foreground">No results found.</span>
				{/each}
			</Combobox.Viewport>
			<Combobox.ScrollDownButton class="flex justify-center">
				<ChevronDown class="h-4 w-4" />
			</Combobox.ScrollDownButton>
		</Combobox.Content>
	</Combobox.Portal>
</Combobox.Root>
