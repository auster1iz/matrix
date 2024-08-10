import { CellValue, Row } from '../types/table'

const HUNDRED_PERCENTS = 100

export const calculateAverageValue = (columnIndex: number, matrix: Row[]) => {
  let sumOfColumnsValues = 0

  matrix.forEach((row) => {
    const cell = row[columnIndex]
    sumOfColumnsValues += cell.value
  })

  return (sumOfColumnsValues / matrix.length).toFixed(1)
}

export const calculateRowSum = (rowIndex: number, matrix: Row[]) => {
  const row = matrix[rowIndex]

  return row.reduce((sum, current) => {
    sum += current.value
    return sum
  }, 0)
}

export const calculateCellPercentage = (
  rowIndex: number,
  matrix: Row[],
  cellValue: CellValue,
) => {
  const row = matrix[rowIndex]

  const cellsValuesSum = row.reduce((sum, cell) => sum + cell.value, 0)
  return ((cellValue * HUNDRED_PERCENTS) / cellsValuesSum).toFixed(2)
}
