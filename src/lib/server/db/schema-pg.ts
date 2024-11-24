import { date, integer, pgTable, numeric, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const account = pgTable('account', {
	id: serial('id').primaryKey(),
	name: text('name').unique(),
	typeId: integer('type_id').notNull(),
	category: text('category'),
	seq: integer('seq')
});

export const transaction = pgTable('transaction', {
	id: serial('id').primaryKey(),
	tdate: date('tdate'),
	title: text('title'),
	leftAccountId: integer('left_account_id')
		.notNull()
		.references(() => account.id),
	rightAccountId: integer('right_account_id')
		.notNull()
		.references(() => account.id),
	amount: numeric('amount', { precision: 25, scale: 5 }).default('0'),
	seq: integer('seq'),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
	modifiedAt: timestamp('modified_at', { withTimezone: true })
		.defaultNow()
		.$onUpdate(() => new Date())
});
