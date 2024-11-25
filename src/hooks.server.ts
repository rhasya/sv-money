import { verifyToken } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';

export async function handle({ event, resolve }) {
	if (event.url.pathname !== '/login') {
		// check cookie
		const token = event.cookies.get('token');
		// check token
		if (!token) {
			event.locals.user = null;
			redirect(303, '/login');
		}
		const user = await verifyToken(token);
		if (!user) {
			event.locals.user = null;
			redirect(303, '/login');
		}
		event.locals.user = user;
	}

	return await resolve(event);
}
