import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
	id: integer('id').primaryKey(),
	age: integer('age')
});

export const account = sqliteTable('account', {
	id: integer('id').primaryKey({ autoIncrement: true })
});
