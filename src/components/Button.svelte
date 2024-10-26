<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { clsx as cx } from 'clsx';

	interface Props extends Omit<HTMLButtonAttributes, 'class'> {
		variant?: 'primary' | 'secondary';
	}

	const { children, variant = 'primary', ...props }: Props = $props();
</script>

<button
	{...props}
	class={cx([
		'h-9 rounded border px-3 text-sm font-medium transition-colors',
		'disabled:pointer-events-none disabled:opacity-60',
		variant === 'primary' && 'hover:bg-primary/90 border-transparent bg-primary text-primary-fg',
		variant === 'secondary' && 'hover:bg-primary/20 text-secondary-fg bg-secondary border-primary'
	])}>{@render children?.()}</button
>
