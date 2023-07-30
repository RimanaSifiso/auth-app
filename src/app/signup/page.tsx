'use client' // this declation enables the below component to be treated as a client componet
// i.e., it can access APIs from the client such as hooks, brower APIs, etc...
import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-hot-toast'

export default function SignupPage() {
	const router = useRouter()
	const [buttonDisabled, setButtonDisabled] = React.useState(false)
	const [loading, setLoading] = React.useState(false)
	const [user, setUser] = React.useState({
		email: '',
		password: '',
		username: '',
	})

	const onSignup = async () => {
		try {
			setLoading(true);
			const res = await axios.post('/api/users/signup', user);
			console.log("Signup success", res.data);
			router.push('/login')
		} catch (error: any) {
			console.log('Sign up failed', error.message)
			toast(error.message)
		} finally {
			setLoading(false)
		}
	}

	React.useEffect(() => {
		if (
			user.email.length > 0 &&
			user.password.length > 0 &&
			user.username.length > 0
		) {
			setButtonDisabled(false)
		} else {
			setButtonDisabled(true)
		}
	}, [user])

	return (
		<div>
			<h1>{loading ? 'Creating your account...' : 'Create Account'}</h1>
			<hr />
			<br />
			<label htmlFor="username">Username</label>
			<input
				type="text"
				id="username"
				value={user.username}
				onChange={(e) => setUser({ ...user, username: e.target.value })}
				placeholder="Username"
			/>
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
			<button onClick={onSignup}>
				{buttonDisabled ? 'No sign up' : 'Sign up'}
			</button>
			<br />
			<Link href={'login'}>Have an Account? Login here</Link>
		</div>
	)
}
