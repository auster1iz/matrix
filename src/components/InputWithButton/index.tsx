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
}

const InputWithButton = ({
  value,
  buttonText,
  placeholder,
  onClick,
  onChange,
}: Props) => {
  return (
    <div className="input-with-button_container">
      <Input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type="number"
      />
      <Button text={buttonText} onClick={onClick} />
    </div>
  )
}

export default InputWithButton
