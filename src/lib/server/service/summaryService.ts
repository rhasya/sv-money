import { CalendarDate, endOfMonth } from '@internationalized/date';
import { and, asc, between, eq, sum } from 'drizzle-orm';
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
			amount: sum(transaction.amount)
		})
		.from(transaction)
		.innerJoin(account, eq(account.id, transaction.rightAccountId))
		.where(and(eq(account.typeId, 4), between(transaction.tdate, start.toString(), end.toString())))
		.groupBy(account.id, account.name, account.seq)
		.orderBy(asc(account.seq), asc(account.id));

	const expenses = await db
		.select({
			id: account.id,
			name: account.name,
			seq: account.seq,
			amount: sum(transaction.amount)
		})
		.from(transaction)
		.innerJoin(account, eq(account.id, transaction.leftAccountId))
		.where(and(eq(account.typeId, 5), between(transaction.tdate, start.toString(), end.toString())))
		.groupBy(account.id, account.name, account.seq)
		.orderBy(asc(account.seq), asc(account.id));

	return { incomes, expenses };
}
