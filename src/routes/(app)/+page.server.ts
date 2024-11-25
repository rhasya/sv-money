import { redirect } from '@sveltejs/kit';

export const actions = {
	logout: async function ({ cookies, locals }) {
		cookies.delete('token', { path: '/' });
		locals.user = null;
		redirect(303, '/');
	}
};
