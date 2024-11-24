<script lang="ts">
	import { goto } from '$app/navigation';
	import { formatNumber } from '$lib/common/utils.js';
	import MonthSelector from '$lib/components/layouts/MonthSelector.svelte';
	import PageTitle from '$lib/components/layouts/PageTitle.svelte';
	import { Table, TableBody, TableHead, TableHeader, TableRow } from '$lib/components/ui/table';
	import TableCell from '$lib/components/ui/table/TableCell.svelte';

	const { data } = $props();

	let year = $state(data.year ?? '');
	let month = $state(data.month ?? '');

	function handleChange() {
		goto(`/summary?year=${year}&month=${month}`);
	}
</script>

<PageTitle>Income/Expense Summary</PageTitle>

<div class="mt-4">
	<MonthSelector bind:year bind:month onchange={handleChange} />
</div>
<div class="mt-4 flex w-full justify-center text-2xl font-bold">
	{year}-{month.padStart(2, '0')}
</div>
<div class="mt-4 flex w-full justify-center gap-4">
	<div class="w-[320px]">
		<Table class="">
			<TableHeader>
				<TableRow>
					<TableHead class="text-center">Income</TableHead>
					<TableHead class="text-center">Amount</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{#each data.incomes as income (income.id)}
					<TableRow>
						<TableCell>{income.name}</TableCell>
						<TableCell class="text-right">{formatNumber(income.amount)}</TableCell>
					</TableRow>
				{/each}
			</TableBody>
		</Table>
	</div>
	<div class="w-[320px]">
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead class="text-center">Expense</TableHead>
					<TableHead class="text-center">Amount</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{#each data.expenses as expense (expense.id)}
					<TableRow>
						<TableCell>{expense.name}</TableCell>
						<TableCell class="text-right">{formatNumber(expense.amount)}</TableCell>
					</TableRow>
				{/each}
			</TableBody>
		</Table>
	</div>
</div>
