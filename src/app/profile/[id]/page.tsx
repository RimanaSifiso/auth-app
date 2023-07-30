export default function Dashboard({params}: any) {
	return (
		<div>
			<h1>Profile</h1>
			<hr />
      <p>Profile page {params.id}</p>
		</div>
	)
}
