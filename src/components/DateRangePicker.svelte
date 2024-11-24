<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { compareAsc } from 'date-fns';

	type DateRangePickerProps = {
		fromDate?: string | null;
		toDate?: string | null;
	};

	let { fromDate = $bindable(), toDate = $bindable() }: DateRangePickerProps = $props();

	$effect(() => {
		if (fromDate && toDate && fromDate > toDate) {
			toDate = fromDate;
		}
	});

	export function getValid() {
		if (!fromDate || !toDate || compareAsc(fromDate, toDate) > 0) {
			return false;
		}
		return true;
	}
</script>

<div class="flex shrink-0 gap-1">
	<Input type="date" bind:value={fromDate} /> -
	<Input type="date" bind:value={toDate} />
</div>
