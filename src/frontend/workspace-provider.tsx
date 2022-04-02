import React, {
  createContext,
  useContext,
  ReactNode,
  useState
} from 'react'

type WorkspaceContextType = {
  selectedTrunkID: string
  handleTrunkSelect: (trunkID: string) => void
  trunkIDs: string[]
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