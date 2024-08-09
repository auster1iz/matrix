import { Row } from '../types/cell'

export const calculateAverageValue = (columnIndex: number, matrix: Row[]) => {
  let sumOfColumnsValues = 0

  matrix.forEach((row) => {
    const cell = row.cells[columnIndex]
    sumOfColumnsValues += cell.value
  })

  return (sumOfColumnsValues / matrix.length).toFixed(1)
}

export const calculateSumValues = (rowIndex: number, matrix: Row[]) => {
  const row = matrix[rowIndex]

  return row.cells.reduce((sum, current) => {
    sum += current.value
    return sum
  }, 0)
}
