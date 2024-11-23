<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { formatNumber } from '$lib/common/utils';
	import Button from '@components/Button.svelte';
	import DateRangePicker from '@components/DateRangePicker.svelte';
	import PageTitle from '@components/PageTitle.svelte';
	import SimpleSelect from '@components/SimpleSelect.svelte';
	import { addMonths, endOfMonth, format, startOfMonth } from 'date-fns';
	import { Ban, ChevronLeft, ChevronRight, Pencil, Save } from 'lucide-svelte';
	import { z, ZodError } from 'zod';
	import ErrorCard from './ErrorCard.svelte';
	import MonthButtons from './MonthButtons.svelte';

	const createSchema = z.object({
		tdate: z.string().date(),
		seq: z.union([
			z.number(),
			z
				.string()
				.nullish()
				.transform((val) => (val ? parseInt(val) : null))
				.pipe(z.number().nullish())
		]),
		title: z.string().min(1),
		leftAccountId: z.coerce.number(),
		rightAccountId: z.coerce.number(),
		amount: z.preprocess((val) => `${val}`.replaceAll(',', ''), z.coerce.number())
	});

	const isSameAccount = (val: z.infer<typeof createSchema>) =>
		val.leftAccountId != val.rightAccountId;

	const createValidator = createSchema.refine(isSameAccount);
	const updateValidator = createSchema.extend({ id: z.number() }).refine(isSameAccount);

	const { data } = $props();
	let transactions: Partial<(typeof data.transactions)[number]>[] = $state([]);
	let errorMsg: string | null = $state(null);
	let lastAddedDate: string | null = $state(null);
	let searchCond: { fromDate: string | null; toDate: string | null } = $state({
		fromDate: data.fromDate,
		toDate: data.toDate
	});

	// svelte-ignore non_reactive_update
	let firstInputRef: HTMLInputElement;
	let datePicker: ReturnType<typeof DateRangePicker>;

	$effect(() => {
		transactions = data.transactions;
	});

	async function create() {
		const tr = createValidator.parse(transactions.filter((t) => t.state === 'ADD')[0]);
		lastAddedDate = tr.tdate;
		const res = await fetch('/api/transaction', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(tr)
		});
		if (!res.ok) {
			throw new Error(res.statusText);
		}
	}

	async function update() {
		const tr = updateValidator.parse(transactions.filter((t) => t.state === 'EDIT')[0]);
		const res = await fetch(`/api/transaction/${tr.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(tr)
		});
		if (!res.ok) {
			throw new Error(res.statusText);
		}
	}

	function getAccountText(
		accounts: { id: number; name: string | null; typeId: number }[],
		id: number,
		left: boolean
	) {
		const account = accounts.filter((a) => a.id === id)[0];
		const name = account?.name ?? '';
		let plusMinus = '';
		if (left) {
			if (account.typeId === 2) plusMinus = '[+]';
			else if (account.typeId === 1 || account.typeId === 3) plusMinus = '[-]';
		} else {
			if (account.typeId === 2) plusMinus = '[-]';
			else if (account.typeId === 1 || account.typeId === 3) plusMinus = '[+]';
		}
		return `${name}${plusMinus}`;
	}

	function handleSearchClick() {
		if (datePicker.getValid()) {
			goto(`/transaction?fromDate=${searchCond.fromDate}&toDate=${searchCond.toDate}`);
		} else {
			alert('Check search condition.');
		}
	}

	function handleAddClick() {
		if (!transactions.some((t) => t.state === 'ADD')) {
			transactions.push({
				id: new Date().getTime(),
				tdate: lastAddedDate,
				seq: null,
				title: '',
				state: 'ADD'
			});
		}
		setTimeout(() => firstInputRef?.focus(), 100);
	}

	function handleEditClick(id: number) {
		if (!transactions.some((t) => t.state === 'EDIT')) {
			const idx = transactions.findIndex((t) => t.id === id);
			transactions[idx].state = 'EDIT';
		}
	}

	function handleKeyUp(e: KeyboardEvent, state: string) {
		if (e.key === 'Enter') {
			handleSaveClick(state);
		}
	}

	async function handleSaveClick(state: string) {
		try {
			if (state === 'ADD') {
				await create();
			} else {
				await update();
			}
			invalidateAll();
		} catch (e) {
			if (e instanceof ZodError) {
				errorMsg = e.errors[0].message;
			} else {
				errorMsg = `${e}`;
			}
		}
	}

	function handleCancelClick(state: string) {
		if (state === 'EDIT') {
			invalidateAll();
		} else {
			transactions.splice(-1, 1);
		}
	}

	function handleMonthMoveClick(move: number) {
		if (searchCond.fromDate && searchCond.toDate) {
			const targetMonth = addMonths(searchCond.fromDate, move);
			searchCond.fromDate = format(startOfMonth(targetMonth), 'yyyy-MM-dd');
			searchCond.toDate = format(endOfMonth(targetMonth), 'yyyy-MM-dd');
			handleSearchClick();
		}
	}

	async function handleTitleBlur(e: FocusEvent & { currentTarget: Element & HTMLInputElement }) {
		const res = await fetch(encodeURI(`/api/transaction?title=${e.currentTarget.value}`));
		if (res.ok) {
			const { result } = await res.json();
			const target = transactions.filter(({ state }) => state === 'ADD')[0];
			if (target) {
				if (!target.leftAccountId && !target.rightAccountId) {
					target.leftAccountId = result?.leftAccountId;
					target.rightAccountId = result?.rightAccountId;
				}
			}
		}
	}
</script>

<PageTitle>Transactions</PageTitle>
<div class="mt-4 flex justify-between gap-2">
	<div class="flex gap-2">
		<button onclick={() => handleMonthMoveClick(-1)}><ChevronLeft /></button>
		<DateRangePicker
			bind:fromDate={searchCond.fromDate}
			bind:toDate={searchCond.toDate}
			bind:this={datePicker}
		/>
		<button onclick={() => handleMonthMoveClick(+1)}><ChevronRight /></button>
		<Button onclick={handleSearchClick}>SEARCH</Button>
		<MonthButtons
			bind:fromDate={searchCond.fromDate}
			bind:toDate={searchCond.toDate}
			onclick={handleSearchClick}
		/>
	</div>
	<div>
		<Button onclick={handleAddClick}>CREATE</Button>
	</div>
</div>
<div class="max-h-[700px] overflow-auto">
	<table>
		<thead>
			<tr>
				<th>Date</th>
				<th class="w-[90px]">SEQ</th>
				<th>Title</th>
				<th class="w-[140px]">Left</th>
				<th class="w-[140px]">Right</th>
				<th class="w-[100px]">Amount</th>
				<th class="w-[80px]">A</th>
			</tr>
		</thead>
		<tbody>
			{#each transactions as transaction (transaction.id)}
				{#if transaction.state === 'ADD' || transaction.state === 'EDIT'}
					<tr class="border-primary border-y">
						<td class="h-9 p-0.5"
							><input
								type="date"
								class="h-full w-full px-1"
								bind:value={transaction.tdate}
								bind:this={firstInputRef}
							/></td
						>
						<td class="h-9 p-0.5">
							<input type="text" class="h-full w-full px-1" bind:value={transaction.seq} />
						</td>
						<td class="h-9 p-0.5">
							<input
								type="text"
								class="h-full w-full px-1"
								bind:value={transaction.title}
								onkeyup={(e) => handleKeyUp(e, transaction.state!)}
								onblur={handleTitleBlur}
							/>
						</td>
						<td class="h-9 p-0.5">
							<SimpleSelect
								variant="small"
								items={data.leftAccounts.map((a) => ({ value: a.id, label: a.name! }))}
								bind:value={transaction.leftAccountId}
							/>
						</td>
						<td class="h-9 p-0.5">
							<SimpleSelect
								variant="small"
								items={data.rightAccounts.map((a) => ({ value: a.id, label: a.name! }))}
								bind:value={transaction.rightAccountId}
							/>
						</td>
						<td class="h-9 p-0.5">
							<input
								type="text"
								class="h-full w-full px-1"
								bind:value={transaction.amount}
								onkeyup={(e) => handleKeyUp(e, transaction.state!)}
							/>
						</td>
						<td class="h-9 align-middle">
							<div class="flex h-full w-full items-center justify-center">
								<button
									type="button"
									class="rounded p-0.5 transition-colors hover:bg-slate-200"
									onclick={() => handleSaveClick(transaction.state!)}
								>
									<Save class="h-6 w-6" />
								</button>
								<button type="button" class="rounded p-0.5 transition-colors hover:bg-slate-200"
									><Ban
										class="h-6 w-6"
										onclick={() => handleCancelClick(transaction.state!)}
									/></button
								>
							</div>
						</td>
					</tr>
				{:else}
					<tr class="border-primary border-y">
						<td class="h-9 px-1 text-center">{format(transaction.tdate!, 'yyyy-MM-dd')}</td>
						<td class="h-9 px-1">{transaction.seq}</td>
						<td class="h-9 px-1">{transaction.title}</td>
						<td class="h-9 px-1"
							>{getAccountText(data.leftAccounts, transaction.leftAccountId!, true)}</td
						>
						<td class="h-9 px-1"
							>{getAccountText(data.rightAccounts, transaction.rightAccountId!, false)}</td
						>
						<td class="h-9 px-1 text-right">{formatNumber(transaction.amount ?? 0)}</td>
						<td>
							<div class="flex h-full w-full justify-center">
								<button type="button" onclick={() => handleEditClick(transaction.id!)}
									><Pencil class="h-6 w-6" /></button
								>
							</div>
						</td>
					</tr>
				{/if}
			{/each}
		</tbody>
		{#if false}
			<tfoot>
				<tr class="text-primary-fg border-primary bg-primary border-y">
					<th class="p-1 text-right" colspan={4}>SUM</th>
					<th class="text-right">1000</th>
					<th></th>
				</tr>
			</tfoot>
		{/if}
	</table>
</div>
{#if errorMsg}
	<ErrorCard onclick={() => (errorMsg = null)}>{errorMsg}</ErrorCard>
{/if}
<div class="h-9"></div>
