import { Route } from 'react-router-dom'
import { Login } from '../pages'

export const DoublePrivateRoute = ({ path, login, ...props }) => {
  return login ? (
    <Route {...props} path={path} />
  ) : (
    <Route {...props} element={<Login />} />
  )
}