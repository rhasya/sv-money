import type { SelectRootProps } from 'bits-ui';

export { default as Select } from './_Select.svelte';
export { default as SelectContent } from './_SelectContent.svelte';
export { default as SelectTrigger } from './_SelectTrigger.svelte';
export { default as SelectItem } from './_SelectItem.svelte';

type SelectProps = Omit<SelectRootProps, 'value' | 'type'> & {
	value?: string;
	onValueChange?: (v: string) => void;
};

export { type SelectProps };
