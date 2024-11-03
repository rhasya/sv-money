<script lang="ts">
	import { clsx } from 'clsx';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLButtonAttributes, 'class'> {
		variant?: 'primary' | 'secondary' | 'warn';
	}

	const { children, variant = 'primary', ...props }: Props = $props();
</script>

<button
	{...props}
	class={clsx([
		'h-9 rounded border px-3 text-sm font-medium transition-colors',
		'disabled:pointer-events-none disabled:opacity-60',
		variant === 'primary' && 'border-transparent bg-primary text-primary-fg hover:bg-primary/90',
		variant === 'secondary' && 'border-primary bg-secondary text-secondary-fg hover:bg-primary/20',
		variant === 'warn' && 'bg-warn text-warn-fg hover:bg-warn/90 border-transparent'
	])}>{@render children?.()}</button
>
