import React, { useState, useEffect } from 'react'
import type { Replicache } from 'replicache'
import type { M } from '../../datamodel/mutators'
import {
  useItemByID,
  useClientEmail,
  getArrowsByIDs,
  useAuthorsByItemID
 } from '../../datamodel/subscriptions'
import { useRouter } from 'next/router'
import { htmlToText } from '../../util/htmlToText'
import styles from './index.module.css'
import { supabase } from '../../lib/supabase-client'
import EditorContainer from './editor-container'
import ItemMainSubItems from './item-main-sub-items'
import ArrowsAuthoredBy from './arrows-authored-by'
import ArrowsAuthor from './arrows-author'
import ArrowsBack from './arrows-back'
import ArrowsComment from './arrows-comment'
import ArrowsFootnote from './arrows-footnote'
import ArrowsFront from './arrows-front'
import ArrowsSub from './arrows-sub'
import { HotKeys } from 'react-hotkeys'
import { LOCAL_STORAGE_REDIRECT_URL_KEY } from '../../lib/constants'


type ItemPageProps = {
  itemID: string
  handleSetSelectedItemID: (itemID: string) => void
  rep: Replicache<M>
  roomID: string
  handleSetCommandBar: (state: boolean) => void
}

type NavProps = {
  email: string
  handleSetCommandBar: (state: boolean) => void
  rep: Replicache<M>
}

type SidebarProps = {
  createdBy: string
  arrowsCount: number
}

type MainProps = {
  itemID: string
  title: string
  content: string
  routeToWorkspace: () => void
  rep: Replicache<M>
  item: any
  handleSetSelectedItemID: (itemID: string) => void
}

const keyMap = {
  saveItem: ['command+s']
}

export default function ItemPage({ itemID, handleSetSelectedItemID, rep, roomID, handleSetCommandBar } : ItemPageProps ) {
  const item = useItemByID(rep, itemID)
  const clientEmail = useClientEmail(rep)


  const router = useRouter()

  function routeToWorkspace(){
    router.push(`/workspace/${roomID}/i`)
    handleSetSelectedItemID('i')
  }


  async function signInWithGoogle() {
    const redirectUrl = location.href
    localStorage.setItem
    (LOCAL_STORAGE_REDIRECT_URL_KEY, redirectUrl)
    try {
      const { error } : { error: any } = await supabase.auth.signIn({
        provider: 'google',
      }, {
        redirectTo: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : null || undefined
      })
      if (error) throw error
    } catch (error : any) {
      console.log('Error thrown:', error.message)
      alert(error.error_description || error.message)
    } finally {
    }
  }

  return (
    <div className={styles.container}>
      {item ?
        <>
          {clientEmail == "guest" &&
            <div
              className={styles.banner}
              onClick={(e) => {
                e.preventDefault()
                signInWithGoogle()
              }}
            >
              You look familiar. Have we met? <span className={styles.bannerLogin}>Log in or register</span> to save your contributions. You look like someone named... <span className={styles.bannerAnon}>Anonymous Aardvark</span>. We'll call you that.
            </div>
          }
          <Nav
            email={clientEmail}
            handleSetCommandBar={handleSetCommandBar}
            rep={rep}
          />
          <div className={styles.bodyContainer}>
            <Sidebar
              createdBy={item.createdBy}
              arrowsCount={item.arrows.length}
            />
            <Main
              itemID={itemID}
              title={item.title}
              content={item.content}
              routeToWorkspace={routeToWorkspace}
              rep={rep}
              item={item}
              handleSetSelectedItemID={handleSetSelectedItemID}
            />
          </div>
        </>
        :
        <div>
          <div>{itemID} does not exist</div>
          <button onClick={() => routeToWorkspace()}>go back to workspace</button>
        </div>
      }
    </div>
  )
}

