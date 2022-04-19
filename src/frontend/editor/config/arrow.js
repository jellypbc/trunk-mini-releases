import { Plugin, PluginKey } from 'prosemirror-state'
import { Decoration, DecorationSet } from 'prosemirror-view'
import ReactDOM from 'react-dom'
import { useItemByID, useArrowsByIDs, useArrowByID } from '../../../datamodel/subscriptions'

class Arrow {
  constructor(arrowID, to, from, kind, backItemID) {
    this.arrowID = arrowID,
    this.to = to,
    this.from = from,
    this.kind = kind,
    this.backItemID = backItemID
  }
}

function deco(from, to, arrow) {
  return Decoration.inline(from, to, { style: `background-color: hsla(89.7, 69%, 72%, 50%);` }, { arrow })
}

class ArrowState {
  constructor(version, decos, unsent, field) {
    this.version = version,
    this.decos = decos,
    this.unsent = unsent,
    this.field = field
  }

  findArrow(id) {
    let current = this.decos.find()
    for (let i = 0; i < current.length; i++)
      if (current[i].spec.comment.id == id) return current[i]
  }

  arrowsAt(pos) {
    return this.decos.find(pos, pos)
  }

  apply(tr) {
    let action = tr.getMeta(arrowPlugin)
    let actionType = action && action.type
    if (!action && !tr.docChanged) return this

    let base
    base = this

    let { decos, unsent, field } = base
    decos = decos.map(tr.mapping, tr.doc)

    if (actionType === 'newArrow') {
      decos = decox.add(tr.doc, [deco(action.arrow.from, action.arrow.to, action.arrow)])
    } else if (actionType === 'deleteArrow') {
      decos = decos.remove([this.findArrow(action.arrow.id)])
      unsent = unsent.concat(action)
    }
    return new ArrowState(base.version, decos, unsent, field)
  }

  static init(config) {
    const existingArrows = config.arrows || []
    const itemID = config.itemID

    let filteredArrows = []

    filteredArrows = existingArrows.filter(arrow => arrow.backItemID === itemID)

    let decos = filteredArrows.map((a) =>
      deco(a.from, a.to, a)
    )

    return new ArrowState(
      config.version,
      DecorationSet.create(config.doc, decos),
      [],
      config.field
    )
  }
}

export const arrowPluginKey = new PluginKey('arrow')

export const arrowPlugin = new Plugin({
  key: arrowPluginKey,
  state: {
    init: ArrowState.init,
    apply(tr, prev) {
      ArrowState.init
      return prev.apply(tr)
    },
  },
  props: {
    decorations(state){
      return this.getState(state).decos
    }
  }
})

export const arrowUI = function(tx, rep) {
  return new Plugin({
    props: {
      decorations(state) {
        return arrowToolTip(state, tx, rep)
      }
    }
  })
}

function arrowToolTip(state, dispatch, rep) {
  let sel = state.selection
  if (!sel.empty) return null
  if (sel.from === 1) return null
  let arrows = arrowPlugin.getState(state).arrowsAt(sel.from)
  if (!arrows.length) return null
  return DecorationSet.create(state.doc, [
    Decoration.widget(
      sel.from,
      renderArrows(arrows, dispatch, state, rep),
      {
        ignoreSelection: true
      }
    )
  ])
}

function renderArrows(arrows, dispatch, state, rep) {
  const node = document.createElement('div')
  node.className = 'arrowTooltip'

  ReactDOM.render(
    <>
      { arrows.map((a, i) => {
        const isLast = i === arrows.length -1
        return (
          <div key={i}>
            <EditorArrowThread
              arrowID={a.spec.arrow.arrowID}
              dispatch={dispatch}
              state={state}
              showActions={{ reply: isLast, delete: true}}
              rep={rep}
            />
          </div>
        )
      })}
    </>,
    node
  )
  return node
}

import EditorArrowThreadContainer from '../../editor-arrow-thread-container'

function EditorArrowThread({ arrowID, dispatch, state, showActions, rep }) {
  const fullArrow = useArrowByID(rep, arrowID)

  return (
    fullArrow &&
      <EditorArrowThreadContainer
        rep={rep}
        arrow={fullArrow}
        arrowID={arrowID}
      />
  )
}
