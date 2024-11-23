<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { formatNumber } from '$lib/common/utils';
	import {
		Table,
		TableBody,
		TableCell,
		TableHead,
		TableHeader,
		TableRow
	} from '$lib/components/ui/table';
	import Button from '@components/Button.svelte';
	import DateRangePicker from '@components/DateRangePicker.svelte';
	import PageTitle from '@components/PageTitle.svelte';
	import SimpleSelect from '@components/SimpleSelect.svelte';
	import { addMonths, endOfMonth, format, startOfMonth } from 'date-fns';
	import { Ban, ChevronLeft, ChevronRight, Pencil, Save } from 'lucide-svelte';
	import { tick } from 'svelte';
	import { z, ZodError } from 'zod';
	import ErrorCard from './ErrorCard.svelte';
	import MonthButtons from './MonthButtons.svelte';
	import GridSelect from './GridSelect.svelte';

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
	let transactions: Partial<{
		id: number;
		state: any;
		leftAccountId: string;
		rightAccountId: string;
		tdate: string | null;
		seq: number | null;
		title: string | null;
		amount: number | null;
	}>[] = $state([]);
	let errorMsg: string | null = $state(null);

	let searchCond: { fromDate: string | null; toDate: string | null } = $state({
		fromDate: data.fromDate,
		toDate: data.toDate
	});

	// svelte-ignore non_reactive_update
	let firstInputRef: HTMLInputElement;
	let datePicker: ReturnType<typeof DateRangePicker>;

	$effect(() => {
		transactions = data.transactions.map((t) => ({
			...t,
			leftAccountId: `${t.leftAccountId}`,
			rightAccountId: `${t.rightAccountId}`
		}));
	});

	async function create() {}

	async function update() {}

	function getAccountText(
		accounts: { id: number; name: string | null; typeId: number }[],
		id: string,
		left: boolean
	) {
		const account = accounts.find((a) => `${a.id}` === id);
		const name = account?.name ?? '';
		let plusMinus = '';
		if (left) {
			if (account?.typeId === 2) plusMinus = '[+]';
			else if (account?.typeId === 1 || account?.typeId === 3) plusMinus = '[-]';
		} else {
			if (account?.typeId === 2) plusMinus = '[-]';
			else if (account?.typeId === 1 || account?.typeId === 3) plusMinus = '[+]';
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

	function handleKeyUp(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			handleSaveClick();
		}
	}

	async function handleSaveClick() {
		try {
			if (mode === 'ADD') {
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

	function handleMonthMoveClick(move: number) {
		if (searchCond.fromDate && searchCond.toDate) {
			const targetMonth = addMonths(searchCond.fromDate, move);
			searchCond.fromDate = format(startOfMonth(targetMonth), 'yyyy-MM-dd');
			searchCond.toDate = format(endOfMonth(targetMonth), 'yyyy-MM-dd');
			handleSearchClick();
		}
	}

	async function handleTitleBlur(e: FocusEvent & { currentTarget: Element & HTMLInputElement }) {
		if (mode === 'ADD') {
			const res = await fetch(encodeURI(`/api/transaction?title=${e.currentTarget.value}`));
			if (res.ok) {
				const { result } = await res.json();
				const target = transactions.find(({ id }) => id === selected);
				if (target) {
					if (!target.leftAccountId && !target.rightAccountId) {
						target.leftAccountId = `${result?.leftAccountId ?? ''}`;
						target.rightAccountId = `${result?.rightAccountId ?? ''}`;
					}
				}
			}
		}
	}

	// ---------------- NEW
	let selected = $state(-1);
	let mode = $state<null | 'ADD' | 'EDIT'>(null);
	let lastAddedDate: string | null = $state(null);

	function handleEditClick(id: number) {
		selected = id;
		mode = 'EDIT';
	}

	function handleCancelClick() {
		selected = -1;
		mode = null;
		invalidateAll();
	}

	function handleAddClick() {
		if (mode !== 'ADD') {
			const newId = new Date().getTime();
			transactions.push({
				id: newId,
				tdate: lastAddedDate,
				seq: null,
				title: ''
			});

			selected = newId;
			mode = 'ADD';
		}
		tick().then(() => firstInputRef?.focus());
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
<div class=" mt-4 max-h-[calc(100vh-250px)] overflow-auto">
	<Table narrow>
		<TableHeader>
			<TableRow>
				<TableHead class="w-[140px]">Date</TableHead>
				<TableHead class="w-[90px]">SEQ</TableHead>
				<TableHead>Title</TableHead>
				<TableHead class="w-[140px]">Left</TableHead>
				<TableHead class="w-[140px]">Right</TableHead>
				<TableHead class="w-[100px]">Amount</TableHead>
				<TableHead class="w-[80px]">A</TableHead>
			</TableRow>
		</TableHeader>
		<TableBody>
			{#each transactions as transaction (transaction.id)}
				{#if selected == transaction.id}
					<TableRow data-edit class="[&_td]:p-0">
						<TableCell>
							<input
								type="date"
								class="h-7 w-full border px-2"
								bind:value={transaction.tdate}
								bind:this={firstInputRef}
							/>
						</TableCell>
						<TableCell>
							<input type="text" class="h-7 w-full border px-2" bind:value={transaction.seq} />
						</TableCell>
						<TableCell>
							<input
								type="text"
								class="h-7 w-full border px-2"
								bind:value={transaction.title}
								onkeyup={handleKeyUp}
								onblur={handleTitleBlur}
							/>
						</TableCell>
						<TableCell>
							<GridSelect
								items={data.leftAccounts.map((a) => ({ value: `${a.id}`, label: a.name! }))}
								bind:value={transaction.leftAccountId}
							/>
						</TableCell>
						<TableCell>
							<GridSelect
								items={data.rightAccounts.map((a) => ({ value: `${a.id}`, label: a.name! }))}
								bind:value={transaction.rightAccountId}
							/>
						</TableCell>
						<TableCell>
							<input
								type="text"
								class="h-7 w-full border px-1"
								bind:value={transaction.amount}
								onkeyup={(e) => handleKeyUp(e, transaction.state!)}
							/>
						</TableCell>
						<TableCell class="align-middle">
							<div class="flex h-full w-full items-center justify-center gap-1">
								<button
									type="button"
									class="rounded p-0.5 transition-colors hover:bg-slate-200"
									onclick={() => handleSaveClick(transaction.state!)}
								>
									<Save class="h-4 w-4" />
								</button>
								<button type="button" class="rounded p-0.5 transition-colors hover:bg-slate-200">
									<Ban class="h-4 w-4" onclick={() => handleCancelClick()} />
								</button>
							</div>
						</TableCell>
					</TableRow>
				{:else}
					<TableRow>
						<TableCell class="text-center">{format(transaction.tdate!, 'yyyy-MM-dd')}</TableCell>
						<TableCell>{transaction.seq}</TableCell>
						<TableCell>{transaction.title}</TableCell>
						<TableCell>
							{getAccountText(data.leftAccounts, transaction.leftAccountId!, true)}
						</TableCell>
						<TableCell>
							{getAccountText(data.rightAccounts, transaction.rightAccountId!, false)}
						</TableCell>
						<TableCell class="text-right">{formatNumber(transaction.amount ?? 0)}</TableCell>
						<TableCell>
							<div class="flex h-full w-full justify-center">
								<button type="button" onclick={() => handleEditClick(transaction.id!)}>
									<Pencil class="h-4 w-4" />
								</button>
							</div>
						</TableCell>
					</TableRow>
				{/if}
			{/each}
		</TableBody>
	</Table>
</div>
{#if errorMsg}
	<ErrorCard onclick={() => (errorMsg = null)}>{errorMsg}</ErrorCard>
{/if}
