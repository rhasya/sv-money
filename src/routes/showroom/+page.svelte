<script lang="ts">
	import Button from '@components/Button.svelte';
	import Label from '@components/Label.svelte';
	import TextField from '@components/TextField.svelte';
	import ShowroomGroup from './ShowroomGroup.svelte';
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
					<Label>Username</Label>
					<TextField />
				</div>
				<div>
					<Label>Password</Label>
					<TextField type="password" />
				</div>
			</div>
		</ShowroomGroup>
	</div>
</main>
