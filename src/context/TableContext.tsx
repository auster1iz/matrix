import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { Cell, Row } from '../types/cell'
import { generateId } from '../utils/id-generator'
import { generateArray } from '../utils/generateArray'
import { getRandomNumber } from '../utils/getRandomNumber'

const MIN_NUMBER = 1
const MAX_NUMBER = 999

interface TableContextProviderProps {
  children: ReactNode
}

interface InitialContextValuesType {
  addRowsLength: (value: string) => void
  addColumnsLength: (value: string) => void
  matrix: Row[]
}

const InitialContextValues: InitialContextValuesType = {
  addRowsLength: (value) => null,
  addColumnsLength: (value) => null,
  matrix: [],
}

export const TableContext =
  createContext<InitialContextValuesType>(InitialContextValues)

export const useTableContext = () => useContext(TableContext)

export const TableContextProvider = ({
  children,
}: TableContextProviderProps) => {
  const [rowsLength, setRowsLength] = useState<number>(0) // M
  const [columnsLength, setColumnsLength] = useState<number>(0) // N

  const addRowsLength = useCallback((value: string) => {
    const formattedValue = Number(value)
    setRowsLength(formattedValue)
  }, [])

  const addColumnsLength = useCallback((value: string) => {
    const formattedValue = Number(value)
    setColumnsLength(formattedValue)
  }, [])

  const matrix: Row[] = useMemo(() => {
    if (rowsLength && columnsLength) {
      return generateArray(rowsLength).reduce((acc, _, index) => {
        const row: Row = {
          id: index,
          cells: [],
        }
        for (let i = 0; i < columnsLength; i++) {
          const cell: Cell = {
            id: generateId.next().value!,
            value: Math.trunc(getRandomNumber(MIN_NUMBER, MAX_NUMBER)),
          }
          row.cells.push(cell)
        }
        acc.push(row)
        return acc
      }, [])
    } else {
      return []
    }
  }, [rowsLength, columnsLength])

  const value = {
    addRowsLength,
    addColumnsLength,
    matrix,
  }

  return <TableContext.Provider value={value}>{children}</TableContext.Provider>
}
