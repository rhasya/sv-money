import { updateTransaction } from '$lib/server/service/transactionService.js';
import { error, json } from '@sveltejs/kit';
import { z } from 'zod';

export async function PUT({ request, params }) {
	const { id } = params;
	const { data: transactionId, success } = z.number().safeParse(id);
	if (!success) {
		error(404);
	}

	const input = await request.json();
	await updateTransaction({ ...input, id: transactionId });
	return json({});
}
