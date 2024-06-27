import type { ActionFunctionArgs, MetaFunction } from '@remix-run/node'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'

export const meta: MetaFunction = () => {
	return [
		{ title: 'SPM | Sign in' },
		{
			name: 'Sign in page',
			content: 'Sign in page to access the admin panel',
		},
	]
}

export async function action({ request }: ActionFunctionArgs) {
	const body = await request.formData()

	const email = body.get('email')
	const password = body.get('password')

	console.log(email, password)

	return null
}

/**
 * Sign in page component.
 */
export default function Index() {
	return (
		<main>
			<div className="flex h-screen w-screen items-center justify-center">
				<div className="w-96 rounded bg-secondary p-6">
					<h1 className="text-3xl font-bold">Sign in</h1>
					<form className="mt-6 flex flex-col gap-4" method="post">
						<div>
							<Label htmlFor="email">Email</Label>
							<Input
								className="mt-1"
								name="email"
								id="email"
								type="text"
								placeholder="Email..."
								autoComplete="email"
							/>
						</div>
						<div>
							<Label htmlFor="password">Password</Label>
							<Input
								className="mt-1"
								name="password"
								id="password"
								type="password"
								placeholder="Password..."
								autoComplete="current-password"
							/>
						</div>
						<Button className="mt-3" type="submit">
							Submit
						</Button>
					</form>
				</div>
			</div>
		</main>
	)
}
