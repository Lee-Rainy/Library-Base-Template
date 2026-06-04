import React from 'react'
import './index.scss'

export interface ButtonProps {
  children?: React.ReactNode
}

export function Button(props: ButtonProps) {
  return <button className="ui-button">{props.children}</button>
}
