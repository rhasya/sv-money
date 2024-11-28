import { jwtVerify, SignJWT } from 'jose';
import { env } from '$env/dynamic/private';

type Claim = {
	username: string;
};

const secret = new TextEncoder().encode(env.SECRET!);

export async function createToken(claim: Claim) {
	return await new SignJWT(claim)
		.setProtectedHeader({ alg: 'HS256' })
		.setIssuedAt()
		.setIssuer('issuer')
		.setAudience('audience')
		.setExpirationTime('24h')
		.sign(secret);
}

export async function verifyToken(token: string) {
	try {
		const { payload } = await jwtVerify<Claim>(token, secret, {
			issuer: 'issuer',
			audience: 'audience'
		});

		return { username: payload.username };
	} catch {
		return null;
	}
}
