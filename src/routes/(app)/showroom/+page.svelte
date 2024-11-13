<script lang="ts">
	import Button from '@components/Button.svelte';
	import Dialog from '@components/Dialog.svelte';
	import Dropdown from '@components/Dropdown.svelte';
	import Label from '@components/Label.svelte';
	import TextField from '@components/TextField.svelte';

	import SimpleSelect from '@components/SimpleSelect.svelte';
	import ShowroomGroup from './ShowroomGroup.svelte';

	const items = [
		{ label: 'Item1 Text', value: 'Item1' },
		{ label: 'Item2 Text', value: 'Item2' },
		{ label: 'Item3 Text', value: 'Item3' }
	];

	let name = $state('');
	let dropdownValue = $state('');
	let open = $state(false);

	function handleOkClick() {
		alert(name);
		name = '';
		open = false;
	}
</script>

<div class="flex flex-col gap-4">
	<ShowroomGroup title="버튼">
		<div>
			<Button>버튼</Button>
			<Button variant="secondary">버튼</Button>
			<Button disabled>버튼</Button>
			<Button variant="secondary" disabled>버튼</Button>
		</div>
	</ShowroomGroup>
	<ShowroomGroup title="텍스트필드">
		<div class="w-[480px]">
			<div>
				<Label>Username<TextField /></Label>
			</div>
			<div>
				<Label>Password<TextField type="password" /></Label>
			</div>
		</div>
	</ShowroomGroup>
	<ShowroomGroup title="드롭다운">
		<div class="flex w-[480px] flex-row gap-2">
			<div class="grow">
				<Dropdown {items} bind:value={dropdownValue} />
			</div>
			<p>{dropdownValue}</p>
		</div>
		<div class="flex w-[480px] flex-row gap-2">
			<div class="grow">
				<SimpleSelect {items} bind:value={dropdownValue} />
			</div>
			<p>{dropdownValue}</p>
		</div>
	</ShowroomGroup>
	<ShowroomGroup title="모달 다이얼로그">
		<div>
			<Button onclick={() => (open = true)}>열기</Button>
			<Button variant="secondary" onclick={() => alert(open)}>CHECK</Button>
		</div>
	</ShowroomGroup>
</div>
<Dialog bind:open>
	<div>
		<Label>Username<TextField bind:value={name} /></Label>
	</div>
	<div class="flex justify-end gap-2">
		<Button onclick={handleOkClick}>확인</Button>
		<Button variant="secondary" onclick={() => (open = false)}>닫기</Button>
	</div>
</Dialog>