function Main ({ itemID, title, content, routeToWorkspace, rep, item, handleSetSelectedItemID } : MainProps){
  console.log('itemID', itemID)
  function copyShareURLToClipboard(){
    navigator.clipboard.writeText(location.href)
      .then(() => {
        alert(`Copied to clipboard: ${location.href}`)
      })
      .catch(() => {
        alert(`Failed to copy to clipboard: ${location.href}`)
      })
  }

  const handlers = {
    saveItem: (e: any) => {
      e.preventDefault()
      alert('Item saved!')
    }
  }

  return(
    <HotKeys
      {...{
        keyMap,
        handlers,
      }}
    >
      <div className={styles.mainContainer}>
        {/* <div>{itemID}</div> */}
      <div className={styles.title}>
        <EditorContainer
          doc={title}
          type={'title'}
          rep={rep}
          itemID={itemID}
          arrows={[]}
        />
      </div>
      <div className={styles.authorsContainer}>
        {item.arrows.length > 0 &&
          <AuthorInfo
            rep={rep}
            itemID={itemID}
            handleSetSelectedItemID={handleSetSelectedItemID}
          />
        }
      </div>
      <div className={styles.content}>
        <EditorContainer
          doc={content}
          type={'content'}
          rep={rep}
          itemID={itemID}
          arrows={item.arrows as any || []}
        />
      </div>
      <ItemArrows
        rep={rep}
        itemID={itemID}
        arrows={item.arrows}
        item={item}
        handleSetSelectedItemID={handleSetSelectedItemID}
        isPerson={item.title.includes('[person]')}
      />
      <div className={styles.inputContainer}>
        <input
          onClick={() => copyShareURLToClipboard()}
          id={`shareURL`}
          className={styles.input}
          defaultValue={location.href}
          readOnly={true}
        />
        <button
          onClick={() => copyShareURLToClipboard()}
        >Copy</button>
      </div>
      <button onClick={() => routeToWorkspace()}>Back to workspace</button>
    </div>
  </HotKeys>
  )
}

function ItemArrows({ rep, itemID, arrows, item, handleSetSelectedItemID, isPerson}: any) {
  const arrowIDs = item.arrows.map((a: any) => a.arrowID)
  const fullArrows = getArrowsByIDs(rep, arrowIDs)

  return (
    arrowIDs && fullArrows &&
    <>
      <div className={styles.mainSubItems}>
        <ItemMainSubItems
          rep={rep}
          itemID={itemID}
          handleSetSelectedItemID={handleSetSelectedItemID}
          fullArrows={fullArrows}
        />
      </div>
      { isPerson &&
        <PersonFooter
          rep={rep}
          fullArrows={fullArrows}
          handleSetSelectedItemID={handleSetSelectedItemID}
        />
      }
      <Footer
        rep={rep}
        itemID={itemID}
        arrows={arrows}
        fullArrows={fullArrows}
        handleSetSelectedItemID={handleSetSelectedItemID}
      />
    </>
  )
}

function PersonFooter({rep, fullArrows, handleSetSelectedItemID}: any) {
  return (
    <div className={styles.meta}>
      <ArrowsAuthoredBy
        rep={rep}
        fullArrows={fullArrows}
        handleSetSelectedItemID={handleSetSelectedItemID}
      />
    </div>
  )
}

function Footer({rep, itemID, arrows, fullArrows, handleSetSelectedItemID} : any) {
  return (
    <div className={styles.meta}>
      <ArrowsFootnote
        rep={rep}
        itemID={itemID}
        arrows={arrows}
        handleSetSelectedItemID={handleSetSelectedItemID}
      />
      <ArrowsAuthor
        rep={rep}
        itemID={itemID}
        fullArrows={fullArrows}
        handleSetSelectedItemID={handleSetSelectedItemID}
      />
      <ArrowsSub
        rep={rep}
        itemID={itemID}
        fullArrows={fullArrows}
        handleSetSelectedItemID={handleSetSelectedItemID}
      />
      <ArrowsFront
        rep={rep}
        itemID={itemID}
        fullArrows={fullArrows}
        handleSetSelectedItemID={handleSetSelectedItemID}
      />
      <ArrowsBack
        rep={rep}
        itemID={itemID}
        fullArrows={fullArrows}
        handleSetSelectedItemID={handleSetSelectedItemID}
      />
      <ArrowsComment
        rep={rep}
        itemID={itemID}
        arrows={arrows}
        handleSetSelectedItemID={handleSetSelectedItemID}
      />
      <DeleteItem
        rep={rep}
        itemID={itemID}
        handleSetSelectedItemID={handleSetSelectedItemID}
      />
    </div>
  )
}

function DeleteItem({rep, itemID, handleSetSelectedItemID} : any) {
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false)
  const item = useItemByID(rep, itemID)

  function deleteItemAndSetSelectedItemIDToEmpty() {
    rep.mutate.deleteItem(itemID)
    handleSetSelectedItemID('')
  }
  return (
    <div
      className={styles.section}
    >
      <div
        className={styles.sectionHeader}
        onClick={() => setDeleteConfirmation(true)}
      >Delete</div>
      {deleteConfirmation && item &&
        <>
        <button
          onClick={() => deleteItemAndSetSelectedItemIDToEmpty()}
        >Delete {htmlToText(item.title)}</button>
        <span
          className={styles.cancel}
          onClick={() => setDeleteConfirmation(false)}
        >Cancel</span>
        </>
      }
    </div>
  )
}


