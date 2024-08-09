type CellId = number
type CellValue = number

export type Cell = {
  id: CellId
  value: CellValue
}

export type Row = {
  id: number
  cells: Cell[]
}
