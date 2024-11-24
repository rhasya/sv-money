<script lang="ts">
	import { Dialog, type DialogRootProps } from 'bits-ui';

	let {
		children,
		open = $bindable(),
		title,
		...props
	}: DialogRootProps & { title?: string } = $props();
</script>

<Dialog.Root bind:open {...props}>
	<Dialog.Portal>
		<Dialog.Overlay
			class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80"
		/>
		<Dialog.Content
			class="bg-background shadow-popover fixed top-[50%] left-[50%] z-50 w-[480px] max-w-[94%] translate-x-[-50%] translate-y-[-50%] rounded-lg border p-5 outline-none"
			interactOutsideBehavior="ignore"
		>
			{#if title}
				<Dialog.Title class="text-lg leading-none font-semibold tracking-tight">
					{title}
				</Dialog.Title>
			{/if}
			<div class="mt-6">
				{@render children?.()}
			</div>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
