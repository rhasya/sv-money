import { asc, eq } from 'drizzle-orm';
import { db } from '../db';
import { account } from '../db/schema-pg';

export async function getAccounts() {
	return db.select().from(account).orderBy(asc(account.seq));
}

export async function createAccount(a: typeof account.$inferInsert) {
	return db.insert(account).values({ ...a });
}

export async function updateAccount(a: typeof account.$inferInsert) {
	return db
		.update(account)
		.set({
			name: a.name,
			typeId: a.typeId,
			category: a.category,
			seq: a.seq
		})
		.where(eq(account.id, a.id!));
}

export async function deleteAccount(id: number) {
	return await db.delete(account).where(eq(account.id, id));
}
