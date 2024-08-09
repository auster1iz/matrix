import React from 'react'
import { Cell } from '../types/table'

type Props = {
  cell: Cell
  onClick: () => void
  showPercents: boolean
  percentage: string
}

const CellWithValue = ({ cell, onClick, showPercents, percentage }: Props) => {
  const gradientOffset = Number(percentage) + 20
  const gradientValue = `linear-gradient(180deg, rgba(175,224,255,1) ${percentage}%, rgba(252,251,252,1) ${gradientOffset}%)`
  const renderGradient = showPercents ? gradientValue : ''
  const renderedCellValue = showPercents ? percentage + '%' : cell.value

  return (
    <td
      className="table-cell table-cell-hover"
      key={cell.id}
      onClick={onClick}
      style={{
        background: renderGradient,
      }}
    >
      {renderedCellValue}
    </td>
  )
}

export default CellWithValue
