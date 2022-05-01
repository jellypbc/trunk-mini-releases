import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { LOCAL_STORAGE_REDIRECT_URL_KEY } from '../../lib/constants'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    let [, , roomID] = location.pathname.split("/");
    const redirectURL = localStorage.getItem  (LOCAL_STORAGE_REDIRECT_URL_KEY)

    redirectURL ?
      router.push(redirectURL)
    :
    router.push({
      pathname: `/workspace/[roomID]/i`,
      query: { roomID: `${roomID.replace(` `, `-`).replace(`@`, `-`).replace(`.com`, ``)}` }
    })

    localStorage.setItem(LOCAL_STORAGE_REDIRECT_URL_KEY, '')

  }, [])

  return null
}

