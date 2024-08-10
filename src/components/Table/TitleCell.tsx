import React from 'react'

type Props = {
  value: string
  onClick: (event: React.MouseEvent<HTMLTableCellElement>) => void
}

const TitleCell = ({ value, onClick }: Props) => {
  return (
    <td className="table-cell table-cell-hover" onClick={onClick}>
      {value}
    </td>
  )
}

export default TitleCell
