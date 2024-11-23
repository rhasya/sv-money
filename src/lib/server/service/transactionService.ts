import { aliasedTable, and, asc, between, eq, getTableColumns, ilike, or } from 'drizzle-orm';
import { db } from '../db';
import { account, transaction } from '../db/schema-pg';

export async function getTransactions(
	fromDate: string,
	toDate: string,
	keyword: string | null = ''
) {
	if (!fromDate || !toDate) {
		return await db.select().from(transaction);
	}

	const likeKeyword = `%${keyword}%`;
	const la = aliasedTable(account, 'la');
	const ra = aliasedTable(account, 'ra');

	return await db
		.select({
			...getTableColumns(transaction)
		})
		.from(transaction)
		.leftJoin(la, eq(transaction.leftAccountId, la.id))
		.leftJoin(ra, eq(transaction.rightAccountId, ra.id))
		.where(
			and(
				between(transaction.tdate, fromDate, toDate),
				or(
					ilike(transaction.title, likeKeyword),
					ilike(la.name, likeKeyword),
					ilike(ra.name, likeKeyword)
				)
			)
		)
		.orderBy(asc(transaction.tdate), asc(transaction.seq), asc(transaction.id));
}

export async function createTransaction(t: typeof transaction.$inferInsert) {
	await db.insert(transaction).values(t);
}

export async function updateTransaction(t: typeof transaction.$inferInsert) {
	await db
		.update(transaction)
		.set({
			tdate: t.tdate,
			seq: t.seq,
			title: t.title,
			leftAccountId: t.leftAccountId,
			rightAccountId: t.rightAccountId,
			amount: t.amount
		})
		.where(eq(transaction.id, t.id!));
}

export async function deleteTransaction(id: number) {
	await db.delete(transaction).where(eq(transaction.id, id));
}
