import React, {
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
  CSSProperties,
} from 'react'
import type { EditorState, Transaction } from 'prosemirror-state'
import { EditorView, EditorProps, DirectEditorProps, } from 'prosemirror-view'

export interface Handle {
  view: EditorView
}

interface PropsBase extends EditorProps {
  state: EditorState
  style?: CSSProperties
  className?: string
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


export default forwardRef<Handle, Props>(function Editor(
  props: Props,
  ref: any,
  ): JSX.Element {
  const root = useRef<HTMLDivElement>(null!)
  const initialProps = useRef(props)
  const viewRef = useRef<EditorView<any>>(null!)

  const {state, ...restProps} = props

  viewRef.current?.updateState(state)
  viewRef.current?.setProps(buildProps(restProps))

  // if has focus
  // viewRef.current?.focus()

  useEffect(() => {
    const view = new EditorView(root.current, {
      state: initialProps.current.state,
      ...buildProps(initialProps.current)
    })

    viewRef.current = view
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
      className={props.className}
    />
  )

 function buildProps(
    props: Partial<Props>,
  ): Partial<DirectEditorProps> {
    return {
      ...props,
      dispatchTransaction: transaction => {
        // `dispatchTransaction` takes precedence.
        if (props.dispatchTransaction) {
          props.dispatchTransaction(transaction)
        } else if (props.onChange) {
          props.onChange(
            viewRef.current.state.apply(transaction),
          )
        }
      },
    }
  }
})