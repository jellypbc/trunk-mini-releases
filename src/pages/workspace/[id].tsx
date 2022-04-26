import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    let [, , roomID] = location.pathname.split("/");

    router.push({
      pathname: `/workspace/[roomID]/i`,
      query: { roomID: encodeURIComponent(roomID) }
    })
  }, [])

  return null
}