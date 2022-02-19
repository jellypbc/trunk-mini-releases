import React from 'react';
import type { Replicache } from 'replicache'
import type { M } from "../datamodel/mutators";
import { randomApplication } from '../datamodel/application'
import { getApplications } from '../datamodel/subscriptions'
import Application from './application'

type Props = {
  rep: Replicache<M>;
}

export default function ApplicationList({ rep }: Props) {

  const applications = getApplications(rep) as unknown as any
  console.log('applications bc', applications)

  function handleNewApplication(){
    rep.mutate.createApplication(randomApplication())
  }

  return (
    <div>
       <button
        onClick={() => handleNewApplication()}

      >New Application</button>

      {
        applications && applications.map((a : any) => {
          return (
            <Application
              key={a.id}
              rep={rep}
              applicationID={a.id}
              text={a.text}
            />
          )
        })

      }
    </div>
  )
}
