import React, { useState } from 'react'
import { useTableContext } from '../../context/TableContext'
import './styles.css'
import {
  calculateAverageValue,
  calculateCellPercentage,
  calculateRowSum,
} from '../../utils/table-calculations'
import CellWithValue from '../CellWithValue'

const FIRST_ELEMENT = 0

const Table = () => {
  const { renderMatrix, removeRow, increaseCellValue } = useTableContext()

  const [isSumHovered, setIsSumHovered] = useState<boolean>(false)
  const [hoveredRow, setHoveredRow] = useState<null | number>(null)

  const hoverSum = (rowId: number) => {
    setIsSumHovered(true)
    setHoveredRow(rowId)
  }

  const unHoverSum = () => {
    setIsSumHovered(false)
    setHoveredRow(null)
  }

  const shouldShowPercents = (rowIndex: number) => {
    return isSumHovered && rowIndex === hoveredRow
  }

  if (!renderMatrix.length) return null

  return (
    <table className="table">
      <thead>
        <tr className="table-row table-row-first">
          <th />
          {renderMatrix[FIRST_ELEMENT].map((cell, index) => (
            <th className="table-cell" key={cell.id}>
              Cell values N = {index + 1}
            </th>
          ))}
          <th className="table-cell">Sum values</th>
        </tr>
      </thead>

      <tbody>
        {renderMatrix.map((row, rowIndex) => (
          <tr key={rowIndex}>
            <td
              className="table-cell table-cell-hover"
              onClick={(event) => removeRow(event, rowIndex)}
            >
              Cell Value M = {rowIndex + 1}
            </td>

            {row.map((cell, cellIndex) => (
              <CellWithValue
                key={cell.id}
                cell={cell}
                showPercents={shouldShowPercents(rowIndex)}
                onClick={() => increaseCellValue(rowIndex, cellIndex)}
                percentage={calculateCellPercentage(
                  rowIndex,
                  renderMatrix,
                  cell.value,
                )}
              />
            ))}

            <td
              className="table-cell table-cell-sum table-cell-hover"
              onPointerEnter={() => hoverSum(rowIndex)}
              onPointerLeave={unHoverSum}
            >
              {calculateRowSum(rowIndex, renderMatrix)}
            </td>
          </tr>
        ))}

        <tr>
          <th className="table-cell">Average values</th>

          {renderMatrix[FIRST_ELEMENT].map((cell, index) => (
            <th className="table-cell" key={cell.id}>
              {calculateAverageValue(index, renderMatrix)}
            </th>
          ))}
        </tr>
      </tbody>
    </table>
  )
}

export default Table
