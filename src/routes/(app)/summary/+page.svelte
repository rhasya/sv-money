<script lang="ts">
	import { goto } from '$app/navigation';
	import { formatNumber } from '$lib/common/utils.js';
	import MonthSelector from '$lib/components/layouts/MonthSelector.svelte';
	import PageTitle from '$lib/components/layouts/PageTitle.svelte';
	import { Table, TableBody, TableHead, TableHeader, TableRow } from '$lib/components/ui/table';
	import TableCell from '$lib/components/ui/table/TableCell.svelte';
	import { cn } from '$lib/utils';
	import { CalendarDate } from '@internationalized/date';

	const { data } = $props();

	let year = $state(data.year ?? '');
	let month = $state(data.month ?? '');

	const prev = $derived.by(() => {
		const c = new CalendarDate(parseInt(year), parseInt(month), 1);
		return c.subtract({ months: 1 });
	});

	const incomesWithDiff = $derived(
		data.incomes.map((i) => {
			const prev = data.prevIncomes.find(({ id }) => id === i.id);
			const prevAmount = parseFloat(prev?.amount ?? '0');
			const amount = parseFloat(i.amount ?? '0');

			return { ...i, diff: amount - prevAmount };
		})
	);

	const expensesWithDiff = $derived(
		data.expenses.map((e) => {
			const prev = data.prevExpenses.find(({ id }) => id === e.id);
			const prevAmount = parseFloat(prev?.amount ?? '0');
			const amount = parseFloat(e.amount ?? '0');

			return { ...e, diff: amount - prevAmount };
		})
	);

	function handleChange() {
		goto(`/summary?year=${year}&month=${month}`);
	}
</script>

<PageTitle>Income/Expense Summary</PageTitle>

<div class="mt-4">
	<MonthSelector bind:year bind:month onchange={handleChange} />
</div>
<div class="mx-auto flex flex-row gap-12">
	<div>
		<div class="mt-4 flex w-full justify-center text-2xl font-bold">
			{prev.year}-{`${prev.month}`.padStart(2, '0')}
		</div>
		<div class="mt-4 flex w-full justify-center gap-4">
			<div class="w-[280px]">
				<Table class="">
					<TableHeader>
						<TableRow>
							<TableHead class="text-center">Income</TableHead>
							<TableHead class="text-center">Amount</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{#each data.prevIncomes as income (income.id)}
							<TableRow>
								<TableCell>{income.name}</TableCell>
								<TableCell class="text-right">{formatNumber(income.amount)}</TableCell>
							</TableRow>
						{/each}
					</TableBody>
				</Table>
			</div>
			<div class="w-[280px]">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead class="text-center">Expense</TableHead>
							<TableHead class="text-center">Amount</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{#each data.prevExpenses as expense (expense.id)}
							<TableRow>
								<TableCell>{expense.name}</TableCell>
								<TableCell class="text-right">{formatNumber(expense.amount)}</TableCell>
							</TableRow>
						{/each}
					</TableBody>
				</Table>
			</div>
		</div>
	</div>
	<div>
		<div class="mt-4 flex w-full justify-center text-2xl font-bold">
			{year}-{month.padStart(2, '0')}
		</div>
		<div class="mt-4 flex w-full justify-center gap-4">
			<div class="w-[360px]">
				<Table class="">
					<TableHeader>
						<TableRow>
							<TableHead class="text-center">Income</TableHead>
							<TableHead class="text-center">Amount</TableHead>
							<TableHead class="text-center">Diff</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{#each incomesWithDiff as income (income.id)}
							<TableRow>
								<TableCell>{income.name}</TableCell>
								<TableCell class="text-right">{formatNumber(income.amount)}</TableCell>
								<TableCell
									class={cn('text-right', 'text-blue-600', income.diff < 0 && 'text-red-600')}
								>
									{formatNumber(income.diff)}
								</TableCell>
							</TableRow>
						{/each}
					</TableBody>
				</Table>
			</div>
			<div class="w-[360px]">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead class="text-center">Expense</TableHead>
							<TableHead class="text-center">Amount</TableHead>
							<TableHead class="text-center">Diff</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{#each expensesWithDiff as expense (expense.id)}
							<TableRow>
								<TableCell>{expense.name}</TableCell>
								<TableCell class="text-right">{formatNumber(expense.amount)}</TableCell>
								<TableCell
									class={cn('text-right', 'text-red-600', expense.diff < 0 && 'text-blue-600')}
								>
									{formatNumber(expense.diff)}
								</TableCell>
							</TableRow>
						{/each}
					</TableBody>
				</Table>
			</div>
		</div>
	</div>
</div>
