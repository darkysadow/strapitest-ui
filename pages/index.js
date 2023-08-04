import Layout from '@/components/Layout'
import { useFetchUser, useUser } from '@/lib/authContext'

export default function Home() {
  const {user, loading} = useFetchUser()
  return (
    <Layout user={user}>
        index.js
    </Layout>
  )
}
