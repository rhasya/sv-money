<script lang="ts">
	import type { HTMLLabelAttributes } from 'svelte/elements';
	const { children }: Omit<HTMLLabelAttributes, 'class'> = $props();
</script>

<label class="text-sm font-medium">{@render children?.()}</label>
