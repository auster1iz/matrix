import React from 'react'
import { FIRST_ELEMENT } from '../../constants'
import { useTableContext } from '../../context/TableContext'

const HeaderRow = () => {
  const { renderMatrix } = useTableContext()

  return (
    <tr className="table-row table-row-first">
      <th />
      {renderMatrix[FIRST_ELEMENT].map((cell, index) => (
        <th className="table-cell" key={cell.id}>
          Cell values N = {index + 1}
        </th>
      ))}
      <th className="table-cell">Sum values</th>
    </tr>
  )
}

export default HeaderRow
