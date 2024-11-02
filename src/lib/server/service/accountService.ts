import { eq } from 'drizzle-orm';
import { db } from '../db';
import { account } from '../db/schema-pg';

export async function getAccounts() {
	return await db.select().from(account);
}

export async function createAccount(a: typeof account.$inferInsert) {
	return await db.insert(account).values({ ...a });
}

export async function deleteAccount(id: number) {
	return await db.delete(account).where(eq(account.id, id));
}
