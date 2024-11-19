<script lang="ts">
	import { accountTypes } from '$lib/common/consts';
	import { getCategoryName } from '$lib/common/utils';
	import Button from '@components/Button.svelte';
	import ListGroup from '@components/ListGroup.svelte';
	import PageTitle from '@components/PageTitle.svelte';
	import AccountDialog from './AccountDialog.svelte';
	import { Trash, TrashIcon } from 'lucide-svelte';
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
	let hoverId = $state(-1);

	function handleMouseOver(id: number) {
		hoverId = id;
	}
	function handleMouseLeave() {
		hoverId = -1;
	}
	function handleAccountDeleteClick(id: number) {
		if (confirm('Are you sure')) {
			delAccountId = id;
			tick().then(() => deleteForm.requestSubmit());
		}
	}
	function handleAddClick() {
		selected = null;
		open = true;
	}
	function handleUpdateClick(account: Account) {
		selected = account;
		open = true;
	}
</script>

{#snippet table(type: string, rows: Account[])}
	<h2 class="text-xl font-bold">{type}</h2>
	<div class="mt-2">
		<ListGroup>
			{#each rows as row}
				<div
					class="relative p-0"
					onmouseover={() => handleMouseOver(row.id)}
					onmouseleave={handleMouseLeave}
					onfocus={() => {}}
					role="button"
					tabindex={-1}
				>
					<button
						class="grid w-full grid-cols-[3fr_2fr_1fr] items-center justify-between p-3 no-underline hover:bg-muted"
						onclick={() => handleUpdateClick(row)}
					>
						<span class="basis-[140px] text-left">{row.name}</span>
						<span class="basis-[110px] text-left">{getCategoryName(row.category)}</span>
						<span class="basis-[40px]">{row.seq}</span>
					</button>
					{#if row.id === hoverId}
						<div class="absolute bottom-0 right-2 top-0 flex items-center justify-center">
							<button
								class="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
								onclick={() => handleAccountDeleteClick(row.id)}
							>
								<TrashIcon class="h-4 w-4" />
							</button>
						</div>
					{/if}
				</div>
			{/each}
		</ListGroup>
	</div>
{/snippet}

<PageTitle>Accounts</PageTitle>

<div class="table-area mt-4 w-full" bind:this={tableArea}>
	<div class="flex gap-2">
		<Button onclick={handleAddClick}>ADD</Button>
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
<AccountDialog bind:open error={form?.error} account={selected} />
