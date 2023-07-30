'use client' // this declation enables the below component to be treated as a client componet
// i.e., it can access APIs from the client such as hooks, brower APIs, etc...
import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-hot-toast/headless'

export default function SignupPage() {
	const router = useRouter()
	const [buttonDisabled, setButtonDisabled] = React.useState(false)
	const [loading, setLoading] = React.useState(false)

	const [user, setUser] = React.useState({
		email: '',
		password: '',
	})

	React.useEffect(() => {
		if (user.email.length > 0 && user.password.length > 0) {
			setButtonDisabled(false)
		} else {
			setButtonDisabled(true)
		}
	}, [user])

	const onLogin = async () => {
		try {
			setLoading(false)
			const res = await axios.post('/api/users/login', user)
			console.log('Login success', res.data)
			toast.success('Login success')
			router.push('/profile')
		} catch (error: any) {
			console.log('Log in failed', error.message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div>
			<h1>{loading ? 'Logging in...' : 'Login to your Account'}</h1>
			<hr />

			<br />
			<label htmlFor="email">Email</label>
			<input
				type="email"
				id="email"
				value={user.email}
				onChange={(e) => setUser({ ...user, email: e.target.value })}
				placeholder="email"
			/>
			<br />
			<label htmlFor="password">Password</label>
			<input
				type="password"
				id="password"
				value={user.password}
				onChange={(e) => setUser({ ...user, password: e.target.value })}
				placeholder="Password"
			/>
			<br />
			<button onClick={onLogin}>Sign up here</button>
			<br />
			<Link href={'/signup'}>No Account? Create one here</Link>
		</div>
	)
}
