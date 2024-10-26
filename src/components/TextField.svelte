<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	const props: Omit<HTMLInputAttributes, 'class'> = $props();
</script>

<input
	{...props}
	class="w-full border border-black p-0.5 outline-none transition-colors focus:border-primary"
/>
