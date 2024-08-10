import React, { useState } from 'react'
import { useTableContext } from '../../context/TableContext'
import './styles.css'
import {
  calculateCellPercentage,
  calculateRowSum,
} from '../../utils/table-calculations'
import CellWithValue from './CellWithValue'
import SumCell from './SumCell'
import TitleCell from './TitleCell'
import AverageValuesRow from './AverageValuesRow'
import HeaderRow from './HeaderRow'

const Table = () => {
  const {
    renderMatrix,
    removeRow,
    increaseCellValue,
    findNearestValues,
    clearNearestValues,
    nearestValues,
  } = useTableContext()

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
        <HeaderRow />
      </thead>

      <tbody>
        {renderMatrix.map((row, rowIndex) => (
          <tr key={rowIndex}>
            <TitleCell
              value={`Cell Value M = ${rowIndex + 1}`}
              onClick={(event) => removeRow(event, rowIndex)}
            />

            {row.map((cell, cellIndex) => (
              <CellWithValue
                key={cell.id}
                cell={cell}
                onPointerOver={() => findNearestValues(cell)}
                onPointerLeave={clearNearestValues}
                showPercents={shouldShowPercents(rowIndex)}
                highlightBackground={nearestValues.includes(cell.id)}
                onClick={() => increaseCellValue(rowIndex, cellIndex)}
                percentage={calculateCellPercentage(
                  rowIndex,
                  renderMatrix,
                  cell.value,
                )}
              />
            ))}

            <SumCell
              onPointerEnter={() => hoverSum(rowIndex)}
              onPointerLeave={unHoverSum}
              value={calculateRowSum(rowIndex, renderMatrix)}
            />
          </tr>
        ))}

        <AverageValuesRow />
      </tbody>
    </table>
  )
}

export default Table
