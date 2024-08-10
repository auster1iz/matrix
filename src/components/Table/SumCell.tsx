import React from 'react'

type Props = {
  onPointerEnter: () => void
  onPointerLeave: () => void
  value: number
}

const SumCell = ({ value, onPointerLeave, onPointerEnter }: Props) => {
  return (
    <td
      className="table-cell table-cell-sum table-cell-hover"
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      {value}
    </td>
  )
}

export default SumCell
