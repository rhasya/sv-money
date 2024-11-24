import { getMonthSummary } from '$lib/server/service/summaryService.js';
import { getLocalTimeZone, today } from '@internationalized/date';
import { redirect } from '@sveltejs/kit';

type Summary = {
	id: number;
	name: string | null;
	seq: number | null;
	amount: string | null;
};

export async function load({
	url
}): Promise<{ year?: string; month?: string; incomes: Summary[]; expenses: Summary[] }> {
	const year = url.searchParams.get('year');
	const month = url.searchParams.get('month');

	const now = today(getLocalTimeZone());

	if (!year || !month) {
		redirect(303, `/summary?year=${now.year}&month=${now.month}`);
	}

	const { incomes, expenses } = await getMonthSummary(parseInt(year), parseInt(month));
	return { year, month, incomes, expenses };
}
