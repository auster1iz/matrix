import React, { useState } from 'react'
import './styles.css'
import { useTableContext } from '../../context/TableContext'
import Input from '../../components/Input'
import Button from '../../components/Button'
import Table from '../../components/Table'

export const TablePage = () => {
  const { addRowsLength, addColumnsLength } = useTableContext()

  const [mValue, setMValue] = useState('')
  const [nValue, setNValue] = useState('')

  return (
    <div className="page">
      <div className="page_inputs">
        <div className="page_inputs-container">
          <Input
            value={mValue}
            onChange={(e) => setMValue(e.target.value)}
            placeholder="M"
            type="number"
          />
          <Button text="SET M" onClick={() => addRowsLength(mValue)} />
        </div>

        <div className="page_inputs-container">
          <Input
            value={nValue}
            onChange={(e) => setNValue(e.target.value)}
            placeholder="N"
            type="number"
          />
          <Button text="SET N" onClick={() => addColumnsLength(nValue)} />
        </div>
      </div>

      <div className="page_table-container">
        <Table />
      </div>
    </div>
  )
}
