import React from 'react'
import './styles/table.css'
import Input from '../../ui/Input'
import Button from '../../ui/Button'

export const TablePage = () => {
  return (
    <div className="page">
      <div className="page_inputs">
        <Input label="Kuvalda" />
        <Input label="Kuvalda" />
        <Button text="Press" />
      </div>
    </div>
  )
}
