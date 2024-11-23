import { redirect } from '@sveltejs/kit';
import { getAccounts } from '$lib/server/service/accountService.js';
import { getTransactions } from '$lib/server/service/transactionService.js';
import { format, startOfMonth } from 'date-fns';

export async function load({ url }) {
	const fromDate = url.searchParams.get('fromDate');
	const toDate = url.searchParams.get('toDate');

	if (!fromDate || !toDate) {
		const today = new Date();
		redirect(
			303,
			`/transaction?fromDate=${format(startOfMonth(today), 'yyyy-MM-dd')}&toDate=${format(today, 'yyyy-MM-dd')}`
		);
	}

	const transactions = await getTransactions(fromDate, toDate);
	const tWithState = transactions.map((t) => ({ ...t, state: 'NORMAL' }));

	const accounts = await getAccounts();
	const leftAccounts = accounts.filter((a) => [1, 2, 3, 5].includes(a.typeId));
	const rightAccounts = accounts.filter((a) => [1, 2, 3, 4].includes(a.typeId));

	return { transactions: tWithState, leftAccounts, rightAccounts, fromDate, toDate };
}
