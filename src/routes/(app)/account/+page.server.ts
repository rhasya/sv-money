import { fail } from '@sveltejs/kit';
import { z } from 'zod';
import {
	createAccount,
	deleteAccount,
	getAccounts,
	updateAccount
} from '$lib/server/service/accountService';

const nullableNumber = z
	.string()
	.transform((arg) => (arg === '' ? undefined : parseInt(arg)))
	.pipe(z.union([z.number(), z.undefined()]));

const accountForm = z.object({
	id: nullableNumber,
	name: z.string().min(1).max(100),
	typeId: z.enum(['1', '2', '3', '4', '5']).transform((arg) => parseInt(arg)),
	category: z.string().nullish(),
	sequence: nullableNumber
});

export async function load() {
	const accounts = await getAccounts();
	return { accounts };
}

export const actions = {
	post: async ({ request }) => {
		const formData = await request.formData();
		const input = Object.fromEntries(formData);
		console.log(input);

		const { data, error } = accountForm.safeParse(input);
		if (error) {
			console.error(error.errors);
			return fail(422, {
				error: error.errors.map(({ path, message }) => ({ [path[0]]: message }))
			});
		}

		if (data.id) {
			await updateAccount(data);
		} else {
			await createAccount(data);
		}
		return {};
	},
	delete: async ({ request }) => {
		const formData = await request.formData();
		const input = formData.get('accountId');

		if (input === '') {
			return fail(422);
		}
		const { data: accountId, success } = z.coerce.number().safeParse(input);
		console.log(accountId);
		if (!success) {
			return fail(422);
		}

		await deleteAccount(accountId);
	}
};
