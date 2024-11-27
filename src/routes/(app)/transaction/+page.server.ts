import { getAccounts } from '$lib/server/service/accountService.js';
import {
	createTransaction,
	deleteTransaction,
	getTransactions,
	updateTransaction
} from '$lib/server/service/transactionService.js';
import { redirect } from '@sveltejs/kit';
import { format, startOfMonth } from 'date-fns';
import { z } from 'zod';

const schema = z.object({
	id: z
		.string()
		.transform((arg) => (arg === '' ? undefined : arg))
		.pipe(z.union([z.undefined(), z.coerce.number()])),
	tdate: z.string().date(),
	seq: z
		.string()
		.transform((arg) => (arg === '' ? null : arg))
		.pipe(z.coerce.number().nullable()),
	title: z.string().min(1).max(100),
	leftAccountId: z.coerce.number(),
	rightAccountId: z.coerce.number(),
	amount: z.string().transform((arg) => arg.replaceAll(',', ''))
});

export async function load({ url }) {
	const fromDate = url.searchParams.get('fromDate');
	const toDate = url.searchParams.get('toDate');
	const keyword = url.searchParams.get('keyword');

	if (!fromDate || !toDate) {
		const today = new Date();
		redirect(
			303,
			`/transaction?fromDate=${format(startOfMonth(today), 'yyyy-MM-dd')}&toDate=${format(today, 'yyyy-MM-dd')}&keyword=${keyword}`
		);
	}

	const transactions = await getTransactions(fromDate, toDate, keyword);
	const tWithState = transactions.map((t) => ({ ...t, state: 'NORMAL' }));

	const accounts = await getAccounts();
	const leftAccounts = accounts.filter((a) => [1, 2, 3, 5].includes(a.typeId));
	const rightAccounts = accounts.filter((a) => [1, 2, 3, 4].includes(a.typeId));

	return { transactions: tWithState, leftAccounts, rightAccounts, fromDate, toDate, keyword };
}

export const actions = {
	post: async ({ request }): Promise<{ error?: string; lastAddedDate?: string }> => {
		const formData = await request.formData();
		const input = Object.fromEntries(formData);
		console.log(input);

		const { data: transaction, error } = schema.safeParse(input);
		if (error) {
			return {
				error: error.errors[0].message
			};
		}

		// Save Transaction
		if (transaction.id) {
			await updateTransaction(transaction);
		} else {
			await createTransaction(transaction);
		}

		return { lastAddedDate: transaction.tdate };
	},
	delete: async function ({ request }) {
		const formData = await request.formData();
		const { data: id, success } = z.coerce.number().safeParse(formData.get('id'));
		if (success) {
			await deleteTransaction(id);
		}
	}
};
