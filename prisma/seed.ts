import prisma from '~/lib/prisma'

/**
 * Content to seed the database.
 */
export const studies = {
	name: 'Double degree in Advertising and PR with Marketing',
	school: 'ESIC Business & Marketing School',
	description:
		'Study of the branding of a company and its positioning in the market. Research, briefing and creation of advertising and marketing plans. Execution of different digital advertising and social media actions.',
	startDate: new Date('2016-09-01T00:00:00.000+00:00'),
	endDate: new Date('2021-07-01T00:00:00.000+00:00'),
}

/**
 * Seed the database.
 */
async function main() {
	await prisma.study.create({
		data: studies,
	})
}

main()
	.catch((e) => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
