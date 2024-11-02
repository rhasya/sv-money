import { sql } from 'drizzle-orm';
import { integer, real, pgTable, text, serial, timestamp } from 'drizzle-orm/pg-core';

export const account = pgTable('account', {
	id: serial('id').primaryKey(),
	name: text('name').unique(),
	typeId: integer('type_id').notNull(),
	category: text('category')
});

export const transaction = pgTable('transaction', {
	id: serial('id').primaryKey(),
	tdate: text('tdate'),
	title: text('title'),
	leftAccountId: integer('left_account_id')
		.notNull()
		.references(() => account.id),
	rightAccountId: integer('right_account_id')
		.notNull()
		.references(() => account.id),
	amount: real('amount').default(0),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
	modifiedAt: timestamp('modified_at', { withTimezone: true })
		.defaultNow()
		.$onUpdate(() => sql`(CURRENT_TIMESTAMP)`)
});
