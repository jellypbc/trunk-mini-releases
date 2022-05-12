import React, { ComponentClass } from 'react';
import '../styles/globals.scss'
import { WorkspaceProvider } from '../frontend/workspace-provider'

import AppNav from '../frontend/nav/app-nav'

interface Props {
  Component: ComponentClass
}


export default function App({ Component } : Props) {
  return (
    <div>
      <WorkspaceProvider>
        <AppNav/>
        <Component />
      </WorkspaceProvider>
    </div>
  )
}

