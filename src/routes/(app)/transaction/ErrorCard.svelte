<script lang="ts">
	import { X } from 'lucide-svelte';
	import type { Snippet } from 'svelte';

	const { children, onclick }: { children?: Snippet<[]>; onclick?: () => void } = $props();
</script>

<div class="mt-4 flex w-full justify-between rounded bg-red-200 px-4 py-2">
	<span>{@render children?.()}</span>
	<button type="button" {onclick}><X /></button>
</div>
