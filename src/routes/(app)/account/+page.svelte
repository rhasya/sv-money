<script lang="ts">
	import { accountTypes } from '$lib/common/consts';
	import { getCategoryName } from '$lib/common/utils';
	import Button from '@components/Button.svelte';
	import ListGroup from '@components/ListGroup.svelte';
	import PageTitle from '@components/PageTitle.svelte';
	import AccountDialog from './AccountDialog.svelte';
	import { Trash } from 'lucide-svelte';
	import { enhance } from '$app/forms';
	import { tick } from 'svelte';

	const { data, form } = $props();

	type Account = (typeof data.accounts)[number];

	const equity = $derived(data.accounts.filter((i) => i.typeId === 1));
	const assets = $derived(data.accounts.filter((i) => i.typeId === 2));
	const liabilities = $derived(data.accounts.filter((i) => i.typeId === 3));
	const income = $derived(data.accounts.filter((i) => i.typeId === 4));
	const expenses = $derived(data.accounts.filter((i) => i.typeId === 5));

	let tableArea: HTMLDivElement;
	let deleteForm: HTMLFormElement;

	let selected: Account | null = $state(null);
	let delAccountId = $state(-1);
	let open = $state(false);
	let hover = $state(-1);

	function handleAddClick() {}
	function handleMouseOver(id: number) {
		hover = id;
	}
	function handleMouseLeave() {
		hover = -1;
	}
	function handleAccountDeleteClick(id: number) {
		if (confirm('Are you sure')) {
			delAccountId = id;
			tick().then(() => deleteForm.requestSubmit());
		}
	}
</script>

{#snippet table(type: string, rows: Account[])}
	<h2 class="text-xl font-bold">{type}</h2>
	<div class="mt-2">
		<ListGroup>
			{#each rows as row}
				<button
					class="link relative flex items-center justify-between no-underline"
					aria-label="Popover Button"
				>
					<span class="basis-[140px] text-left">{row.name}</span>
					<span class="basis-[110px] text-left">{getCategoryName(row.category)}</span>
					<span class="basis-[40px]">{row.seq}</span>
				</button>
				<div class="tooltip-content tooltip-shown:visible tooltip-shown:opacity-100" role="popover">
					<div class="tooltip-body">
						<button
							class="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 transition-colors hover:bg-red-600"
							onclick={() => handleAccountDeleteClick(row.id)}
						>
							<Trash class="h-4 w-4 text-white" />
						</button>
					</div>
				</div>
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
<form
	id="deleteForm"
	class="invisible h-0 w-0"
	method="POST"
	bind:this={deleteForm}
	use:enhance
	action="?/delete"
>
	<input type="hidden" name="accountId" value={delAccountId} />
</form>
<AccountDialog bind:open />
