import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons'
import {
	ActionFunctionArgs,
	json,
	redirect,
	type LoaderFunctionArgs,
} from '@remix-run/node'
import { useFetcher, useLoaderData, type MetaFunction } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { Button } from '~/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '~/components/ui/dialog'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '~/components/ui/table'
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

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData()
	const studyId = formData.get('studyId') as string

	await prisma.study.delete({
		where: {
			id: studyId,
		},
	})

	const studies = await prisma.study.findMany()

	return json({ studies })
}

/**
 * Admin studies page component.
 */
export default function Index() {
	const initialData = useLoaderData<typeof loader>()
	const [data, setData] = useState(initialData)
	let fetcher = useFetcher()

	useEffect(() => {
		if (fetcher.data) {
			setData(fetcher.data as typeof data)
		}
	}, [fetcher.data])

	return (
		<main>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[50px]">ID</TableHead>
						<TableHead>Name</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.studies.map((study, index) => (
						<TableRow key={index}>
							<TableCell>{index}</TableCell>
							<TableCell>{study.name}</TableCell>
							<TableCell className="flex gap-1">
								<div className="flex h-6 w-6 cursor-pointer items-center justify-center rounded bg-orange-500 hover:brightness-90">
									<Pencil1Icon className="text-white" />
								</div>
								<div className="flex h-6 w-6 cursor-pointer items-center justify-center rounded bg-red-500 hover:brightness-90">
									<Dialog>
										<DialogTrigger>
											<TrashIcon className="text-white" />
										</DialogTrigger>
										<DialogContent>
											<DialogHeader>
												<DialogTitle>Warning</DialogTitle>
												<DialogDescription>
													You are going to delete the study{' '}
													<em>{study.name}</em>. Are you sure?
												</DialogDescription>
											</DialogHeader>
											<fetcher.Form method="post">
												<input type="hidden" name="studyId" value={study.id} />
												<Button type="submit" variant="destructive">
													Delete
												</Button>
											</fetcher.Form>
										</DialogContent>
									</Dialog>
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</main>
	)
}
