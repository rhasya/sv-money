<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		open: boolean;
		title?: string;
		children?: Snippet<[]>;
		onclose?: () => void;
	}

	const { open, title = '제목', children, onclose }: Props = $props();
	let ref: HTMLDialogElement;

	$effect(() => {
		if (open) {
			ref.showModal();
		} else {
			ref.close();
		}
	});

	function handleClose() {
		onclose?.();
	}
</script>

<dialog bind:this={ref} class="min-w-[480px] rounded p-4" onclose={handleClose}>
	<div class="flex flex-col gap-2">
		<h1 class="text-2xl font-bold">{title}</h1>
		{@render children?.()}
	</div>
</dialog>
