<script lang="ts">
	import { ChevronsUpDown } from 'lucide-svelte';
	import { Select, SelectTrigger, SelectContent, SelectItem, type SelectProps } from './ui/select';

	type Props = SelectProps;

	let { value = $bindable(), items = [], ...props }: Props = $props();
</script>

<Select bind:value {...props}>
	<SelectTrigger>
		<span>{items.find(({ value: v }) => value === v)?.label ?? ''}</span>
		<ChevronsUpDown class="h-4 w-4" />
	</SelectTrigger>
	<SelectContent>
		{#each items as item}
			<SelectItem value={item.value} selected={item.value === value}>{item.label}</SelectItem>
		{/each}
	</SelectContent>
</Select>
