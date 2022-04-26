import { useRouter } from 'next/router'
import { supabase } from '../../lib/supabase-client'
import styles from './nav.module.css'

type NavProps = {
  email: string
  handleSetCommandBar: (state: boolean) => void
}


export default function Nav({ email, handleSetCommandBar } : NavProps) {
  const router = useRouter()

  async function logOut() {
    const { error } = await supabase.auth.signOut()
    error ?
      console.log('Error logging out:', error.message)
      :
      router.push('/')
  }

  return(
    <div className={styles.container}>
      <div
        className={styles.searchBar}
        onClick={() => handleSetCommandBar(true)}>
        Search or type ⌘ + K
      </div>
      <div
        onClick={() => logOut()}
      >
          { email }
      </div>
    </div>
  )
}