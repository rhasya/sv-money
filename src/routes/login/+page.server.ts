import { env } from '$env/dynamic/private';
import { createToken } from '$lib/server/auth/index.js';
import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';

const loginForm = z.object({
	username: z.string().min(1).max(20),
	password: z.string().min(1).max(20)
});

export const actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const input = Object.fromEntries(formData.entries());
		const { data, success } = loginForm.safeParse(input);

		if (!success) {
			return fail(401, { errorMessage: 'Wrong input.', username: input.username });
		}

		if (data.username !== env.SYSTEM_USERNAME || data.password !== env.SYSTEM_PASSWORD) {
			return fail(401, { errorMessage: 'Wrong username or password.', username: data.username });
		}

		const token = await createToken({ username: env.SYSTEM_USERNAME });
		cookies.set('token', token, { path: '/', secure: false, httpOnly: true });
		redirect(303, '/');
	}
};
