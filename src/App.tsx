import React from 'react'
import { TablePage } from './pages/TablePage'
import { TableContextProvider } from './context/TableContext'

function App() {
  return (
    <div className="app">
      <TableContextProvider>
        <TablePage />
      </TableContextProvider>
    </div>
  )
}

export default App
