import { eq, or } from 'drizzle-orm';
import { db } from '../db';
import { transaction } from '../db/schema';

export async function getTransactions(id: number) {
	return db
		.select()
		.from(transaction)
		.where(or(eq(transaction.leftAccountId, id), eq(transaction.rightAccountId, id)));
}

export async function createTransaction(t: typeof transaction.$inferInsert) {
	await db.insert(transaction).values(t);
}
