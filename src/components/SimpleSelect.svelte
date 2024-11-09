<script lang="ts">
	import { ChevronDown } from 'lucide-svelte';

	type SimpleSelectProps = {
		items: { value: string | number; label: string }[];
		emptyLine?: boolean;
		class?: string;
		name?: string;
		value?: string | number;
	};
	let {
		items,
		emptyLine = true,
		name,
		class: klass,
		value = $bindable()
	}: SimpleSelectProps = $props();
</script>

<div class="relative">
	<select
		class={'h-9 w-full whitespace-nowrap rounded-md border border-input bg-transparent px-3 text-sm ring-offset-background focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50'}
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
	<div class="absolute right-3 top-2.5"><ChevronDown class="h-4 w-4" /></div>
</div>
