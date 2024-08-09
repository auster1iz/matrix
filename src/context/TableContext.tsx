import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { Cell, Row, RowId } from '../types/table'
import { generateId } from '../utils/id-generator'
import { generateArray } from '../utils/generateArray'
import { getRandomNumber } from '../utils/getRandomNumber'

const MIN = 100
const MAX = 999

interface TableContextProviderProps {
  children: ReactNode
}

interface InitialContextValuesType {
  addRowsLength: (value: string) => void
  addColumnsLength: (value: string) => void
  increaseCellValue: (rowIndex: number, cellIndex: number) => void
  removeRow: (
    event: React.MouseEvent<HTMLTableCellElement>,
    rowId: number,
  ) => void
  renderMatrix: Row[]
}

const InitialContextValues: InitialContextValuesType = {
  addRowsLength: () => null,
  addColumnsLength: () => null,
  increaseCellValue: () => null,
  removeRow: () => null,
  renderMatrix: [],
}

export const TableContext =
  createContext<InitialContextValuesType>(InitialContextValues)

export const useTableContext = () => useContext(TableContext)

export const TableContextProvider = ({
  children,
}: TableContextProviderProps) => {
  const [rowsLength, setRowsLength] = useState<number>(0) // M
  const [columnsLength, setColumnsLength] = useState<number>(0) // N
  const [renderMatrix, setRenderMatrix] = useState<Row[]>([])

  const addRowsLength = useCallback((value: string) => {
    const formattedValue = parseInt(value)
    setRowsLength(formattedValue)
  }, [])

  const addColumnsLength = useCallback((value: string) => {
    const formattedValue = parseInt(value)
    setColumnsLength(formattedValue)
  }, [])

  const generateMatrix = useCallback(() => {
    if (rowsLength && columnsLength) {
      const matrix = generateArray(rowsLength).reduce((arr) => {
        const row: Row = {
          id: generateId.next().value!,
          cells: [],
        }
        for (let i = 0; i < columnsLength; i++) {
          const cell: Cell = {
            id: generateId.next().value!,
            value: Math.trunc(getRandomNumber(MIN, MAX)),
          }
          row.cells.push(cell)
        }
        arr.push(row)
        return arr
      }, [])

      setRenderMatrix(matrix)
    }
  }, [rowsLength, columnsLength])

  const increaseCellValue = useCallback(
    (rowIndex: number, cellIndex: number) => {
      setRenderMatrix((prev) => {
        const newMatrix = [...prev]
        const row = newMatrix[rowIndex]
        const cell = row.cells[cellIndex]
        cell.value = cell.value + 1
        return newMatrix
      })
    },
    [renderMatrix],
  )

  const removeRow = useCallback(
    (event: React.MouseEvent<HTMLTableCellElement>, rowId: RowId) => {
      event.stopPropagation()
      const newMatrix = renderMatrix.filter((row) => row.id !== rowId)
      setRenderMatrix(newMatrix)
    },
    [renderMatrix],
  )

  useEffect(() => {
    generateMatrix()
  }, [generateMatrix])

  const value = {
    addRowsLength,
    addColumnsLength,
    increaseCellValue,
    removeRow,
    renderMatrix,
  }

  return <TableContext.Provider value={value}>{children}</TableContext.Provider>
}
