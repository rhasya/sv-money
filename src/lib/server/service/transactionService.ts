import { asc, between, eq } from 'drizzle-orm';
import { db } from '../db';
import { transaction } from '../db/schema-pg';

export async function getTransactions(fromDate: string | null, toDate: string | null) {
	if (!fromDate || !toDate) {
		return await db.select().from(transaction);
	}
	return await db
		.select()
		.from(transaction)
		.where(between(transaction.tdate, fromDate, toDate))
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
