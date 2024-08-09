import React from 'react'
import { useTableContext } from '../../context/TableContext'
import './style.css'

const FIRST_ELEMENT = 0

const Table = () => {
  const { matrix } = useTableContext()

  return (
    <table className="table">
      <thead>
        {!!matrix.length && (
          <tr className="table-row table-row-first">
            <th />
            {matrix[FIRST_ELEMENT].cells.map((cell, index) => (
              <th className="table-cell" key={cell.id}>
                Cell values N = {index}
              </th>
            ))}
          </tr>
        )}
      </thead>

      <tbody>
        {matrix.map((row, index) => (
          <tr key={row.id}>
            <td className="table-cell">Cell Value M = {index}</td>
            {row.cells.map((cell) => (
              <td className="table-cell pointer" key={cell.id}>
                {cell.value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
