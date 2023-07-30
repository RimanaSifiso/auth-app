"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import React from "react";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = React.useState("nothing")


  async function logout() {
    try {

      const res = await axios.get('/api/users/logout')
      console.log("Logout successful")
      router.push('/login')

    } catch (error: any) {
      toast.error(error.message)
      console.log(error.message)
    }
  }


  const getUserDetails = async () => {
    const res = await axios.get('/api/users/me')
    console.log(res.data)
    setData(res.data.data._id)
  }

  return (
		<div>
			<h1>Profile</h1>
			<hr />
			<p>Profile page</p>

			<h2>
				{data === 'nothing' ? (
					'Nothing'
				) : (
					<Link href={`/profile/${data}`}>Go to dashboard</Link>
				)}
			</h2>
			<hr />

			<button onClick={logout}>Logout</button>
			<button onClick={getUserDetails}>Get user details</button>
		</div>
	)
}