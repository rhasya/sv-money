<script lang="ts">
	import Button from '@components/Button.svelte';
	import Label from '@components/Label.svelte';
	import TextField from '@components/TextField.svelte';
	import ShowroomGroup from './ShowroomGroup.svelte';
	import Dialog from '@components/Dialog.svelte';
	import { useDialog } from '../../utils/dialog.svelte';

	let { isOpen, open, close, onclose } = $derived.by(useDialog);
	let name = $state('');
	function handleOkClick() {
		alert(name);
		name = '';
		close();
	}
</script>

<main class="px-8 py-8">
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
		<ShowroomGroup title="모달 다이얼로그">
			<div>
				<Button onclick={open}>열기</Button>
			</div>
		</ShowroomGroup>
	</div>
	<Dialog open={isOpen}>
		<div>
			<Label>Username<TextField bind:value={name} /></Label>
		</div>
		<div class="flex justify-end gap-2">
			<Button onclick={handleOkClick}>확인</Button>
			<Button variant="secondary" onclick={close} {onclose}>닫기</Button>
		</div>
	</Dialog>
</main>
