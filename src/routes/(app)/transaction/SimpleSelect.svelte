<script lang="ts">
	type SimpleSelectProps = {
		items: { value: string; text: string }[];
		emptyLine?: boolean;
		class?: string;
		value?: string | number;
	};
	let { items, emptyLine = true, class: klass, value = $bindable() }: SimpleSelectProps = $props();
</script>

<select class={klass} bind:value>
	{#if emptyLine}
		<option></option>
	{/if}
	{#each items as item (item.value)}
		<option value={item.value}>{item.text}</option>
	{/each}
</select>
