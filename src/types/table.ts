type CellId = number

export type CellValue = number

export type RowId = CellId

export type Cell = {
  id: CellId
  value: CellValue
}

export type Row = {
  id: RowId
  cells: Cell[]
}
