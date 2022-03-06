interface TauriWindow extends Window {
  __TAURI__?: any,
  __TAURI_METADATA__?: any,
  crypto?: any,
}

// declare const window: TauriWindow;

export default TauriWindow
