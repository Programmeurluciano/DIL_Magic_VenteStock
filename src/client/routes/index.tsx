import { Route } from "react-router-dom"
import ClientLayout from "../layouts/ClientLayout"
import HomePage from "../pages/HomePage"

const ClientRoutes = (
  <Route path="/" element={<ClientLayout />}>
    <Route index element={<HomePage />} />
  </Route>
)

export default ClientRoutes
