<script lang="ts">
	import { Select, type SelectRootProps } from 'bits-ui';
	import type { SelectProps } from '.';

	let { value = $bindable(), children, ...props }: SelectProps = $props();
</script>

<Select.Root type="single" allowDeselect={false} bind:value {...props}>
	{@render children?.()}
</Select.Root>
