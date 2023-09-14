async function fetchBlogs() {
  const res = await fetch('http://localhost:3000/api/blog', {
    next: {
      revalidate: 10,
    },
  })
  const data = await res.json()
  return data.posts
}

export default async function Home() {
  const posts = await fetchBlogs()
  console.log(posts)
  return <main>Hi</main>
}
