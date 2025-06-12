import type { FC } from "react"
import type { ProductInput } from "../../types/product.type"
import { Link } from "react-router-dom"
import { useAuthStore } from "../../store/auth.store";



const Card: FC<ProductInput> = ({libelle,prix,quantiteEnStock }) => {

  const user = useAuthStore((state) => state.user)

  return (
    <Link to={""} className="box-card">
      <img src="/baguette-mystique-pierre.jpg" alt={libelle} className="img-fluid" />
      <div className="produit-info">
          <h2>{libelle}</h2>
          <p className="prix">{prix} Gondariar</p>
          <p className="stock">{quantiteEnStock} en stock</p>

           {user && (
            <form action="">
              <div className="mt-3">
                <label htmlFor="quantity">quantité :</label>
                <input type="number" className="form-control"  min="0" max={quantiteEnStock} />
              </div>
              <div className="mt-3">
                <button type="submit" className="btn">Ajouter Panier</button>
              </div>
            </form>
           )}
     </div>
    </Link>
  )
}

export default Card
