import React, { ChangeEventHandler } from 'react'
import Input from '../Input'
import Button from '../Button'
import './styles.css'

type Props = {
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
  onClick?: () => void
  buttonText: string
  placeholder: string
  disabled?: boolean
}

const InputWithButton = ({
  value,
  buttonText,
  placeholder,
  onClick,
  onChange,
  disabled = false,
}: Props) => {
  return (
    <div className="input-with-button_container">
      <Input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type="number"
      />
      <Button text={buttonText} onClick={onClick} disabled={disabled} />
    </div>
  )
}

export default InputWithButton
