import React, {
  createContext,
  useContext,
  useEffect,
  ReactNode,
  useState
} from 'react'

type WorkspaceContextType = {
  selectedTrunkID: string
  trunkIDs: string[]
  handleTrunkSelect: (trunkID: string) => void
  addTrunkIDToWorkspace: (trunkID: string) => void
}

const defaultContextValue = {
  selectedTrunkID: '',
  handleTrunkSelect: (_trunkID: string) => {},
  trunkIDs: [],
  addTrunkIDToWorkspace: (_trunkID: string) => {}
}

export const WorkspaceContext = createContext<WorkspaceContextType>(defaultContextValue)

type WorkspaceProviderProps = {
  children: ReactNode
}

export const WorkspaceProvider = ({ children } : WorkspaceProviderProps) => {

  const [selectedTrunkID, setSelectedTrunkID] = useState<string>('')
  const [trunkIDs, setTrunkIDs] = useState<string[]>([])
  const [isTauri, setTauri] = useState<boolean>(false)
  const [appWindow, setAppWindow] = useState<any>()
  const [isFocused, setFocus] = useState<boolean>(false)


  useEffect( () => {
    (async () => {
      if (window && '__TAURI__' in window) {
        const {appWindow} = await import('@tauri-apps/api/window')
        setAppWindow(appWindow)
      }
    })()

    if (window && '__TAURI__' in window) { setTauri(true) }
  }, [])

  useEffect(() => {
    if (appWindow) {
      appWindow.listen('tauri://focus', () => { setFocus(true) })
      appWindow.listen('tauri://blur', () => { setFocus(false) })
    }
  }, [appWindow])

  function handleTrunkSelect(trunkID: string) {
    setSelectedTrunkID(trunkID)
  }

  function addTrunkIDToWorkspace(trunkID: string) {
    setTrunkIDs([...trunkIDs, trunkID])
  }

  const workspaceContextValue = {
    selectedTrunkID,
    handleTrunkSelect,
    trunkIDs,
    isTauri,
    isFocused,
    addTrunkIDToWorkspace
  }

  return (
    <WorkspaceContext.Provider
      value={workspaceContextValue}
    >
      {children}
    </WorkspaceContext.Provider>
  )
}

export const useWorkspace = () => useContext(WorkspaceContext)

export default WorkspaceProvider