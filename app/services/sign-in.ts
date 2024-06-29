import bcrypt from 'bcrypt'
import { User } from '~/types/user'
import { type SignInErrorState } from '~/validation/sign-in'

/**
 * Validates the user in the sign-in form process.
 * @param {User} user The user.
 * @param {string} password The password.
 * @returns {Promise<SignInErrorState>} The error state.
 */
export default async function validateUser(
	user: User,
	password: string,
): Promise<SignInErrorState> {
	if (!user || !(await bcrypt.compare(password, user.password))) {
		return {
			emailErrors: [],
			passwordErrors: [],
			invalidCredentials: true,
		} as SignInErrorState
	}
}
