import { accountTypes } from '$lib/common/consts.js';
import { createAccount, getAccounts } from '$lib/server/service/accountService';
import { z } from 'zod';

const acc = accountTypes.map((a) => a.id);

const accountValid = z.object({
	name: z.string(),
	typeId: z.coerce.number().refine((val) => acc.includes(val), { message: 'Account type error' }),
	category: z.union([z.enum(['은행', '신용카드']), z.string()])
});

export async function load() {
	const accounts = await getAccounts();
	return { accounts };
}

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const input = Object.fromEntries(formData);

		const { data, error } = accountValid.safeParse(input);
		if (error) {
			console.log(error.errors);
			return { error: error.errors[0].message };
		}

		await createAccount(data);
		return {};
	}
};
