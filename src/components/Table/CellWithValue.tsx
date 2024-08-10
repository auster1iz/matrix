import React from 'react'
import { Cell } from '../../types/table'

type Props = {
  cell: Cell
  onClick: () => void
  showPercents: boolean
  percentage: string
  onPointerOver?: () => void
  onPointerLeave?: () => void
  highlightBackground?: boolean
}

const OFFSET_PERCENTAGE = 20

const CellWithValue = ({
  cell,
  onClick,
  showPercents,
  percentage,
  onPointerOver,
  highlightBackground,
  onPointerLeave,
}: Props) => {
  const gradientOffset = Number(percentage) + OFFSET_PERCENTAGE
  const gradientValue = `linear-gradient(180deg, rgba(175,224,255,1) ${percentage}%, rgba(252,251,252,1) ${gradientOffset}%)`
  const renderGradient = showPercents ? gradientValue : ''
  const renderedCellValue = showPercents ? percentage + '%' : cell.value
  const highlightedBg = highlightBackground ? 'lightgreen' : ''

  return (
    <td
      className="table-cell table-cell-hover"
      key={cell.id}
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerLeave={onPointerLeave}
      style={{
        background: renderGradient || highlightedBg,
      }}
    >
      {renderedCellValue}
    </td>
  )
}

export default CellWithValue
