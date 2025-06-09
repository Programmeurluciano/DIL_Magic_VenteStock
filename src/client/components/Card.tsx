import type { FC } from "react"
import type { ProductInput } from "../../types/product.type"
import { Link } from "react-router-dom"



const Card: FC<ProductInput> = ({libelle,prix,quantiteEnStock,reference }) => {
  return (
    <Link to={""} className="box-card">
      <img src="/baguette-mystique-pierre.jpg" alt={libelle} className="img-fluid" />
      <div className="produit-info">
          <h2>{libelle}</h2>
          <p className="prix">{prix} Gondariar</p>
          <p className="stock">{quantiteEnStock} en stock</p>
     </div>
    </Link>
  )
}

export default Card
