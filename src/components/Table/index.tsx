import React from 'react'
import { useTableContext } from '../../context/TableContext'
import './style.css'
import {
  calculateAverageValue,
  calculateSumValues,
} from '../../utils/table-calculations'

const FIRST_ELEMENT = 0

const Table = () => {
  const { matrix } = useTableContext()

  if (!matrix.length) return null

  return (
    <table className="table">
      <thead>
        <tr className="table-row table-row-first">
          <th />
          {matrix[FIRST_ELEMENT].cells.map((cell, index) => (
            <th className="table-cell" key={cell.id}>
              Cell values N = {index}
            </th>
          ))}
          <th className="table-cell">Sum values</th>
        </tr>
      </thead>

      <tbody>
        {matrix.map((row, index) => (
          <tr key={row.id}>
            <td className="table-cell">Cell Value M = {index}</td>
            {row.cells.map((cell) => (
              <td className="table-cell table-cell-hover" key={cell.id}>
                {cell.value}
              </td>
            ))}
            <td className="table-cell table-cell-sum">
              {calculateSumValues(index, matrix)}
            </td>
          </tr>
        ))}

        <tr>
          <th className="table-cell">Average values</th>
          {matrix[FIRST_ELEMENT].cells.map((cell, index) => (
            <th className="table-cell" key={cell.id}>
              {calculateAverageValue(index, matrix)}
            </th>
          ))}
        </tr>
      </tbody>
    </table>
  )
}

export default Table
