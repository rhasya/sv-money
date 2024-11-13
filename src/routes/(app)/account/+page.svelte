<script lang="ts">
	import { accountTypes } from '$lib/common/consts';
	import { getCategoryName } from '$lib/common/utils';
	import Button from '@components/Button.svelte';
	import ListGroup from '@components/ListGroup.svelte';
	import PageTitle from '@components/PageTitle.svelte';
	import AccountDialog from './AccountDialog.svelte';

	const { data, form } = $props();

	type Account = (typeof data.accounts)[number];

	const equity = $derived(data.accounts.filter((i) => i.typeId === 1));
	const assets = $derived(data.accounts.filter((i) => i.typeId === 2));
	const liabilities = $derived(data.accounts.filter((i) => i.typeId === 3));
	const income = $derived(data.accounts.filter((i) => i.typeId === 4));
	const expenses = $derived(data.accounts.filter((i) => i.typeId === 5));

	let tableArea: HTMLDivElement;

	let selected: Account | null = $state(null);
	let open = $state(false);

	function handleAddClick() {}
</script>

{#snippet table(type: string, rows: Account[])}
	<h2 class="text-xl font-bold">{type}</h2>
	<div class="mt-2">
		<ListGroup>
			{#each rows as row}
				<button class="link flex items-center justify-between no-underline">
					<span class="basis-[140px] text-left">{row.name}</span>
					<span class="basis-[110px] text-left">{getCategoryName(row.category)}</span>
					<span class="basis-[40px]">{row.seq}</span>
				</button>
			{/each}
		</ListGroup>
	</div>
{/snippet}

<PageTitle>Accounts</PageTitle>

<div class="table-area mt-4 w-full" bind:this={tableArea}>
	<div class="flex gap-2">
		<Button onclick={() => (open = true)}>ADD</Button>
	</div>

	<div class="mt-4 flex w-full">
		<div class="flex grow basis-0 flex-col">
			<div class="px-2">
				{@render table(accountTypes[0].text, equity)}
			</div>

			<div class="mt-3 px-2">
				{@render table(accountTypes[1].text, assets)}
			</div>

			<div class="mt-3 px-2">
				{@render table(accountTypes[2].text, liabilities)}
			</div>
		</div>

		<div class="grow basis-0 px-2">
			{@render table(accountTypes[3].text, income)}
		</div>

		<div class="grow basis-0 px-2">
			{@render table(accountTypes[4].text, expenses)}
		</div>
	</div>
</div>
<AccountDialog bind:open />
