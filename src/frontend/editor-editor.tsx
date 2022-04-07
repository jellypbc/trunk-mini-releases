import styles from './editor.module.css'

import React, {
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
  CSSProperties
} from 'react'
import type { EditorState, Transaction } from 'prosemirror-state'
import { EditorView, EditorProps, DirectEditorProps } from 'prosemirror-view'

export interface Handle {
  view: EditorView
}

interface PropsBase extends EditorProps {
  state: EditorState
  style?: CSSProperties
  className?: string
  type?: string
}

interface PropsWithOnChange {
  onChange: (state: EditorState) => void
  dispatchTransaction?: never
}

interface PropsWithDispatchTransaction {
  dispatchTransaction: (transaction: Transaction) => void
  onChange?: never
}

type Props = PropsBase &
  (PropsWithOnChange | PropsWithDispatchTransaction)


export default forwardRef<Handle, Props>(function EditorEditor(
  props: Props,
  ref: any,
  ): JSX.Element {
  const root = useRef<HTMLDivElement>(null!)
  const initialProps = useRef(props)
  const viewRef = useRef<EditorView<any>>(null!)
  const {state, type, ...restProps} = props

  viewRef.current?.updateState(state)
  viewRef.current?.setProps(buildProps(restProps))

  useEffect(() => {
    const view = new EditorView(
      root.current,
      {
        state: initialProps.current.state,
        ...buildProps(initialProps.current)
      }
    )

    viewRef.current = view
    viewRef.current.focus()
    return () => {
      view.destroy()
    }
  }, [])

  useImperativeHandle(ref, () => ({
    get view() {
      return viewRef.current
    }
  }))

  return (
    <div
      ref={root}
      style={props.style}
      className={type === 'title' ? styles.titleContainer : type === 'commentDraft' ? styles.commentDraft : styles.container}
      spellCheck={false}
    />
  )


 function buildProps(
    props: Partial<Props>,
  ): Partial<DirectEditorProps> {
    console.log('props', props)
    return {
      ...props,
      dispatchTransaction: tx => {
        props.dispatchTransaction && props.dispatchTransaction(tx)
      },
    }
  }
})