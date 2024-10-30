import { sql } from 'drizzle-orm';
import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
	id: integer('id').primaryKey(),
	age: integer('age')
});

export const account = sqliteTable('account', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').unique(),
	type: text('type').notNull(),
	category: text('category')
});

export const transaction = sqliteTable('transaction', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	tdate: text('tdate'),
	title: text('name'),
	leftAccountId: integer('left_account_id')
		.notNull()
		.references(() => account.id),
	rightAccountId: integer('right_account_id')
		.notNull()
		.references(() => account.id),
	amount: real('amount').default(0),
	createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(CURRENT_TIMESTAMP)`),
	modifiedAt: integer('modified_at', { mode: 'timestamp' })
		.default(sql`(CURRENT_TIMESTAMP)`)
		.$onUpdate(() => sql`(CURRENT_TIMESTAMP)`)
});
