<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		open: boolean;
		title?: string;
		children?: Snippet<[]>;
		onclose?: () => void;
	}

	let { open = $bindable(), title = '제목', children, onclose }: Props = $props();
	let visible = $state();
	let ref: HTMLDialogElement;

	$effect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			if (e.key === 'Escape' && open) {
				e.preventDefault();
			}
		}
		ref.addEventListener('keydown', handleKeyDown, false);
		return () => ref.removeEventListener('keydown', handleKeyDown, false);
	});

	$effect(() => {
		if (open) {
			ref.showModal();
			setTimeout(() => (visible = ''), 100);
		} else {
			visible = undefined;
			onclose?.();
			setTimeout(() => ref.close(), 300);
		}
	});

	function handleClose() {
		open = false;
	}
</script>

<dialog
	bind:this={ref}
	onclose={handleClose}
	class="rounded opacity-0 transition-opacity duration-300 data-[visible]:opacity-100"
	data-visible={visible}
>
	<div class="flex flex-col gap-2 px-6 py-6">
		<h1 class="text-2xl font-bold">{title}</h1>
		{@render children?.()}
	</div>
</dialog>
