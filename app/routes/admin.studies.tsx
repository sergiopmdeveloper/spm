import { redirect, type LoaderFunctionArgs } from '@remix-run/node'
import { type MetaFunction } from '@remix-run/react'
import { commitSession, getSession } from '~/sessions'

export const meta: MetaFunction = () => {
	return [
		{ title: 'SPM | Admin | Studies' },
		{
			name: 'Admin studies page',
			content: 'Admin studies page to manage studies',
		},
	]
}

export async function loader({ request }: LoaderFunctionArgs) {
	const session = await getSession(request.headers.get('Cookie'))

	if (!session.get('userId')) {
		session.flash('error', 'Forbidden')

		return redirect('/sign-in?unauthenticated=true', {
			headers: {
				'Set-Cookie': await commitSession(session),
			},
		})
	}

	return null
}

/**
 * Admin studies page component.
 */
export default function Index() {
	return (
		<main>
			<h1>Admin studies page</h1>
		</main>
	)
}
