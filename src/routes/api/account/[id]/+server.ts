import { deleteAccount } from '$lib/server/service/accountService';
import { error, type RequestHandler } from '@sveltejs/kit';
import { z } from 'zod';

export const DELETE: RequestHandler = async ({ params }) => {
	try {
		const id = z.coerce.number().parse(params.id);
		await deleteAccount(id);
		return new Response('', { status: 200 });
	} catch (e) {
		console.log(e);
		error(400);
	}
};
