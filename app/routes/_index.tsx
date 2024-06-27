import type { MetaFunction } from '@remix-run/node'
import { Button } from '~/components/ui/button'

export const meta: MetaFunction = () => {
	return [
		{ title: 'SPM' },
		{
			name: 'Personal web',
			content: "Welcome to Sergio Peña Muñoz's personal web 🙋‍♂️💻",
		},
	]
}

/**
 * Home page component.
 */
export default function Index() {
	return (
		<main>
			<Button>Shadcn/ui installed</Button>
		</main>
	)
}
