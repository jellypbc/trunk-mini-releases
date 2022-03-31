import React, { ComponentClass} from 'react';
import '../styles/globals.scss'
import { WorkspaceProvider } from '../frontend/workspace-provider'

interface Props {
  Component: ComponentClass
}


export default function App({ Component } : Props) {
  return (
    <WorkspaceProvider>
      <Component />
    </WorkspaceProvider>
  )
}

