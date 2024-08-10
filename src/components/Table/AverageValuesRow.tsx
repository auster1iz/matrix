import React from 'react'
import { FIRST_ELEMENT } from '../../constants'
import { calculateAverageValue } from '../../utils/table-calculations'
import { useTableContext } from '../../context/TableContext'

const AverageValuesRow = () => {
  const { renderMatrix } = useTableContext()

  return (
    <tr>
      <th className="table-cell">Average values</th>

      {renderMatrix[FIRST_ELEMENT].map((cell, index) => (
        <th className="table-cell" key={cell.id}>
          {calculateAverageValue(index, renderMatrix)}
        </th>
      ))}
    </tr>
  )
}

export default AverageValuesRow
