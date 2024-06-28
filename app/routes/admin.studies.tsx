import { type MetaFunction } from '@remix-run/react'

export const meta: MetaFunction = () => {
	return [
		{ title: 'SPM | Admin | Studies' },
		{
			name: 'Admin studies page',
			content: 'Admin studies page to manage studies',
		},
	]
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
