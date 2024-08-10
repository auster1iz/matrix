import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { Cell, Row } from '../types/table'
import { generateId } from '../utils/id-generator'
import { generateArray } from '../utils/generateArray'
import { getRandomNumber } from '../utils/getRandomNumber'
import { validateNumber } from '../utils/validateNumber'

const MIN = 100
const MAX = 999
const ERROR_MESSAGE = 'Value should be in the range from 0 to 100'

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
    if (validateNumber(formattedValue)) {
      setRowsLength(formattedValue)
    } else {
      alert(ERROR_MESSAGE)
    }
  }, [])

  const addColumnsLength = useCallback((value: string) => {
    const formattedValue = parseInt(value)
    if (validateNumber(formattedValue)) {
      setColumnsLength(formattedValue)
    } else {
      alert(ERROR_MESSAGE)
    }
  }, [])

  const generateMatrix = useCallback(() => {
    if (rowsLength && columnsLength) {
      const matrix = generateArray(rowsLength).reduce((arr) => {
        const row: Row = []
        for (let i = 0; i < columnsLength; i++) {
          const cell: Cell = {
            id: generateId.next().value!,
            value: Math.trunc(getRandomNumber(MIN, MAX)),
          }
          row.push(cell)
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
        const cell = row[cellIndex]
        cell.value = cell.value + 1
        return newMatrix
      })
    },
    [renderMatrix],
  )

  const removeRow = useCallback(
    (event: React.MouseEvent<HTMLTableCellElement>, rowIndex: number) => {
      event.stopPropagation()
      const newMatrix = renderMatrix.filter((_, index) => index !== rowIndex)
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
