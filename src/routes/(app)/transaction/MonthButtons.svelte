<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { addMonths, endOfMonth, format, parse, startOfMonth } from 'date-fns';

	/* ----- INIT ----- */
	const duration = 3;
	const months = Array(duration)
		.fill(0)
		.map((_, idx) => format(addMonths(new Date(), idx - duration + 1), 'yy-MM'));

	/* ----- PROPS ----- */
	let {
		fromDate = $bindable(),
		toDate = $bindable(),
		onclick
	}: { fromDate?: string | null; toDate?: string | null; onclick?: () => void } = $props();

	/* ----- HANDLERS ----- */
	function handleClick(month: string) {
		const targetMonth = parse(month, 'yy-MM', new Date());
		fromDate = format(startOfMonth(targetMonth), 'yyyy-MM-dd');
		toDate = format(endOfMonth(targetMonth), 'yyyy-MM-dd');

		onclick?.();
	}
</script>

{#each months as month}
	<Button variant="secondary" onclick={handleClick.bind(null, month)}>{month}</Button>
{/each}
