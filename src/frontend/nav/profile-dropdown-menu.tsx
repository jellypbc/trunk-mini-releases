import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import classNames from '../../util/classNames'
import { supabase } from '../../lib/supabase-client'
import { useRouter } from 'next/router'

type Props = {
  clientEmail: string
}

export default function ProfileDropdownMenu({clientEmail}: Props) {

  const router = useRouter()

  async function logOut() {

    const { error } = await supabase.auth.signOut()
    error ?
      console.log('Error logging out:', error.message)
      :
      router.push('/')
  }

  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-full
            rounded-md border border-gray-100 shadow-sm px-2 py-2
            bg-white text-sm font-small text-gray-700
            hover:bg-gray-50
            focus:outline-none focus:ring-2
            focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500
          ">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right absolute
            right-0 mt-2 w-56 rounded-md shadow-lg bg-white
            ring-1 ring-black ring-opacity-5 divide-y
            divide-gray-100 focus:outline-none focus:no-underline
          ">
            <div className="py-1" role="none">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="/settings"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm no-underline'
                    )}
                  >
                    Settings
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="https://join.slack.com/t/jelly-community/shared_invite/zt-gldzxtjm-an~oC_8YCjvQScUGaBbj6Q"
                    target="_blank"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm no-underline'
                    )}
                  >
                    Join Slack community
                  </a>
                )}
              </Menu.Item>
            </div>
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                    onClick={() => logOut()}
                  >
                    Log out
                  </a>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>

    </>
  )
}