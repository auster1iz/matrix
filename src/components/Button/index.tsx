import React from 'react'
import './styles.css'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void
  text: string
}

const Button = ({ onClick, text }: Props) => {
  return (
    <button onClick={onClick} className="button">
      {text}
    </button>
  )
}

export default Button
