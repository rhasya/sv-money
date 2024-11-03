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
	<input type="date" class="date" bind:value={fromDate} /> -
	<input type="date" class="date" bind:value={toDate} />
</div>

<style lang="postcss">
	.date {
		@apply h-9 rounded border border-primary px-1;
	}
</style>
