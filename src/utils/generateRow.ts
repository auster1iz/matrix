import { Cell, Row } from '../types/table'
import { MAX, MIN } from '../constants'
import { generateId } from './id-generator'
import { getRandomNumber } from './getRandomNumber'

export const generateRow = (columnsLength: number) => {
  const row: Row = []
  for (let i = 0; i < columnsLength; i++) {
    const cell: Cell = {
      id: generateId.next().value!,
      value: Math.trunc(getRandomNumber(MIN, MAX)),
    }
    row.push(cell)
  }

  return row
}
