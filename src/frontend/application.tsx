import React, { useState } from 'react';
import type { Replicache } from 'replicache'
import type { M } from "../datamodel/mutators";
import { useApplicationByID } from '../datamodel/subscriptions'

type Props = {
  text: string
  rep: Replicache<M>
  applicationID: string
}

export default function Application({ text : bloop, rep, applicationID }: Props) {
  const thing = useApplicationByID(rep, applicationID)

  const [text, setText] = useState(bloop)

  function handleTextAreaChange(id: string, text: string) {
    const stuff = {
      id,
      text
    }

    rep.mutate.updateApplication(stuff)
    setText(text)
  }

  return (
    <>
    {text && thing &&
      <div>
        <textarea
          value={text}
          onChange={e => handleTextAreaChange(applicationID, e.target.value)}
        />
        <textarea
          value={thing.text}
          disabled
        />
      </div>
    }
    </>
  )
}
