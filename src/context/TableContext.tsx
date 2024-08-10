import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { Cell, Row } from '../types/table'
import { generateArray } from '../utils/generateArray'
import { validateNumber } from '../utils/validateNumber'
import { ERROR_MESSAGE, ERROR_MESSAGE_X, ONE_ELEMENT } from '../constants'
import { generateRow } from '../utils/generateRow'

interface TableContextProviderProps {
  children: ReactNode
}

interface InitialContextValuesType {
  addRowsLength: (value: number) => void
  addColumnsLength: (value: number) => void
  addNearestValuesLength: (value: number) => void
  increaseCellValue: (rowIndex: number, cellIndex: number) => void
  removeRow: (
    event: React.MouseEvent<HTMLTableCellElement>,
    rowId: number,
  ) => void
  addRow: () => void
  findNearestValues: (cell: Cell) => void
  clearNearestValues: () => void
  renderMatrix: Row[]
  nearestValues: number[]
}

const InitialContextValues: InitialContextValuesType = {
  addRowsLength: () => null,
  addColumnsLength: () => null,
  addNearestValuesLength: () => null,
  increaseCellValue: () => null,
  removeRow: () => null,
  addRow: () => null,
  findNearestValues: () => null,
  clearNearestValues: () => null,
  renderMatrix: [],
  nearestValues: [],
}

export const TableContext =
  createContext<InitialContextValuesType>(InitialContextValues)

export const useTableContext = () => useContext(TableContext)

export const TableContextProvider = ({
  children,
}: TableContextProviderProps) => {
  const [rowsLength, setRowsLength] = useState<number>(0) // M
  const [columnsLength, setColumnsLength] = useState<number>(0) // N
  const [nearestValuesLength, setNearestValuesLength] = useState<number>(0) // X
  const [renderMatrix, setRenderMatrix] = useState<Row[]>([])
  const [nearestValues, setNearestValues] = useState<number[]>([])

  const addRowsLength = useCallback((value: number) => {
    if (validateNumber(value)) {
      setRowsLength(value)
    } else {
      alert(ERROR_MESSAGE)
    }
  }, [])

  const addColumnsLength = useCallback((value: number) => {
    if (validateNumber(value)) {
      setColumnsLength(value)
    } else {
      alert(ERROR_MESSAGE)
    }
  }, [])

  const addNearestValuesLength = useCallback(
    (value: number) => {
      const maxValue = rowsLength * columnsLength - ONE_ELEMENT

      if (value <= maxValue) {
        setNearestValuesLength(value)
      } else {
        alert(ERROR_MESSAGE_X + maxValue)
      }
    },
    [rowsLength, columnsLength],
  )

  const generateMatrix = useCallback(() => {
    if (rowsLength && columnsLength) {
      const matrix = generateArray(rowsLength).reduce((arr) => {
        const row = generateRow(columnsLength)
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

  const addRow = useCallback(() => {
    const row = generateRow(columnsLength)
    setRenderMatrix((prev) => [...prev, row])
  }, [renderMatrix, columnsLength])

  const removeRow = useCallback(
    (event: React.MouseEvent<HTMLTableCellElement>, rowIndex: number) => {
      event.stopPropagation()

      const newMatrix = renderMatrix.filter((_, index) => index !== rowIndex)
      setRenderMatrix(newMatrix)

      if (!newMatrix.length) {
        setRowsLength(0)
        setColumnsLength(0)
      }

      setNearestValuesLength(0)
    },
    [renderMatrix],
  )

  const findNearestValues = useCallback(
    (cell: Cell) => {
      const cells = renderMatrix.flat(1).filter((c) => c.id !== cell.id)
      const differences = cells.map((c) => ({
        cell: c,
        difference: Math.abs(c.value - cell.value),
      }))

      differences.sort((a, b) => a.difference - b.difference)
      const nearest = differences
        .slice(0, nearestValuesLength)
        .map((item) => item.cell.id)
      setNearestValues(nearest)
    },
    [renderMatrix, nearestValuesLength],
  )

  const clearNearestValues = useCallback(() => {
    setNearestValues([])
  }, [])

  useEffect(() => {
    generateMatrix()
  }, [generateMatrix])

  const value = {
    addRowsLength,
    addColumnsLength,
    addNearestValuesLength,
    increaseCellValue,
    removeRow,
    addRow,
    findNearestValues,
    clearNearestValues,
    renderMatrix,
    nearestValues,
  }

  return <TableContext.Provider value={value}>{children}</TableContext.Provider>
}
