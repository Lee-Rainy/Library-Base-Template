import { useState } from 'react'

export function useToggle(initial = false) {
  const [state, setState] = useState(initial)

  const toggle = () => setState((v) => !v)
  const open = () => setState(true)
  const close = () => setState(false)

  return {
    state,
    toggle,
    open,
    close,
  }
}
