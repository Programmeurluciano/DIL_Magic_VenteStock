import type { FC } from "react"
import type { ProductInput } from "../../types/product.type"
// import { useAuthStore } from "../../store/auth.store"
import { useState } from "react"
import Modal from "./Modal"

interface CardProps extends ProductInput {
  onAddToCart: undefined | ((productId: number, quantity: number) => void )
}

const Card: FC<CardProps> = ({ id, libelle, prix, quantiteEnStock, onAddToCart }) => {
  // const user = useAuthStore((state) => state.user)
  const user  = localStorage.getItem("user")
  const [quantity, setQuantity] = useState<number | "">("")
  const [showModal, setShowModal] = useState<boolean>(false)
  const [modalMessage, setModalMessage] = useState<string>("")

  const handleAddToCart = (e: React.FormEvent) => {
    e.preventDefault()

    const qty = Number(quantity)
    if (!Number.isInteger(qty) || qty <= 0) {
      setModalMessage("Veuillez entrer une quantité valide supérieure à 0.")
      setShowModal(true)
      return
    }

    if (quantiteEnStock < qty) {
      setModalMessage(`Désolé, il ne reste que ${quantiteEnStock} ${libelle} en stock.`)
      setShowModal(true)
      return
    }

    try {
      if(onAddToCart) {
       onAddToCart(id , qty);
     }
      setModalMessage(`${qty} ${libelle} a été ajouté à votre panier avec succès !`)
      setShowModal(true)
      setQuantity("")
    } catch (error) {
      setModalMessage("Une erreur est survenue lors de l'ajout au panier.")
      setShowModal(true)
      console.error(error)
    }
  }

  return (
    <>
      <div className="box-card">
        <img src={id+".jpg"} alt={libelle} className="img-fluid" />
        <div className="produit-info">
          <h2>{libelle}</h2>
          <p className="prix">{prix} Gondariar</p>
          <p className="stock">{quantiteEnStock} en stock</p>
        

        {user && (
          <form onSubmit={handleAddToCart}>
            <div className="mt-3">
              <label htmlFor="quantity">Quantité :</label>
              <input
                type="number"
                className="form-control"
                value={quantity}
                onChange={(e) => {
                  const val = e.target.value
                  setQuantity(val === "" ? "" : parseInt(val))
                }}
              />
            </div>
            <div className="mt-3">
              <button type="submit" className="btn">Ajouter Panier</button>
            </div>
          </form>
        )}
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={modalMessage.includes("succès") ? "Succès" : "Erreur"}
      >
        <p>{modalMessage}</p>
      </Modal>
    </>
  )
}

export default Card
