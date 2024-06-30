import { json, redirect, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData, type MetaFunction } from '@remix-run/react'
import prisma from '~/lib/prisma'
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

	const studies = await prisma.study.findMany()

	return json({ studies })
}

/**
 * Admin studies page component.
 */
export default function Index() {
	const data = useLoaderData<typeof loader>()

	return (
		<main>
			<h1>Admin studies page</h1>
			{data && (
				<ul>
					{data.studies.map((study) => (
						<li key={study.id}>{study.name}</li>
					))}
				</ul>
			)}
		</main>
	)
}
