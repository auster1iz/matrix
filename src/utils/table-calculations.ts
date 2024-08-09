import { CellValue, Row, RowId } from '../types/table'

const HUNDRED_PERCENTS = 100

export const calculateAverageValue = (columnIndex: number, matrix: Row[]) => {
  let sumOfColumnsValues = 0

  matrix.forEach((row) => {
    const cell = row.cells[columnIndex]
    sumOfColumnsValues += cell.value
  })

  return (sumOfColumnsValues / matrix.length).toFixed(1)
}

export const calculateRowSum = (rowId: RowId, matrix: Row[]) => {
  const row = matrix.find((row) => row.id === rowId)

  if (row) {
    return row.cells.reduce((sum, current) => {
      sum += current.value
      return sum
    }, 0)
  }

  return 0
}

export const calculateCellPercentage = (
  rowId: number,
  matrix: Row[],
  cellValue: CellValue,
) => {
  const row = matrix.find((row) => row.id === rowId)

  if (row) {
    const cellsValuesSum = row.cells.reduce((sum, cell) => sum + cell.value, 0)
    return ((cellValue * HUNDRED_PERCENTS) / cellsValuesSum).toFixed(2)
  }

  return '0'
}
