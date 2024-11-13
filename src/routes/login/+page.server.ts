import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';

const loginForm = z.object({
	username: z.string().min(1).max(20),
	password: z.string().min(1).max(20)
});

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const input = Object.fromEntries(formData.entries());
		const { data, success } = loginForm.safeParse(input);
		if (!success) {
			return fail(401, { errorMessage: 'Wrong input.', username: input.username });
		}

		if (data.username !== 'snow' || data.password !== 'snow01!') {
			return fail(401, { errorMessage: 'Wrong username or password.', username: data.username });
		}

		redirect(303, '/');
	}
};
