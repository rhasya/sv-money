<script lang="ts">
	import { enhance } from '$app/forms';
	import { accountTypes, categories } from '$lib/common/consts';
	import { useDialog } from '$lib/common/dialog.svelte';
	import Button from '@components/Button.svelte';
	import Dialog from '@components/Dialog.svelte';
	import Dropdown from '@components/Dropdown.svelte';
	import Label from '@components/Label.svelte';
	import PageTitle from '@components/PageTitle.svelte';
	import TextField from '@components/TextField.svelte';
	import clsx from 'clsx';

	const items = $state([
		{ id: 1, title: '초기자본', type: '자본' },
		{ id: 2, title: '우리은행', type: '자산', category: '은행' },
		{ id: 3, title: '삼성카드', type: '부채', category: '신용카드' },
		{ id: 4, title: '식비', type: '지출' }
	]);

	type Account = (typeof items)[number];

	const capital = $derived(items.filter((i) => i.type === '자본'));
	const asset = $derived(items.filter((i) => i.type === '자산'));
	const debt = $derived(items.filter((i) => i.type === '부채'));
	const spending = $derived(items.filter((i) => i.type === '지출'));

	let selected: Account | null = $state(null);
	const { isOpen, open, close, onclose } = $derived.by(useDialog);

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
				>
					<td class="w-[140px] px-1 py-1">{row.title}</td>
					<td class="w-[140px] px-1 py-1">{row.category}</td>
					<td></td>
				</tr>
			{/each}
		</tbody>
	</table>
{/snippet}

<PageTitle>Accounts</PageTitle>
<div class="mt-8">
	<Button onclick={handleAddClick}>추가</Button>
</div>

<div class="mt-1">
	{@render table('자본', capital)}
</div>

<div class="mt-1">
	{@render table('자산', asset)}
</div>

<div class="mt-1">
	{@render table('부채', debt)}
</div>

<div class="mt-1">
	{@render table('지출', spending)}
</div>

<Dialog open={isOpen} title="Add Account" {onclose}>
	<form
		method="POST"
		use:enhance={({ formData, formElement, cancel }) => {
			const { title, type, category } = Object.fromEntries(formData);
			items.push({ id: Math.random() * 100000000, title, type, category });
			formElement.reset();
			close();
			cancel();
		}}
	>
		<div class="flex h-[320px] flex-col gap-2">
			<div>
				<Label>Title <TextField placeholder="Title" name="title" /></Label>
			</div>
			<div>
				<Label>Type <Dropdown items={accountTypes} name="type" /></Label>
			</div>
			<div>
				<Label>Type <Dropdown items={categories} name="category" /></Label>
			</div>
		</div>
		<div class="flex justify-end gap-4">
			<Button type="submit">Save</Button>
			<Button type="button" variant="secondary" onclick={close}>Close</Button>
		</div>
	</form>
</Dialog>
