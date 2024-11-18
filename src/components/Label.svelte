<script lang="ts">
	import { cx } from 'class-variance-authority';
	import type { HTMLLabelAttributes } from 'svelte/elements';
	const { children, class: className, ...props }: HTMLLabelAttributes = $props();
</script>

<label class={cx('text-sm font-medium', className)} {...props}>{@render children?.()}</label>
