<script lang="ts">
	import clsx from 'clsx';

	import { applyAction, enhance } from '$app/forms';
	import { goto, invalidateAll } from '$app/navigation';
	import { accountTypes, categories } from '$lib/common/consts';
	import { useDialog } from '$lib/common/dialog.svelte';
	import Button from '@components/Button.svelte';
	import Dialog from '@components/Dialog.svelte';
	import Dropdown from '@components/Dropdown.svelte';
	import Label from '@components/Label.svelte';
	import PageTitle from '@components/PageTitle.svelte';
	import TextField from '@components/TextField.svelte';
	import SimpleSelect from '@components/SimpleSelect.svelte';

	const { data, form } = $props();

	const items = $derived(data.accounts);

	type Account = (typeof items)[number];

	const capital = $derived(items.filter((i) => i.typeId === 1));
	const asset = $derived(items.filter((i) => i.typeId === 2));
	const debt = $derived(items.filter((i) => i.typeId === 3));
	const incoming = $derived(items.filter((i) => i.typeId === 4));
	const spending = $derived(items.filter((i) => i.typeId === 5));

	let selected: Account | null = $state(null);
	const { isOpen, open, close, onclose } = $derived.by(useDialog);
	let accountType = $state('');

	const accountTypeItems = accountTypes.map((a) => ({ value: `${a.id}`, text: a.text }));
	const categoriyItems = $derived(
		categories
			.filter((c) => `${c.parent}` === accountType)
			.map((c) => ({ value: c.code, text: c.text }))
	);

	$effect(() => {
		function handleDocumentClick(e: MouseEvent) {
			// e.stopImmediatePropagation();
			const el = e.target as HTMLElement;
			if (el.tagName !== 'TD' && el.tagName !== 'BUTTON') {
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

	function handleAccountDblClick(row: Account) {
		goto(`/transaction`);
	}
</script>

{#snippet table(type: string, rows: typeof items)}
	<h2 class="text-xl font-bold">{type}</h2>
	<table class="w-full table-fixed">
		<tbody>
			{#each rows as row (row.id)}
				<tr
					class={clsx(
						'cursor-pointer border-y border-primary',
						selected?.id === row.id && 'bg-primary text-primary-fg'
					)}
					onclick={handleAccountClick.bind(null, row)}
					ondblclick={handleAccountDblClick.bind(null, row)}
				>
					<td class="w-[140px] px-1 py-1">{row.name}</td>
					<td class="w-[140px] px-1 py-1">{row.category}</td>
					<td></td>
				</tr>
			{/each}
		</tbody>
	</table>
{/snippet}

<PageTitle>Accounts</PageTitle>
<div class="mt-8 flex gap-2">
	<Button onclick={handleAddClick}>추가</Button>
	<Button variant="secondary" onclick={handleDeleteClick} disabled={!selected}>삭제</Button>
</div>

<div class="mt-1">
	{@render table(accountTypes[0].text, capital)}
</div>

<div class="mt-1">
	{@render table(accountTypes[1].text, asset)}
</div>

<div class="mt-1">
	{@render table(accountTypes[2].text, debt)}
</div>

<div class="mt-1">
	{@render table(accountTypes[3].text, incoming)}
</div>

<div class="mt-1">
	{@render table(accountTypes[4].text, spending)}
</div>

<Dialog open={isOpen} title="Add Account" {onclose}>
	<form
		method="POST"
		use:enhance={({ formElement }) => {
			return ({ result }) => {
				if (result.type === 'success') {
					formElement?.reset();
					invalidateAll();
					close();
				}
				applyAction(result);
			};
		}}
	>
		<div class="flex h-[320px] flex-col gap-2">
			<div>
				<Label>Title <TextField placeholder="Name" name="name" /></Label>
			</div>
			<div>
				<Label
					>Type <SimpleSelect
						class="bordered-select"
						items={accountTypeItems}
						name="typeId"
						bind:value={accountType}
					/></Label
				>
			</div>
			<div>
				<Label
					>Type <SimpleSelect
						class="bordered-select"
						items={categoriyItems}
						name="category"
					/></Label
				>
			</div>
		</div>
		<div>
			<p>{form?.error}</p>
		</div>
		<div class="flex justify-end gap-4">
			<Button type="submit">Save</Button>
			<Button type="button" variant="secondary" onclick={close}>Close</Button>
		</div>
	</form>
</Dialog>

<style lang="postcss">
	:global(.bordered-select) {
		@apply h-8 w-full rounded border border-primary px-1 text-base font-normal;
	}
</style>
