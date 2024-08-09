import React from 'react'
import './styles.css'

type Props = React.InputHTMLAttributes<HTMLInputElement>

const Input = ({ type = 'text', placeholder, onChange, value }: Props) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      className="input"
    />
  )
}

export default Input
