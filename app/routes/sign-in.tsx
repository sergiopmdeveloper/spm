import { ReloadIcon } from '@radix-ui/react-icons'
import {
	json,
	type ActionFunctionArgs,
	type MetaFunction,
} from '@remix-run/node'
import { Form, redirect, useActionData, useNavigation } from '@remix-run/react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import prisma from '~/lib/prisma'
import validateUser from '~/services/sign-in'
import { validateSignInData } from '~/validation/sign-in'

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
	const email = body.get('email') as string
	const password = body.get('password') as string

	const dataErrors = validateSignInData(email, password)

	if (dataErrors) {
		return json(dataErrors)
	}

	const user = await prisma.user.findUnique({
		where: { email: email },
	})

	const invalidCredentials = await validateUser(user, password)

	if (invalidCredentials) {
		return json(invalidCredentials)
	}

	return redirect('/admin/studies')
}

/**
 * Sign in page component.
 */
export default function Index() {
	const actionData = useActionData<typeof action>()
	const { state } = useNavigation()
	const submitting = state === 'submitting'

	return (
		<main>
			<div className="flex h-screen w-screen items-center justify-center">
				<div className="flex flex-col">
					{actionData?.invalidCredentials && (
						<span className="text-right text-sm text-red-500">
							Invalid credentials
						</span>
					)}
					<div className="w-96 rounded bg-secondary p-6">
						<h1 className="text-3xl font-bold">Sign in</h1>
						<Form className="mt-6 flex flex-col gap-4" method="post">
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
								{actionData?.emailErrors && (
									<span className="text-xs text-red-500">
										{actionData.emailErrors[0]}
									</span>
								)}
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
								{actionData?.passwordErrors && (
									<span className="text-xs text-red-500">
										{actionData.passwordErrors[0]}
									</span>
								)}
							</div>
							<Button
								className="mt-3 flex gap-2"
								type="submit"
								disabled={submitting}
							>
								{submitting ? 'Submitting' : 'Submit'}
								{submitting && <ReloadIcon className="animate-spin" />}
							</Button>
						</Form>
					</div>
				</div>
			</div>
		</main>
	)
}
