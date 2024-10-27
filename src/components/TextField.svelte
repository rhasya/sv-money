<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	let { value = $bindable(), ...props }: Omit<HTMLInputAttributes, 'class'> = $props();
</script>

<input
	{...props}
	bind:value
	class="w-full border border-black p-0.5 text-base font-normal outline-none transition-colors focus:border-primary"
/>
