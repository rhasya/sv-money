import { accountTypes, categories } from '$lib/common/consts.js';
import { createAccount, getAccounts, updateAccount } from '$lib/server/service/accountService';
import { z } from 'zod';

const acc = accountTypes.map((a) => a.id);
const cat = categories.map((c) => c.code);

const accountValid = z.object({
	id: z.coerce.number().optional(),
	name: z.string(),
	typeId: z.coerce.number().refine((val) => acc.includes(val), { message: 'Account type error' }),
	category: z.string().refine((val) => !val || cat.includes(val), { message: 'Category error' }),
	seq: z.coerce.number().optional()
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

		if (data.id) {
			await updateAccount(data);
		} else {
			await createAccount(data);
		}
		return {};
	}
};
