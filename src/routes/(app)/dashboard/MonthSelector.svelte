<script lang="ts">
	import Button from '@components/Button.svelte';
	import { Select, SelectTrigger, SelectContent, SelectItem } from '@components/ui/select';
	import { ChevronsUpDown } from 'lucide-svelte';

	type Props = {
		year: string;
		month: string;
	};

	let { year = $bindable(), month = $bindable() }: Props = $props();

	const years = Array(11)
		.fill(0)
		.map((_, idx) => ({
			label: `${2020 + idx}`,
			value: `${2020 + idx}`
		}));
	const months = Array(12)
		.fill(0)
		.map((_, idx) => `${idx + 1}`);
</script>

<div class="flex space-x-4">
	<Select bind:value={year}>
		<SelectTrigger class="w-[100px]">
			<span>{year}</span>
			<span><ChevronsUpDown class="h-4 w-4" /></span>
		</SelectTrigger>
		<SelectContent>
			{#each years as yy}
				<SelectItem value={yy.value}>{yy.label}</SelectItem>
			{/each}
		</SelectContent>
	</Select>

	<div class="flex space-x-1">
		{#each months as m}
			<Button
				class="w-5"
				variant={m === month ? 'default' : 'secondary'}
				onclick={() => (month = m)}>{m}</Button
			>
		{/each}
	</div>
</div>
