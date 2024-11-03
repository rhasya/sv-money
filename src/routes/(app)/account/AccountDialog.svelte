<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { accountTypes, categories } from '$lib/common/consts';
	import Button from '@components/Button.svelte';
	import Dialog from '@components/Dialog.svelte';
	import Label from '@components/Label.svelte';
	import SimpleSelect from '@components/SimpleSelect.svelte';
	import TextField from '@components/TextField.svelte';

	const initialData: {
		id?: number;
		name: string | null;
		typeId?: number;
		category?: string | null;
		seq?: number | null;
	} = {
		name: '',
		category: '',
		seq: null
	};

	let {
		isOpen,
		onclose,
		close,
		error,
		data
	}: {
		isOpen: boolean;
		onclose: () => void;
		close: () => void;
		error?: string;
		data?: typeof initialData | null;
	} = $props();

	let input = $state(initialData);

	$effect(() => {
		if (data) {
			input = data;
		}
	});

	const accountTypeItems = accountTypes.map((a) => ({ value: a.id, text: a.text }));
	const categoriyItems = $derived(
		categories
			.filter((c) => c.parent === input.typeId)
			.map((c) => ({ value: c.code, text: c.text }))
	);
</script>

<Dialog open={isOpen} title="Add/Modify Account" {onclose}>
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
			<input type="hidden" name="id" value={data?.id} />
			<div>
				<Label>Title <TextField placeholder="Name" name="name" value={input.name} /></Label>
			</div>
			<div>
				<Label
					>Type <SimpleSelect
						class="bordered-select"
						items={accountTypeItems}
						name="typeId"
						bind:value={input.typeId}
					/></Label
				>
			</div>
			<div>
				<Label
					>Category <SimpleSelect
						class="bordered-select"
						items={categoriyItems}
						name="category"
						value={input.category}
					/></Label
				>
			</div>
			<div>
				<Label>Sequence <TextField placeholder="Sequence" name="seq" value={input.seq} /></Label>
			</div>
		</div>
		<div>
			<p>{error}</p>
		</div>
		<div class="flex justify-end gap-4">
			<Button type="submit">Save</Button>
			<Button type="button" variant="secondary" onclick={close}>Close</Button>
		</div>
	</form>
</Dialog>
