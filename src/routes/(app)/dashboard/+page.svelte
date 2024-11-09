<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import PageTitle from '@components/PageTitle.svelte';
	import MonthSelector from './MonthSelector.svelte';
	import { cx } from 'class-variance-authority';
	import { format } from 'date-fns';

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
		<table class="mt-2 table-fixed">
			<thead>
				<tr class="border-y">
					<th>Account</th>
					<th class="w-[180px]">Last month</th>
					<th class="w-[180px]">Increase</th>
					<th class="w-[180px]">Decrease</th>
					<th class="w-[180px]">Balance</th>
				</tr>
			</thead>
			<tbody>
				{#each data.accounts as a}
					<tr
						class={cx('border-y', {
							'bg-green-50': a.accountTypeId === 2,
							'bg-orange-50': a.accountTypeId === 3
						})}
					>
						<td class="text-center">{a.accountName}</td>
						<td class="text-right">{Intl.NumberFormat().format(a.lastMonth)}</td>
						<td class="text-right text-blue-500">{Intl.NumberFormat().format(a.increase)}</td>
						<td class="text-right text-red-500">{Intl.NumberFormat().format(a.decrease)}</td>
						<td class="text-right"
							>{Intl.NumberFormat().format(a.lastMonth + a.increase - a.decrease)}</td
						>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<style lang="postcss">
	th {
		@apply px-2 py-1;
	}
	td {
		@apply px-2 py-1;
	}
</style>
