<script lang="ts">
	import { goto } from '$app/navigation';
	import PageTitle from '@components/PageTitle.svelte';
	import { cx } from 'class-variance-authority';
	import { format } from 'date-fns';
	import MonthSelector from './MonthSelector.svelte';
	import {
		Table,
		TableHeader,
		TableBody,
		TableRow,
		TableHead,
		TableCell
	} from '$lib/components/ui/table';

	const { data } = $props();

	let year = $state(data.year);
	let month = $state(data.month);

	$effect(() => {
		goto(`/dashboard?year=${year}&month=${month}`);
	});
</script>

<PageTitle>Dashboard</PageTitle>
<div class="mt-4 flex flex-col">
	<MonthSelector bind:year bind:month />
	<div class="mt-8 flex flex-col">
		<h2 class="text-center text-xl font-bold">{year}-{format(month, 'MM')}</h2>
		<div class="mt-4 max-h-[calc(100vh-300px)] overflow-auto rounded-md border">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Account</TableHead>
						<TableHead class="w-[180px] text-right">Last month</TableHead>
						<TableHead class="w-[180px] text-right">Increase</TableHead>
						<TableHead class="w-[180px] text-right">Decrease</TableHead>
						<TableHead class="w-[180px] text-right">Balance</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{#each data.accounts as a}
						<TableRow
							class={cx('border-y', {
								'bg-green-50': a.accountTypeId === 2,
								'bg-orange-50': a.accountTypeId === 3
							})}
						>
							<TableCell class="text-center">{a.accountName}</TableCell>
							<TableCell class="text-right">{Intl.NumberFormat().format(a.lastMonth)}</TableCell>
							<TableCell class="text-right text-blue-500">
								{Intl.NumberFormat().format(a.increase)}
							</TableCell>
							<TableCell class="text-right text-red-500">
								{Intl.NumberFormat().format(a.decrease)}
							</TableCell>
							<TableCell class="text-right">
								{Intl.NumberFormat().format(a.lastMonth + a.increase - a.decrease)}
							</TableCell>
						</TableRow>
					{/each}
				</TableBody>
			</Table>
		</div>
	</div>
</div>
