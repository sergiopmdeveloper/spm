import type { MetaFunction } from '@remix-run/node'

export const meta: MetaFunction = () => {
	return [
		{ title: 'SPM' },
		{
			name: 'Personal web',
			content: "Welcome to Sergio Peña Muñoz's personal web 🙋‍♂️💻",
		},
	]
}

export default function Index() {
	return (
		<main>
			<h1 className="text-xl font-bold">Hello world!</h1>
		</main>
	)
}
