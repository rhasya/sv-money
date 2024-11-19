<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { accountTypes, categories } from '$lib/common/consts';
	import Select from '@components/Select.svelte';
	import { Button } from '@components/ui/button';
	import { Dialog } from '@components/ui/dialog';
	import { Input } from '@components/ui/input';
	import { Label } from '@components/ui/label';

	type CreateAccount = {
		id?: number;
		name?: string;
		typeId?: string;
		category?: string;
		seq?: number;
	};

	let {
		open = $bindable(),
		account,
		error,
		onOpenChange
	}: {
		open: boolean;
		account?: AccountTable;
		error?: Map<string, string>;
		onOpenChange?: (open: boolean) => void;
	} = $props();

	let copiedAccount = $state<CreateAccount>({ typeId: '' });
	$effect(() => {
		if (open) {
			$inspect(account);
			copiedAccount = {
				id: account?.id,
				name: account?.name,
				typeId: `${account?.typeId ?? ''}`,
				category: `${account?.category ?? ''}`,
				seq: account?.seq
			};
		}
	});

	const accountTypeItems = accountTypes.map(({ id, text: label }) => ({ value: `${id}`, label }));
	const categoryItems = $derived(
		categories
			.filter(({ parent }) => `${parent}` === copiedAccount?.typeId)
			.map(({ code: value, text: label }) => ({ value, label }))
	);
</script>

{#snippet errorMessage(map?: Map<string, string>, key?: string)}
	{#if map?.has(key!)}
		<span class="absolute top-full text-sm text-red-500">{map.get(key!)}</span>
	{/if}
{/snippet}

<Dialog bind:open title="Account" {onOpenChange}>
	<form
		class="contents"
		method="POST"
		action="?/post"
		use:enhance={() => {
			return ({ result, update }) => {
				if (result.type === 'success') {
					update();
					open = false;
				} else {
					applyAction(result);
				}
			};
		}}
	>
		<input type="hidden" name="id" value={copiedAccount?.id} />
		<div class="flex flex-col space-y-8">
			<div class="relative flex flex-col gap-2">
				<Label for="name">Name *</Label>
				<Input
					id="name"
					name="name"
					placeholder="Name"
					autocomplete="off"
					value={copiedAccount?.name}
				/>
				{@render errorMessage(error, 'name')}
			</div>
			<div class="relative flex flex-col gap-2">
				<Label for="account-type">Account Type *</Label>
				<Select name="typeId" bind:value={copiedAccount.typeId} items={accountTypeItems} />
				{@render errorMessage(error, 'typeId')}
			</div>
			<div class="relative flex flex-col gap-2">
				<Label>Category</Label>
				<Select
					name="category"
					items={categoryItems}
					disabled={categoryItems.length === 0}
					value={copiedAccount?.category}
				/>
				{@render errorMessage(error, 'category')}
			</div>
			<div class="relative flex flex-col gap-2">
				<Label for="sequence">Sequence</Label>
				<Input id="sequence" name="sequence" placeholder="Sequence" value={copiedAccount?.seq} />
				{@render errorMessage(error, 'sequence')}
			</div>
		</div>
		<div class="mt-6 flex justify-end gap-4">
			<Button type="button" variant="secondary" onclick={() => (open = false)}>Close</Button>
			<Button type="submit">Save</Button>
		</div>
	</form>
</Dialog>
