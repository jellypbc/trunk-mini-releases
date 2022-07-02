import React, { ComponentClass } from 'react';
import '../styles/globals.scss'
import Head from 'next/head'
import { WorkspaceProvider } from '../frontend/workspace-provider'
import AppNav from '../frontend/nav/app-nav'

interface Props {
  Component: ComponentClass
}

export default function App({ Component } : Props) {
  return (
    <div className="relative">
      <Head>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
        />
      </Head>
      <WorkspaceProvider>
        <AppNav />
        <Component />
      </WorkspaceProvider>
    </div>
  )
}

