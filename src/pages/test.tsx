import React from 'react'
import Link from 'next/link'

export default function Test() {

  return (
    <div className="relative z-40">

      <nav className="nav bg-red-100 h-100 sticky top-0 w-auto p-10 z-40" >
        <h1 className="text-center text-xl">
          Nav
        </h1>
      </nav>

      <div className="flex">

        <aside className="w-44 fixed left-0 top-30 h-screen bg-slate-700 p-10">
          <h1 className="text-white text-4xl">Sidebar</h1>
          <Link href={"/"}>Home</Link>
        </aside>

        <div className="flex-1 ml-44">
          <div className="h-96 bg-amber-400 p-10">
            <h1 className="text-4xl">top content</h1>
          </div>
          <div className="h-96 bg-white p-10 z-10">
            <nav className="sticky top-0 bg-blue-600 p-5 drop-shadow shadow-blue-600 mb-10">
              <p className="text-white">Sticky nav bar z-10</p>
            </nav>
            <h1 className="text-4xl">Middle Content</h1>
          </div>
          <div className="h-96 bg-green-400 p-10 z-50">
            <nav className="sticky top-0 bg-blue-600 p-5 drop-shadow shadow-blue-600 mb-10">
              <p className="text-white">Sticky nav bar z-50</p>
            </nav>

            <h1 className="text-4xl">Middle Content</h1>
          </div>
          <div className="h-96 bg-indigo-400 p-10">
            <h1 className="text-4xl">Last Content</h1>
          </div>
        </div>
      </div>
    </div>
  )

}