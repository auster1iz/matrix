import React, { createContext, ReactNode, useContext } from 'react'

interface TableContextProviderProps {
  children: ReactNode
}

interface InitialContextValuesType {
  value: string
}

const InitialContextValues: InitialContextValuesType = {
  value: '',
}

export const TableContext =
  createContext<InitialContextValuesType>(InitialContextValues)

export const useTableContext = () => useContext(TableContext)

export const TableContextProvider = ({
  children,
}: TableContextProviderProps) => {
  const value = {
    value: '',
  }

  return <TableContext.Provider value={value}>{children}</TableContext.Provider>
}
