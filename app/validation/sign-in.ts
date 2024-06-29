import { z } from 'zod'

/**
 * Validates the sign-in form data.
 * @param {string} email - The email.
 * @param {string} password - The password.
 * @returns {SignInErrorState} The error state.
 */
export function validateSignInData(
	email: string,
	password: string,
): SignInErrorState {
	const validation = signInSchema.safeParse({
		email: email,
		password: password,
	})

	if (!validation.success) {
		return {
			emailErrors: validation.error.flatten().fieldErrors.email ?? [],
			passwordErrors: validation.error.flatten().fieldErrors.password ?? [],
			invalidCredentials: false,
		} as SignInErrorState
	}
}

export const signInSchema = z.object({
	email: z.string().min(1, 'Required'),
	password: z.string().min(1, 'Required'),
})

export type SignInErrorState =
	| {
			emailErrors: string[]
			passwordErrors: string[]
			invalidCredentials: boolean
	  }
	| undefined
