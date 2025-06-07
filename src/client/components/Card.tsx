import type { FC } from "react"

 export type ProductInput = {
  image: string
  title: string
  price: number
  stock: number
}

const Card: FC<ProductInput> = ({ image, title, price, stock }) => {
  return (
    <div className="box-card">
        <div className="card-header">
            <h5 className="card-title">Produit du jour</h5>
        </div>
      <img src="/images.jfif" alt={title} className="img-fluid" />
      {/* <img src={image} alt={title} className="img-fluid" /> */}
      <h3>{title}</h3>
      <p>{price} Gondariar</p>
      <p>{stock} en stock</p>
    </div>
  )
}

export default Card
