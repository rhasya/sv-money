import { eq } from 'drizzle-orm';
import { db } from '../db';
import { transaction } from '../db/schema';

export async function getTransactions(id: number) {
	// LEFT
	const left = await db.select().from(transaction).where(eq(transaction.leftAccountId, id));
	// RIGHT
	const right = await db.select().from(transaction).where(eq(transaction.rightAccountId, id));
}
