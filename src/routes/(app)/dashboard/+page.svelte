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
					<th class="px-2 py-2">Account</th>
					<th class="w-[180px] px-2 py-2">Last month</th>
					<th class="w-[180px] px-2 py-2">Increase</th>
					<th class="w-[180px] px-2 py-2">Decrease</th>
					<th class="w-[180px] px-2 py-2">Balance</th>
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
						<td class="px-2 py-2 text-center">{a.accountName}</td>
						<td class="px-2 py-2 text-right">{Intl.NumberFormat().format(a.lastMonth)}</td>
						<td class="px-2 py-2 text-right text-blue-500"
							>{Intl.NumberFormat().format(a.increase)}</td
						>
						<td class="px-2 py-2 text-right text-red-500"
							>{Intl.NumberFormat().format(a.decrease)}</td
						>
						<td class="px-2 py-2 text-right"
							>{Intl.NumberFormat().format(a.lastMonth + a.increase - a.decrease)}</td
						>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
