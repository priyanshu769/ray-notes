import { createContext, useContext, useReducer } from 'react'
import { reducer, initialState } from '../utils/reducer'

const AppContext = createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  return useContext(AppContext)
}

export default AppProvider
