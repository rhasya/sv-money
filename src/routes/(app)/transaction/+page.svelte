<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import Button from '@components/Button.svelte';
	import PageTitle from '@components/PageTitle.svelte';
	import { format } from 'date-fns';
	import { Ban, Pencil, Save } from 'lucide-svelte';
	import { z } from 'zod';
	import SimpleSelect from './SimpleSelect.svelte';
	import ErrorCard from './ErrorCard.svelte';

	const trValid = z
		.object({
			tdate: z.coerce.date(),
			title: z.string().min(1),
			leftAccountId: z.coerce.number(),
			rightAccountId: z.coerce.number(),
			amount: z.coerce.number()
		})
		.refine((arg) => arg.leftAccountId != arg.rightAccountId, 'Left and Right must different.');

	const { data } = $props();
	let trs: Partial<(typeof data.transactions)[number]>[] = $state([]);
	let errorMsg: string | null = $state(null);
	let lastAddedDate: string | null = $state(null);
	let firstInputRef: HTMLInputElement;

	$effect(() => {
		trs = data.transactions;
	});

	function handleAddClick() {
		// ADD행이 없다면 추가
		if (!trs.some((t) => t.state === 'ADD')) {
			trs.push({
				id: new Date().getTime(),
				tdate: lastAddedDate,
				title: '',
				state: 'ADD'
			});
		}
		setTimeout(() => firstInputRef.focus(), 100);
	}

	async function handleNewSaveClick() {
		const { data: newTr, error } = trValid.safeParse(trs.filter((t) => t.state === 'ADD')[0]);
		if (!error) {
			lastAddedDate = format(newTr.tdate, 'yyyy-MM-dd');
			await fetch('/api/transaction', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(newTr)
			});

			invalidateAll();
		} else {
			errorMsg = error.errors[0].message;
		}
	}

	function handleCancelClick() {
		trs.splice(-1, 1);
	}
</script>

<PageTitle>Transactions</PageTitle>
<div class="mt-4 flex justify-end gap-2">
	<Button onclick={handleAddClick}>추가</Button>
</div>
<table class="mt-4 w-full table-fixed border-collapse">
	<thead>
		<tr class="border-y border-primary">
			<th class="h-9 w-[120px]">Date</th>
			<th>Title</th>
			<th class="w-[140px]">Left</th>
			<th class="w-[140px]">Right</th>
			<th class="w-[100px]">Amount</th>
			<th class="w-[80px]">A</th>
		</tr>
	</thead>
	<tbody>
		{#each trs as transaction (transaction.id)}
			{#if transaction.state === 'ADD'}
				<tr class="border-y border-primary">
					<td class="h-9 p-0.5"
						><input
							type="date"
							class="h-full w-full px-1"
							bind:value={transaction.tdate}
							bind:this={firstInputRef}
						/></td
					>
					<td class="h-9 p-0.5"
						><input type="text" class="h-full w-full px-1" bind:value={transaction.title} /></td
					>
					<td class="h-9 p-0.5">
						<SimpleSelect
							class="h-full w-full px-1"
							items={data.leftAccounts.map((a) => ({ value: `${a.id}`, text: a.name! }))}
							bind:value={transaction.leftAccountId}
						/>
					</td>
					<td class="h-9 p-0.5">
						<SimpleSelect
							class="h-full w-full px-1"
							items={data.rightAccounts.map((a) => ({ value: `${a.id}`, text: a.name! }))}
							bind:value={transaction.rightAccountId}
						/>
					</td>
					<td class="h-9 p-0.5"
						><input type="text" class="h-full w-full px-1" bind:value={transaction.amount} /></td
					>
					<td class="h-9 align-middle">
						<div class="flex h-full w-full items-center justify-center">
							<button type="button" class="icon-button" onclick={handleNewSaveClick}
								><Save class="h-6 w-6" /></button
							>
							<button type="button" class="icon-button"
								><Ban class="h-6 w-6" onclick={handleCancelClick} /></button
							>
						</div>
					</td>
				</tr>
			{:else}
				<tr class="border-y border-primary">
					<td class="normal-cell">{format(transaction.tdate!, 'yyyy-MM-dd')}</td>
					<td class="normal-cell">{transaction.title}</td>
					<td class="normal-cell">{transaction.leftAccountId}</td>
					<td class="normal-cell">{transaction.rightAccountId}</td>
					<td class="normal-cell text-right">{transaction.amount}</td>
					<td>
						<div class="flex h-full w-full justify-center">
							<button type="button"><Pencil class="h-6 w-6" /></button>
						</div>
					</td>
				</tr>
			{/if}
		{/each}
	</tbody>
	<tfoot>
		<tr class="border-y border-primary bg-primary text-primary-fg">
			<th class="p-1 text-right" colspan={4}>SUM</th>
			<th class="text-right">1000</th>
			<th></th>
		</tr>
	</tfoot>
</table>
{#if errorMsg}
	<ErrorCard>{errorMsg}</ErrorCard>
{/if}

<style lang="postcss">
	.icon-button {
		@apply rounded p-0.5 transition-colors hover:bg-slate-200;
	}
	.normal-cell {
		@apply h-9 px-1;
	}
</style>
