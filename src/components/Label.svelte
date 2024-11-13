<script lang="ts">
	import { cx } from 'class-variance-authority';
	import type { HTMLLabelAttributes } from 'svelte/elements';
	const { children, class: className }: HTMLLabelAttributes = $props();
</script>

<label class={cx('text-sm font-medium', className)}>{@render children?.()}</label>