function Sidebar({ createdBy, arrowsCount } : SidebarProps){
  const [showOutline, setShowOutline] = useState<boolean>(true)
  return(
    <div className={styles.sidebarContainer}>
      <div className={styles.top}>
        <div className={styles.createdByContainer}>
          <div className={styles.avatarContainer}>
            <div className={styles.avatar}>
              <div className={styles.profile}>
                <div className={styles.online}>
                </div>
              </div>

            </div>
          </div>
          <div className={styles.createdBy}>
            {createdBy ? createdBy.split(`@`)[0] : 'anonymous'}
          </div>
        </div>
        <div className={styles.updatedAtContainer}>
          <div className={styles.updatedAtLabel}>Last updated</div>
          <div>April 4, 2022</div>
        </div>
        <div className={styles.metadataContainer}>
          View Metadata
        </div>
        <div className={styles.viewPDFContainer}>
          View PDF
        </div>
        <div className={styles.shareItemContainer}>
          Share this item
        </div>
        <div className={styles.arrowsCountContainer}>
          <div className={styles.arrowsCount}>
            {arrowsCount}
          </div>
          <div className={styles.arrowsLabel}>
            Linked items
          </div>
        </div>
        <div
          className={styles.outlineMinimapContainer}
          onClick={() => setShowOutline(!showOutline)}
        >
          {showOutline ? <span className={styles.bold}>Outline</span> : <span>Outline</span>}
          <span>/</span>
          {!showOutline ? <span className={styles.bold}>Minimap</span> : <span>Minimap</span>}
          {showOutline ?
            <div className={styles.outlineContainer}>
              Outline
            </div>
          :
            <div className={styles.outlineContainer}>
              Minimap
            </div>
          }
        </div>
      </div>
    </div>
  )
}

function Nav({ email, handleSetCommandBar, rep } : NavProps) {

  const [anonItemIDs, setAnonItemIDs] = useState<string[]>([])
  const [anonArrowIDs, setAnonArrowIDs] = useState<string[]>([])

  useEffect(() => {
    const anonItemIDs = localStorage.getItem('trunk.anonItemIDs')
    setAnonItemIDs(anonItemIDs && JSON.parse(anonItemIDs) || [])
    const anonArrowIDs = localStorage.getItem('trunk.anonArrowIDs')
    setAnonArrowIDs(anonArrowIDs && JSON.parse(anonArrowIDs) || [])
  }, [])

  useEffect(() => {
    console.log('anonItemIDs', anonItemIDs)
    if (anonItemIDs.length > 0 && email !== 'guest') {
      anonItemIDs.map((itemID: any) => {
        rep.mutate.updateItemCreatedBy({id: itemID, createdBy: email})
      })
      localStorage.setItem('trunk.anonItemIDs', JSON.stringify([]))
    }
  }, [anonItemIDs])

  useEffect(() => {
    console.log('anonArrowIDs', anonArrowIDs)
    if (anonArrowIDs.length > 0 && email !== 'guest') {
      anonArrowIDs.map((arrowID: any) => {
        rep.mutate.updateArrowCreatedBy({id: arrowID, createdBy: email})
      })
      localStorage.setItem('trunk.anonArrowIDs', JSON.stringify([]))
    }
  }, [anonArrowIDs])

  const router = useRouter()

  async function logOut() {
    const { error } = await supabase.auth.signOut()
    error ?
      console.log('Error logging out:', error.message)
      :
      router.push('/')
  }

  return(
    <div className={styles.navContainer}>
      <div
        className={styles.searchBar}
        onClick={() => handleSetCommandBar(true)}>
        Search or type ⌘ + K
      </div>
      <div
        onClick={() => logOut()}
      >
          { email }
      </div>
    </div>
  )
}

function AuthorInfo({rep, itemID, handleSetSelectedItemID}: any){
  const authors = useAuthorsByItemID(rep, itemID)

  return (
    authors &&
      <AuthorArrows
        rep={rep}
        authorArrowIDs={authors}
        handleSetSelectedItemID={handleSetSelectedItemID}
      />
  )
}

function AuthorArrows({rep, authorArrowIDs, handleSetSelectedItemID} : any) {
  const fullArrows = getArrowsByIDs(rep, authorArrowIDs)

  if (!fullArrows) return null

  return (
    <>
    {fullArrows &&
      fullArrows.map((a, i) => {
        return (
          <AuthorItem
            key={`author-${a.id}`}
            rep={rep}
            itemID={a.frontItemID}
            isLast={i === fullArrows.length - 1 && true}
            handleSetSelectedItemID={handleSetSelectedItemID}
          />
        )
    })}
    </>
  )
}

function AuthorItem({rep, itemID, isLast, handleSetSelectedItemID}: any) {
  const item = useItemByID(rep, itemID)
  return (
    item &&
    <div
      className={styles.authors}
      onClick={() => handleSetSelectedItemID(itemID)}
    >
      <span>{htmlToText(item.title).split('[')[0].trim()}</span>
      {!isLast && <span>,&nbsp;</span>}
    </div>
  )
}
