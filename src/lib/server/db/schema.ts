import { sql } from 'drizzle-orm';
import { integer, numeric, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
	id: integer('id').primaryKey(),
	age: integer('age')
});

export const account = sqliteTable('account', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').unique(),
	typeId: integer('type_id').notNull(),
	category: text('category')
});

export const transaction = sqliteTable('transaction', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	tdate: text('tdate'),
	title: text('title'),
	leftAccountId: integer('left_account_id')
		.notNull()
		.references(() => account.id),
	rightAccountId: integer('right_account_id')
		.notNull()
		.references(() => account.id),
	amount: numeric('amount').default('0'),
	createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(CURRENT_TIMESTAMP)`),
	modifiedAt: integer('modified_at', { mode: 'timestamp' })
		.default(sql`(CURRENT_TIMESTAMP)`)
		.$onUpdate(() => sql`(CURRENT_TIMESTAMP)`)
});
