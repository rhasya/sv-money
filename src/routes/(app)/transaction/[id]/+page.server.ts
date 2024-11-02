import { getAccounts } from '$lib/server/service/accountService.js';
import { getTransactions } from '$lib/server/service/transactionService.js';

export async function load({ params }) {
	const { id } = params;

	const transactions = await getTransactions(parseInt(id));
	const tWithState = transactions.map((t) => ({ ...t, state: 'NORMAL' }));

	const accounts = await getAccounts();
	const leftAccounts = accounts.filter((a) => [1, 2, 3, 5].includes(a.typeId));
	const rightAccounts = accounts.filter((a) => [1, 2, 3, 4].includes(a.typeId));

	return { transactions: tWithState, leftAccounts, rightAccounts };
}
