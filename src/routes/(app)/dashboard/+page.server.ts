import { db } from '$lib/server/db/index.js';
import { account, transaction } from '$lib/server/db/schema-pg.js';
import { redirect } from '@sveltejs/kit';
import { endOfMonth, format } from 'date-fns';
import { and, between, eq, inArray, lt, sql } from 'drizzle-orm';
import { z } from 'zod';

export async function load({ url }) {
	const yearInput = url.searchParams.get('year');
	const monthInput = url.searchParams.get('month');

	if (!yearInput || !monthInput) {
		const now = new Date();
		redirect(303, `/dashboard?year=${now.getFullYear()}&month=${now.getMonth() + 1}`);
	}

	const numberParser = z.coerce.number();

	const { data: year } = numberParser.safeParse(yearInput);
	const { data: month } = numberParser.safeParse(monthInput);
	const currentMonth = new Date(year!, month! - 1, 1);

	const sqLastInc = db
		.select({
			accountId: account.id,
			lastIncrease: sql`${transaction.amount}`.mapWith(Number).as('lastIncrease'),
			lastDecrease: sql`0`.mapWith(Number).as('lastDecrease'),
			increase: sql`0`.mapWith(Number).as('increase'),
			decrease: sql`0`.mapWith(Number).as('decrease')
		})
		.from(account)
		.leftJoin(transaction, eq(account.id, transaction.leftAccountId))
		.where(
			and(
				inArray(account.typeId, [2, 3]),
				lt(transaction.tdate, format(currentMonth, 'yyyy-MM-dd'))
			)
		);
	const sqLastDec = db
		.select({
			accountId: account.id,
			lastIncrease: sql`0`.mapWith(Number),
			lastDecrease: sql`-${transaction.amount}`.mapWith(Number),
			increase: sql`0`.mapWith(Number),
			decrease: sql`0`.mapWith(Number)
		})
		.from(account)
		.leftJoin(transaction, eq(account.id, transaction.rightAccountId))
		.where(
			and(
				inArray(account.typeId, [2, 3]),
				lt(transaction.tdate, format(currentMonth, 'yyyy-MM-dd'))
			)
		);
	const sqInc = db
		.select({
			accountId: account.id,
			lastIncrease: sql`0`.mapWith(Number),
			lastDecrease: sql`0`.mapWith(Number),
			increase: sql`${transaction.amount}`.mapWith(Number),
			decrease: sql`0`.mapWith(Number)
		})
		.from(account)
		.leftJoin(transaction, eq(account.id, transaction.leftAccountId))
		.where(
			and(
				inArray(account.typeId, [2, 3]),
				between(
					transaction.tdate,
					format(currentMonth, 'yyyy-MM-dd'),
					format(endOfMonth(currentMonth), 'yyyy-MM-dd')
				)
			)
		);
	const sqDec = db
		.select({
			accountId: account.id,
			lastIncrease: sql`0`.mapWith(Number),
			lastDecrease: sql`0`.mapWith(Number),
			increase: sql`0`.mapWith(Number),
			decrease: sql`${transaction.amount}`.mapWith(Number)
		})
		.from(account)
		.leftJoin(transaction, eq(account.id, transaction.rightAccountId))
		.where(
			and(
				inArray(account.typeId, [2, 3]),
				between(
					transaction.tdate,
					format(currentMonth, 'yyyy-MM-dd'),
					format(endOfMonth(currentMonth), 'yyyy-MM-dd')
				)
			)
		);

	const sq = db.$with('sq').as(sqLastInc.unionAll(sqLastDec).unionAll(sqInc).unionAll(sqDec));
	const accounts = await db
		.with(sq)
		.select({
			accountId: sq.accountId,
			accountName: account.name,
			accountTypeId: account.typeId,
			lastMonth: sql`sum(${sq.lastIncrease}) + sum(${sq.lastDecrease})`.mapWith(Number),
			increase: sql`sum(${sq.increase})`.mapWith(Number),
			decrease: sql`sum(${sq.decrease})`.mapWith(Number)
		})
		.from(sq)
		.leftJoin(account, eq(sq.accountId, account.id))
		.groupBy(sq.accountId, account.name, account.typeId);

	// console.log(accounts);

	return {
		year: yearInput,
		month: monthInput,
		accounts
	};
}
