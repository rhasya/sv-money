<script lang="ts">
	import Button from '@components/Button.svelte';
	import SimpleSelect from '@components/SimpleSelect.svelte';

	type Props = {
		year: string;
		month: string;
	};

	let { year = $bindable(), month = $bindable() }: Props = $props();

	const years = Array(11)
		.fill(0)
		.map((_, idx) => ({
			label: `${2020 + idx}`,
			value: `${2020 + idx}`
		}));
	const months = Array(12)
		.fill(0)
		.map((_, idx) => `${idx + 1}`);
</script>

<div class="flex space-x-4">
	<div class="w-[100px]">
		<SimpleSelect items={years} bind:value={year} />
	</div>
	<div class="flex space-x-1">
		{#each months as m}
			<Button
				class="w-5"
				variant={m === month ? 'default' : 'secondary'}
				onclick={() => (month = m)}>{m}</Button
			>
		{/each}
	</div>
</div>
