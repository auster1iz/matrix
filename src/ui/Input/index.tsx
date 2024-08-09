import React from 'react'
import './styles.css'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

const Input = ({
  type = 'text',
  placeholder,
  onChange,
  value,
  label,
}: Props) => {
  return (
    <div className="input_container">
      {label && <label className="input_label">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className="input"
      />
    </div>
  )
}

export default Input
