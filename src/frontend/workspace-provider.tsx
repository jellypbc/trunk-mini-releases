import React, {
  createContext,
  useContext,
  ReactNode,
  useState
} from 'react'

type WorkspaceContextType = {
  selectedTrunkID: string
  handleTrunkSelect: (trunkID: string) => void

}

const defaultContextValue = {
  selectedTrunkID: '',
  handleTrunkSelect: (_trunkID: string) => {},
}

export const WorkspaceContext = createContext<WorkspaceContextType>(defaultContextValue)

type WorkspaceProviderProps = {
  children: ReactNode
}

export const WorkspaceProvider = ({ children } : WorkspaceProviderProps) => {

  const [selectedTrunkID, setSelectedTrunkID] = useState<string>('')

  function handleTrunkSelect(trunkID: string) {
    setSelectedTrunkID(trunkID)
  }

  const workspaceContextValue = {
    selectedTrunkID,
    handleTrunkSelect
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