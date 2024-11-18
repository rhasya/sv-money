<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { accountTypes, categories } from '$lib/common/consts';
	import Button from '@components/Button.svelte';
	import Dialog from '@components/Dialog.svelte';
	import Label from '@components/Label.svelte';
	import SimpleSelect from '@components/SimpleSelect.svelte';
	import TextField from '@components/TextField.svelte';

	let { open = $bindable(), error }: { open: boolean; error?: Record<string, string> } = $props();
	let accountTypeId = $state<number>();

	const accountTypeItems = accountTypes.map(({ id: value, text: label }) => ({ value, label }));
	const categoryItems = $derived(
		categories
			.filter(({ parent }) => parent === accountTypeId)
			.map(({ code: value, text: label }) => ({ value, label }))
	);
</script>

<Dialog bind:open title="Account detail">
	<form
		class="contents"
		method="POST"
		action="?/post"
		use:enhance={() => {
			return ({ result, update }) => {
				console.log(result);
				if (result.type === 'success') {
					open = false;
					update();
				}
				applyAction(result);
			};
		}}
	>
		<div class="mt-4 flex w-[480px] flex-col gap-4">
			<input type="hidden" name="id" />
			<Label>
				<span>Name *</span>
				<TextField class="mt-1" name="name" placeholder="Name" />
				<span></span>
			</Label>
			<Label>
				<span>Account Type *</span>
				<SimpleSelect
					class="mt-1"
					name="typeId"
					items={accountTypeItems}
					emptyLine={false}
					bind:value={accountTypeId}
				/>
			</Label>
			<Label>
				<span>Category</span>
				<SimpleSelect
					class="mt-1"
					name="category"
					items={categoryItems}
					disabled={categoryItems.length === 0}
				/>
			</Label>
			<Label>
				<span>Sequence</span>
				<TextField class="mt-1" name="sequence" placeholder="Sequence" />
			</Label>
		</div>
		<div class="mt-6 flex justify-end gap-4">
			<Button variant="secondary" onclick={() => (open = false)}>Close</Button>
			<Button type="submit">Save</Button>
		</div>
	</form>
</Dialog>
