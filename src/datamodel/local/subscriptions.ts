const LOCAL_STORAGE_KEY = 'trunk-mini.item-drafts'

export function useDrafts() {
  return localStorage.getItem(LOCAL_STORAGE_KEY)
}
