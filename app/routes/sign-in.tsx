import { ReloadIcon } from '@radix-ui/react-icons'
import {
	json,
	type ActionFunctionArgs,
	type MetaFunction,
} from '@remix-run/node'
import { Form, useActionData, useNavigation } from '@remix-run/react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { signInSchema } from '~/validation/sign-in'

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

	const validatedFields = signInSchema.safeParse({
		email: email,
		password: password,
	})

	if (!validatedFields.success) {
		return json({
			emailError: validatedFields.error.flatten().fieldErrors.email ?? [],
			passwordError: validatedFields.error.flatten().fieldErrors.password ?? [],
			emailLastValue: email,
			passwordLastValue: password,
		})
	}

	return null
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
				<div className="w-96 rounded bg-secondary p-6">
					<h1 className="text-3xl font-bold">Sign in</h1>
					<Form className="mt-6 flex flex-col gap-4" method="post">
						<div>
							<Label htmlFor="email">Email</Label>
							<Input
								className="mt-1"
								name="email"
								id="email"
								defaultValue={
									typeof actionData?.emailLastValue === 'string'
										? actionData.emailLastValue
										: undefined
								}
								type="text"
								placeholder="Email..."
								autoComplete="email"
							/>
							{actionData?.emailError && (
								<span className="text-xs text-red-500">
									{actionData.emailError[0]}
								</span>
							)}
						</div>
						<div>
							<Label htmlFor="password">Password</Label>
							<Input
								className="mt-1"
								name="password"
								id="password"
								defaultValue={
									typeof actionData?.passwordLastValue === 'string'
										? actionData.passwordLastValue
										: undefined
								}
								type="password"
								placeholder="Password..."
								autoComplete="current-password"
							/>
							{actionData?.passwordError && (
								<span className="text-xs text-red-500">
									{actionData.passwordError[0]}
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
		</main>
	)
}
