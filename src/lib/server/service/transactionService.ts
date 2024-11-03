import { eq, or } from 'drizzle-orm';
import { db } from '../db';
import { transaction } from '../db/schema-pg';

export async function getTransactions(id?: number) {
	if (id) {
		return await db
			.select()
			.from(transaction)
			.where(or(eq(transaction.leftAccountId, id), eq(transaction.rightAccountId, id)));
	} else {
		return await db.select().from(transaction);
	}
}

export async function createTransaction(t: typeof transaction.$inferInsert) {
	await db.insert(transaction).values(t);
}

export async function updateTransaction(t: typeof transaction.$inferInsert) {
	await db
		.update(transaction)
		.set({
			tdate: t.tdate,
			title: t.title,
			leftAccountId: t.leftAccountId,
			rightAccountId: t.rightAccountId,
			amount: t.amount
		})
		.where(eq(transaction.id, t.id!));
}
