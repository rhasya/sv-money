<script lang="ts">
	import { slide } from 'svelte/transition';

	interface Props {
		items: { label: string; value: string }[];
		name?: string | null;
		value?: string;
		onchange?: (v: string) => void;
	}

	let { items, name, value = $bindable(), onchange }: Props = $props();
	let open = $state(false);
	let ref: HTMLElement;
	let selected = $derived(items.filter((i) => i.value === value)[0]?.label ?? 'SELECT');

	$effect(() => {
		function handleDocumentClick(e: MouseEvent) {
			if (ref && !ref.contains(e.target as Element)) {
				open = false;
			}
		}

		document.addEventListener('click', handleDocumentClick);
		return () => document.removeEventListener('click', handleDocumentClick);
	});

	function handleClick() {
		open = !open;
	}

	function handleItemClick(v: string) {
		onchange?.(v);
		value = v;
		open = false;
	}
</script>

<div class="relative" bind:this={ref}>
	<select class="hidden h-0 w-0" {name} {value}>
		{#each items as item}
			<option value={item.value}>{item.label}</option>
		{/each}
	</select>
	<button
		type="button"
		onclick={handleClick}
		class="flex h-9 w-full items-center justify-between rounded border border-primary px-2 text-base font-normal"
		><span>{selected}</span>
		<span>▼</span></button
	>
	{#if open}
		<ul
			class="absolute z-10 w-full rounded-b border-x border-b border-primary bg-white text-base font-normal"
			transition:slide={{ duration: 150 }}
		>
			{#each items as item}
				<li>
					<button
						type="button"
						class="hover:text-primary-fg h-9 w-full px-2 text-left transition-colors hover:bg-primary"
						onclick={handleItemClick.bind(null, item.value)}>{item.label}</button
					>
				</li>
			{/each}
		</ul>
	{/if}
</div>
