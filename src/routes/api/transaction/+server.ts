import { createTransaction } from '$lib/server/service/transactionService.js';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const input = await request.json();
	await createTransaction(input);

	return json({});
}
