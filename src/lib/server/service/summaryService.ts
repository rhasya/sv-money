import { CalendarDate, endOfMonth } from '@internationalized/date';
import { and, asc, between, eq, sql } from 'drizzle-orm';
import { db } from '../db';
import { account, transaction } from '../db/schema-pg';

export async function getMonthSummary(year: number, month: number) {
	const start = new CalendarDate(year, month, 1);
	const end = endOfMonth(start);

	const incomes = await db
		.select({
			id: account.id,
			name: account.name,
			seq: account.seq,
			amount: sql<string>`coalesce(sum(${transaction.amount}),0)`
		})
		.from(account)
		.leftJoin(
			transaction,
			and(
				eq(transaction.rightAccountId, account.id),
				between(transaction.tdate, start.toString(), end.toString())
			)
		)
		.where(eq(account.typeId, 4))
		.groupBy(account.id, account.name, account.seq)
		.orderBy(asc(account.seq), asc(account.id));

	const expenses = await db
		.select({
			id: account.id,
			name: account.name,
			seq: account.seq,
			amount: sql<string>`coalesce(sum(${transaction.amount}),0)`
		})
		.from(account)
		.leftJoin(
			transaction,
			and(
				eq(transaction.leftAccountId, account.id),
				between(transaction.tdate, start.toString(), end.toString())
			)
		)
		.where(eq(account.typeId, 5))
		.groupBy(account.id, account.name, account.seq)
		.orderBy(asc(account.seq), asc(account.id));

	return { incomes, expenses };
}
