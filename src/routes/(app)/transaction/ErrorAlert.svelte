<script lang="ts">
	import { Alert, AlertDescription } from '$lib/components/ui/alert';
	import type { Snippet } from 'svelte';

	const { children, onclick }: { children?: Snippet; onclick?: () => void } = $props();
</script>

<div class="mt-4">
	<Alert variant="destructive">
		<AlertDescription>{@render children?.()}</AlertDescription>
	</Alert>
</div>
