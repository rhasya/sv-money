import { eq } from 'drizzle-orm';
import { db } from '../db';
import { account } from '../db/schema';

export async function getAccounts() {
	return db.select().from(account);
}

export async function createAccount(a: typeof account.$inferInsert) {
	return db.insert(account).values({ ...a });
}

export async function deleteAccount(id: number) {
	return db.delete(account).where(eq(account.id, id));
}
