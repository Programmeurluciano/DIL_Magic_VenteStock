import { Outlet } from "react-router-dom"
import Footer from "./Footer"
import Header from "./Header"
import type { FC } from "react"
import 'bootstrap/dist/css/bootstrap.css'; 
import "../../styles/client.css"

const ClientLayout: FC = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default ClientLayout
