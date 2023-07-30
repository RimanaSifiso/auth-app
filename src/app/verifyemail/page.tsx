"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from 'react'

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");

  const [verified, setVerified] = useState(false)
  const [error, setError] = useState(false);

  const verifyEmail = async () => {
    try {
      await axios.post('/api/users/verifyemail', { token })
      setVerified(true);

    } catch (error: any) {
      setError(true);
      console.log(error.response.data)
    }
  }

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1]
    setToken(urlToken || '')
  }, [token])

  useEffect(() => {
    if (token.length > 0) {
      verifyEmail();
    }
  }, [token])


  return (
		<div>
			<h1>Verify email</h1>
			<h2>{token.length > 0 ? `${token}` : 'No token'}</h2>

			{verified && (
				<div>
					<h2>Email Verified</h2>
					<Link href="/login">Go to login</Link>
				</div>
			)}

			{error && (
				<div>
					<h2>Error verifying email</h2>
				</div>
			)}
		</div>
	)
}