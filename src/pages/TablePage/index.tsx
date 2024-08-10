import React, { useState } from 'react'
import './styles.css'
import { useTableContext } from '../../context/TableContext'
import Table from '../../components/Table'
import InputWithButton from '../../components/InputWithButton'
import Button from '../../components/Button'

export const TablePage = () => {
  const {
    addRowsLength,
    addColumnsLength,
    addNearestValuesLength,
    addRow,
    renderMatrix,
  } = useTableContext()

  const [mValue, setMValue] = useState('')
  const [nValue, setNValue] = useState('')
  const [xValue, setXValue] = useState('')

  return (
    <div className="page">
      <div className="page_inputs">
        <InputWithButton
          value={mValue}
          onChange={(e) => setMValue(e.target.value)}
          placeholder="M"
          buttonText="SET M"
          onClick={() => addRowsLength(parseInt(mValue))}
        />
        <InputWithButton
          value={nValue}
          onChange={(e) => setNValue(e.target.value)}
          placeholder="N"
          buttonText="SET N"
          onClick={() => addColumnsLength(parseInt(nValue))}
        />
        <InputWithButton
          value={xValue}
          onChange={(e) => setXValue(e.target.value)}
          placeholder="X"
          buttonText="SET X"
          onClick={() => addNearestValuesLength(parseInt(xValue))}
        />
        <Button
          text="ADD ROW"
          onClick={addRow}
          disabled={!renderMatrix.length}
        />
      </div>

      <div className="page_table-container">
        <Table />
      </div>
    </div>
  )
}
