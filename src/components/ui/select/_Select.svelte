<script lang="ts">
	import { Select, type SelectRootProps } from 'bits-ui';

	let {
		value = $bindable(),
		children
	}: Omit<SelectRootProps, 'value' | 'type'> & {
		value?: string;
	} = $props();
</script>

<Select.Root type="single" allowDeselect={false} bind:value>
	{@render children?.()}
</Select.Root>
