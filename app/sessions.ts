import { createCookieSessionStorage } from '@remix-run/node'

const { getSession, commitSession, destroySession } =
	createCookieSessionStorage<SessionData, SessionFlashData>({
		cookie: {
			name: '__session',
			httpOnly: true,
			maxAge: 86400,
			path: '/',
			secrets: ['s3cret1'],
		},
	})

type SessionData = {
	userId: string
}

type SessionFlashData = {
	error: string
}

export { commitSession, destroySession, getSession }
