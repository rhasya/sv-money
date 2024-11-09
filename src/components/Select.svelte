<script lang="ts">
	import { Select, type WithoutChildren } from 'bits-ui';

	type Props = WithoutChildren<Select.RootProps> & {
		items: { value: string; label: string; disabled?: boolean }[];
	};

	let { items, type = 'single', value = $bindable(), ...props }: Props = $props();
</script>

<Select.Root {...props} bind:value>
	<Select.Trigger>{value}</Select.Trigger>
	<Select.Portal>
		<Select.Content>
			<Select.Viewport>
				{#each items ?? [] as item}
					<Select.Item disabled={item.disabled} value={item.value}>{item.label}</Select.Item>
				{/each}
			</Select.Viewport>
		</Select.Content>
	</Select.Portal>
</Select.Root>
