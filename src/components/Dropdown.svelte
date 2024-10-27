<script lang="ts">
	import { slide } from 'svelte/transition';

	interface Props {
		items: { text: string; value: string }[];
		value?: string;
		onchange?: (v: string) => void;
	}

	let { items, value = $bindable(), onchange }: Props = $props();
	let open = $state(false);
	let selected = $derived(items.filter((i) => i.value === value)[0]?.text ?? 'SELECT');

	function handleClick() {
		open = !open;
	}

	function handleItemClick(v: string) {
		onchange?.(v);
		value = v;
		open = false;
	}
</script>

<div class="relative">
	<button
		onclick={handleClick}
		class="flex h-9 w-full items-center justify-between rounded border border-primary px-2"
		><span>{selected}</span>
		{#if open}
			<span>▶</span>
		{:else}
			<span>▼</span>
		{/if}</button
	>
	{#if open}
		<ul
			class="absolute w-full rounded-b border-x border-b border-primary bg-white"
			transition:slide={{ duration: 150 }}
		>
			{#each items as item}
				<li>
					<button
						class="h-9 w-full px-2 text-left transition-colors hover:bg-primary hover:text-primary-fg"
						onclick={handleItemClick.bind(null, item.value)}>{item.text}</button
					>
				</li>
			{/each}
		</ul>
	{/if}
</div>
