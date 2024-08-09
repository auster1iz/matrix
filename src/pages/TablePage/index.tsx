import React, { useState } from 'react'
import './styles.css'
import { useTableContext } from '../../context/TableContext'
import Input from '../../components/Input'
import Button from '../../components/Button'
import Table from '../../components/Table'

export const TablePage = () => {
  const { addRowsLength, addColumnsLength } = useTableContext()

  const [m, setM] = useState('')
  const [n, setN] = useState('')

  return (
    <div className="page">
      <div className="page_inputs">
        <div className="page_inputs-container">
          <Input
            value={m}
            onChange={(e) => setM(e.target.value)}
            placeholder="M"
          />
          <Button text="SET M" onClick={() => addRowsLength(m)} />
        </div>

        <div className="page_inputs-container">
          <Input
            placeholder="N"
            value={n}
            onChange={(e) => setN(e.target.value)}
          />
          <Button text="SET N" onClick={() => addColumnsLength(n)} />
        </div>
      </div>

      <div className="page_table-container">
        <Table />
      </div>
    </div>
  )
}
