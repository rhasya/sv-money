<script lang="ts">
	import clsx from 'clsx';

	import { invalidateAll } from '$app/navigation';
	import { accountTypes } from '$lib/common/consts';
	import { useDialog } from '$lib/common/dialog.svelte';
	import { getCategoryName } from '$lib/common/utils';
	import Button from '@components/Button.svelte';
	import PageTitle from '@components/PageTitle.svelte';
	import AccountDialog from './AccountDialog.svelte';

	const { data, form } = $props();

	const items = $derived(data.accounts);

	type Account = (typeof items)[number];

	const capital = $derived(items.filter((i) => i.typeId === 1));
	const asset = $derived(items.filter((i) => i.typeId === 2));
	const debt = $derived(items.filter((i) => i.typeId === 3));
	const incoming = $derived(items.filter((i) => i.typeId === 4));
	const spending = $derived(items.filter((i) => i.typeId === 5));

	let tableArea: HTMLDivElement;

	let selected: Account | null = $state(null);
	const { isOpen, open, close, onclose } = $derived.by(useDialog);

	$effect(() => {
		function handleDocumentClick(e: MouseEvent) {
			e.stopImmediatePropagation();
			const el = e.target as HTMLElement;
			if (!tableArea.contains(el)) {
				selected = null;
			}
		}

		document.addEventListener('click', handleDocumentClick);
		return () => document.removeEventListener('click', handleDocumentClick);
	});

	function handleAccountClick(o: Account) {
		selected = o;
	}

	function handleAddClick() {
		selected = null;
		open();
	}

	function handleUpdateClick() {
		open();
	}

	async function handleDeleteClick() {
		const res = await fetch(`/api/account/${selected?.id}`, {
			method: 'DELETE'
		});
		if (res.ok) {
			invalidateAll();
		}
	}

	function handleAccountDblClick(row: Account) {}
</script>

{#snippet table(type: string, rows: typeof items)}
	<h2 class="text-xl font-bold">{type}</h2>
	<table class="mt-2 w-full table-fixed">
		<tbody>
			{#each rows as row (row.id)}
				<tr
					class={clsx(
						'cursor-pointer border-y border-primary',
						selected?.id === row.id && 'bg-primary text-primary-foreground'
					)}
					onclick={handleAccountClick.bind(null, row)}
					ondblclick={handleAccountDblClick.bind(null, row)}
				>
					<td class="w-[140px] px-2 py-1">{row.name}</td>
					<td class="w-[140px] px-2 py-1">{getCategoryName(row.category)}</td>
					<td class="w-[140px] px-2 py-1">{row.seq}</td>
					<td></td>
				</tr>
			{/each}
		</tbody>
	</table>
{/snippet}

<PageTitle>Accounts</PageTitle>

<div class="table-area" bind:this={tableArea}>
	<div class="mt-8 flex gap-2">
		<Button onclick={handleAddClick}>ADD</Button>
		<Button variant="secondary" onclick={handleUpdateClick} disabled={!selected}>MODIFY</Button>
		<Button variant="destructive" onclick={handleDeleteClick} disabled={!selected}>DELETE</Button>
	</div>

	<div class="mt-4 flex">
		<div class="flex flex-col">
			<div class="px-2">
				{@render table(accountTypes[0].text, capital)}
			</div>

			<div class="mt-3 px-2">
				{@render table(accountTypes[1].text, asset)}
			</div>

			<div class="mt-3 px-2">
				{@render table(accountTypes[2].text, debt)}
			</div>
		</div>

		<div class="px-2">
			{@render table(accountTypes[3].text, incoming)}
		</div>

		<div class="px-2">
			{@render table(accountTypes[4].text, spending)}
		</div>
	</div>

	<AccountDialog
		{isOpen}
		{onclose}
		{close}
		error={form?.error}
		data={{
			id: selected?.id,
			name: selected?.name!,
			typeId: selected?.typeId,
			category: selected?.category ?? '',
			seq: selected?.seq
		}}
	/>
</div>

<style lang="postcss">
	:global(.bordered-select) {
		@apply h-8 w-full rounded border border-primary px-1 text-base font-normal;
	}
</style>
