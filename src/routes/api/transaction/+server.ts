import { db } from '$lib/server/db/index.js';
import { transaction } from '$lib/server/db/schema-pg.js';
import { json } from '@sveltejs/kit';
import { desc, eq } from 'drizzle-orm';
import { z } from 'zod';

export async function GET({ request }) {
	const { searchParams } = new URL(request.url);
	const { data: title } = z.string().safeParse(searchParams.get('title'));

	if (title) {
		const result = await db
			.select({
				leftAccountId: transaction.leftAccountId,
				rightAccountId: transaction.rightAccountId
			})
			.from(transaction)
			.where(eq(transaction.title, title))
			.orderBy(desc(transaction.tdate));

		return json({ result: result[0] });
	}

	return json({ result: {} });
}
