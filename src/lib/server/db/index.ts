// import { drizzle } from 'drizzle-orm/libsql';
// import { createClient } from '@libsql/client';
import { env } from '$env/dynamic/private';
import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

// const client = createClient({ url: env.DATABASE_URL });
const client = new pg.Pool({
	connectionString: env.DATABASE_URL
});
export const db = drizzle(client);
