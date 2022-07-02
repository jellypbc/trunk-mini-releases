import { useWorkspace } from '../workspace-provider'

export default function AppNav() {

  const { isTauri } = useWorkspace()

  return (
    <>
      {isTauri &&
        <div
          data-tauri-drag-region
          id="nav"
          className="fixed top-0 z-40 h-40 w-screen bg-white dark:bg-blue"
        >
        </div>
      }
    </>
  )
}

// === previous method to render custom traffic lights using tauri appWindow
// const renderTrafficLights = () => {
//   return (
//     <>
//       <div
//         className={"titlebar-button titlebar-close " + (isFocused ? "active" : "")}
//         onClick={() => appW.close()}
//       >
//       </div>
//       <div
//         className={"titlebar-button titlebar-minimize " + (isFocused ? "active" : "")}
//         onClick={()=> appW.minimize()}
//       >
//       </div>
//       <div
//         className={"titlebar-button titlebar-expand " + (isFocused ? "active" : "")}
//         onClick={()=> appW.toggleMaximize()}
//       >
//       </div>
//     </>
//   )
// }