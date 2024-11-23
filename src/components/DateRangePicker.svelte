<script lang="ts">
	import { compareAsc } from 'date-fns';

	type DateRangePickerProps = {
		fromDate?: string | null;
		toDate?: string | null;
	};

	let { fromDate = $bindable(), toDate = $bindable() }: DateRangePickerProps = $props();

	export function getValid() {
		if (!fromDate || !toDate || compareAsc(fromDate, toDate) > 0) {
			return false;
		}
		return true;
	}
</script>

<div>
	<input type="date" class="border-primary h-9 rounded border px-1" bind:value={fromDate} /> -
	<input type="date" class="border-primary h-9 rounded border px-1" bind:value={toDate} />
</div>
