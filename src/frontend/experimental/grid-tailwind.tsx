import React from 'react'

export default function GridTailwind() {
  return (
    <div className="bg-slate-100 h-screen w-screen pt-4">
      <div className="bg-slate-200 my-0 mx-auto max-w-screen-lg h-full grid grid-rows-[100px_auto] gap-4">
        <div className="bg-orange-50 p-4">
          Nav
        </div>
        <div className="bg-slate-200 grid grid-cols-[150px_550px_auto]  gap-4">
          <div className="bg-green-50 p-4">
            Sidebar
          </div>
          <div className="bg-yellow-50 p-4">
            Main
          </div>
          <div className="bg-red-50 p-4">
            Gutter
          </div>
        </div>
      </div>
    </div>
  )
}
