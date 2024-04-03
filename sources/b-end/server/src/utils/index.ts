import { compareSync, hashSync } from "bcrypt";
import { SignJWT, jwtVerify } from "jose";

export type JwtPayload = {
	id: number;
};

const secretKey = new TextEncoder().encode("this-is-not-safe-at-all");

export const hashPlaintext = (plaintext: string): string =>
	hashSync(plaintext, 10);

export const comparePlaintextWithHash = (
	plaintext: string,
	hash: string,
): boolean => compareSync(plaintext, hash);

export const signPayload = (payload: JwtPayload): Promise<string> => {
	const jwt = new SignJWT(payload);

	return jwt
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("1h")
		.sign(secretKey);
};

export const readToken = <T>(token: string) => {
	return jwtVerify<T>(token, secretKey);
};
