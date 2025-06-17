import { useEffect, useState, type FC } from "react"
import Card from "../components/Card"
import type { ProductInput } from "../../types/product.type"
import CardDuJour from "../components/CardDuJour"
import LoginForm from "../components/LoginForm"
import Modal from "../components/Modal"
// import { useAuthStore } from "../../store/auth.store"

const limitedDataTest: Array<ProductInput> = [
  {
    "id": 4,
    "reference": "PROD004",
    "libelle": "Baguette Mystique",
    "estDuJour": true,
    "prix": 150000,
    "quantiteEnStock": 15
  },
  {
    "id": 5,
    "reference": "PROD005",
    "libelle": "Potion d'Invisibilité",
    "estDuJour": false,
    "prix": 75000,
    "quantiteEnStock": 30
  },
  {
    "id": 3,
    "reference": "PROD003",
    "libelle": "Anneau de Téléportation",
    "estDuJour": false,
    "prix": 120000,
    "quantiteEnStock": 25
  }
]

const dataTest: Array<ProductInput> = [
  {
    "id": 1,
    "reference": "PROD001",
    "libelle": "Épée de Flammes Éternelles",
    "estDuJour": false,
    "prix": 250000,
    "quantiteEnStock": 8
  },
  {
    "id": 2,
    "reference": "PROD002",
    "libelle": "Bouclier de Lumière Divine",
    "estDuJour": true,
    "prix": 180000,
    "quantiteEnStock": 12
  },
  {
    "id": 3,
    "reference": "PROD003",
    "libelle": "Anneau de Téléportation",
    "estDuJour": false,
    "prix": 120000,
    "quantiteEnStock": 25
  },
  {
    "id": 4,
    "reference": "PROD004",
    "libelle": "Baguette Mystique",
    "estDuJour": true,
    "prix": 150000,
    "quantiteEnStock": 15
  },
  {
    "id": 5,
    "reference": "PROD005",
    "libelle": "Potion d'Invisibilité",
    "estDuJour": false,
    "prix": 75000,
    "quantiteEnStock": 30
  },
  {
    "id": 6,
    "reference": "PROD006",
    "libelle": "Grimoire des Anciens",
    "estDuJour": true,
    "prix": 300000,
    "quantiteEnStock": 5
  },
  {
    "id": 7,
    "reference": "PROD007",
    "libelle": "Cape d'Invisibilité",
    "estDuJour": false,
    "prix": 200000,
    "quantiteEnStock": 7
  },
  {
    "id": 8,
    "reference": "PROD008",
    "libelle": "Cristal de Guérison",
    "estDuJour": true,
    "prix": 95000,
    "quantiteEnStock": 20
  },
  {
    "id": 9,
    "reference": "PROD009",
    "libelle": "Bottes de Vitesse",
    "estDuJour": false,
    "prix": 135000,
    "quantiteEnStock": 18
  },
  {
    "id": 10,
    "reference": "PROD010",
    "libelle": "Amulette de Protection",
    "estDuJour": false,
    "prix": 110000,
    "quantiteEnStock": 22
  }
]

interface CartItem {
  productId: number
  productName: string
  quantity: number
  price: number
}

const HomePage: FC = () => {
  // const user = useAuthStore((state) => state.user)
  const user = localStorage.getItem("user")
  const initialData = user ? dataTest : limitedDataTest
  
  const [data, setData] = useState<ProductInput[]>(initialData)
  const [showCart, setShowCart] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [showStats, setShowStats] = useState(false)

  useEffect(() => {
    if (user || localStorage.getItem("user")) {
      setData(dataTest)
    } else {
      setData(limitedDataTest)
      setCartItems([])
    }
  }, [user])

  const getProductStats = () => {
    const totalProducts = data.length
    const totalStock = data.reduce((sum, product) => sum + product.quantiteEnStock, 0)
    const productsOfTheDay = data.filter(product => product.estDuJour).length
    const averagePrice = data.reduce((sum, product) => sum + product.prix, 0) / data.length
    const mostExpensive = data.reduce((prev, current) => 
      prev.prix > current.prix ? prev : current
    )
    const cheapest = data.reduce((prev, current) => 
      prev.prix < current.prix ? prev : current
    )
    
    return {
      totalProducts,
      totalStock,
      productsOfTheDay,
      averagePrice,
      mostExpensive,
      cheapest
    }
  }

const addToCart = (product: ProductInput, quantity: number) => {
  console.log("qt ",quantity);
  
  const currentProduct = data.find(p => p.id === product.id)
  if (!currentProduct) return

  if (currentProduct.quantiteEnStock < quantity) {
    alert(`Stock insuffisant! Il ne reste que ${currentProduct.quantiteEnStock} unités.`)
    return
  }

  const existingItem = cartItems.find(item => item.productId === product.id)
  
  if (existingItem) {
    const newQuantity = existingItem.quantity + quantity
    const totalAvailableStock = currentProduct.quantiteEnStock + existingItem.quantity
    
    if (newQuantity > totalAvailableStock) {
      alert(`Stock insuffisant! Maximum disponible: ${totalAvailableStock}`)
      return
    }
    
    setCartItems(prevItems => 
      prevItems.map(item =>
        item.productId === product.id
          ? { ...item, quantity: newQuantity }
          : item
      )
    )
  } else {
    setCartItems(prevItems => [
      ...prevItems,
      {
        productId: product.id,
        productName: product.libelle,
        quantity: quantity,
        price: product.prix
      }
    ])
  }

  setData(prevData => 
    prevData.map(item => 
      item.id === product.id 
        ? { ...item, quantiteEnStock: item.quantiteEnStock - quantity }
        : item
    )
  )
}

  const removeFromCart = (productId: number) => {
    const itemToRemove = cartItems.find(item => item.productId === productId)
    if (itemToRemove) {
      setData(prevData => 
        prevData.map(item => 
          item.id === productId 
            ? { ...item, quantiteEnStock: item.quantiteEnStock + itemToRemove.quantity }
            : item
        )
      )
    }
    setCartItems(prevItems => prevItems.filter(item => item.productId !== productId))
  }

  const updateCartQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId)
      return
    }

    const currentItem = cartItems.find(item => item.productId === productId)
    const product = data.find(p => p.id === productId)
    
    if (currentItem && product) {
      const quantityDiff = newQuantity - currentItem.quantity
      const totalAvailableStock = product.quantiteEnStock + currentItem.quantity
      
      if (newQuantity > totalAvailableStock) {
        alert(`Stock insuffisant! Maximum disponible: ${totalAvailableStock}`)
        return
      }

      setCartItems(prevItems => 
        prevItems.map(item =>
          item.productId === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      )

      setData(prevData => 
        prevData.map(item => 
          item.id === productId 
            ? { ...item, quantiteEnStock: item.quantiteEnStock - quantityDiff }
            : item
        )
      )
    }
  }

  const clearCart = () => {
    cartItems.forEach(cartItem => {
      setData(prevData => 
        prevData.map(item => 
          item.id === cartItem.productId 
            ? { ...item, quantiteEnStock: item.quantiteEnStock + cartItem.quantity }
            : item
        )
      )
    })
    setCartItems([])
  }

  const validateOrder = () => {
    if (cartItems.length === 0) return
    
    const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const confirmMessage = `Confirmer la commande de ${cartItems.length} article(s) pour un total de ${totalAmount.toLocaleString()} Gondariar ?`
    
    if (window.confirm(confirmMessage)) {
      alert('Commande validée avec succès! 🎉')
      setCartItems([])
      setShowCart(false)
    }
  }

  const stats = getProductStats()

  return (
    <div className="container">
      {user && (
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h2>🧙‍♂️ Bienvenue, {user || 'Mage'} !</h2>
              <p className="text-muted">Découvrez nos objets magiques enchantés</p>
            </div>
            <div className="d-flex gap-2">
              <button 
                onClick={() => setShowStats(true)}
                className="btn btn-info magic-button"
              >
                📊 Statistiques
              </button>
              <button 
                onClick={() => setShowCart(true)}
                className="btn btn-primary magic-button position-relative"
              >
                🛒 Panier 
                {cartItems.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartItems.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-3">
              <div className="card text-white" style={{backgroundColor: '#D2B48C'}}>
                <div className="card-body text-center">
                  <h5>🛍️ Produits</h5>
                  <h3>{stats.totalProducts}</h3>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-white" style={{backgroundColor: '#DEB887'}}>
                <div className="card-body text-center">
                  <h5>⭐ Du Jour</h5>
                  <h3>{stats.productsOfTheDay}</h3>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-white" style={{backgroundColor: '#F5F5DC'}}>
                <div className="card-body text-center">
                  <h5 className="text-dark">📦 Stock Total</h5>
                  <h3 className="text-dark">{stats.totalStock}</h3>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-white" style={{backgroundColor: '#D2691E'}}>
                <div className="card-body text-center">
                  <h5>🛒 Panier</h5>
                  <h3>{cartItems.reduce((total, item) => total + item.quantity, 0)}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="row">
        {user ? (
          data.map((item) => {
            if (item.estDuJour) {
              return (
                <div className="col-lg-4 col-md-6 mb-4" key={item.id}>
                  <CardDuJour 
                    {...item} 
                    onAddToCart={(quantity) => addToCart(item, quantity)} 
                  />
                </div>
              )
            }
            return (
              <div className="col-lg-4 col-md-6 mb-4" key={item.id}>
                <Card 
                  {...item} 
                  onAddToCart={(quantity) => addToCart(item, quantity)} 
                />
              </div>
            )
          })
        ) : (
          <>
            {data.map((item) => {
              if (item.estDuJour) {
                return (
                  <div className="col-lg-4 col-md-6 mb-4" key={item.id}>
                    <CardDuJour 
                      {...item} 
                      onAddToCart={undefined}
                    />
                  </div>
                )
              }
              return (
                <div className="col-lg-4 col-md-6 mb-4" key={item.id}>
                  <Card 
                    {...item} 
                    onAddToCart={undefined}
                  />
                </div>
              )
            })}
            
            <LoginForm />
          </>
        )}
      </div>

      <Modal 
        isOpen={showCart}
        onClose={() => setShowCart(false)}
        title="🛒 Votre Panier Magique"
      >
        {cartItems.length === 0 ? (
          <div className="text-center py-4">
            <p className="fs-5">🪄 Votre panier est vide</p>
            <p className="text-muted">Ajoutez des objets enchantés pour commencer votre aventure!</p>
          </div>
        ) : (
          <div className="cart-items">
            <table className="table magic-table">
              <thead>
                <tr>
                  <th>Produit</th>
                  <th>Quantité</th>
                  <th>Prix unitaire</th>
                  <th>Sous-total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.productId}>
                    <td>{item.productName}</td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <button 
                          onClick={() => updateCartQuantity(item.productId, item.quantity - 1)}
                          className="btn btn-sm btn-outline-secondary"
                        >
                          -
                        </button>
                        <span className="fw-bold">{item.quantity}</span>
                        <button 
                          onClick={() => updateCartQuantity(item.productId, item.quantity + 1)}
                          className="btn btn-sm btn-outline-secondary"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>{item.price.toLocaleString()} G</td>
                    <td className="fw-bold">{(item.price * item.quantity).toLocaleString()} G</td>
                    <td>
                      <button 
                        onClick={() => removeFromCart(item.productId)}
                        className="btn btn-sm btn-danger"
                        title="Supprimer du panier"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="table-dark">
                  <th colSpan={3}>Total de la commande</th>
                  <th className="fs-5">
                    {cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString()} Gondariar
                  </th>
                  <th></th>
                </tr>
              </tfoot>
            </table>
            <div className="d-flex justify-content-between mt-3">
              <button 
                onClick={clearCart}
                className="btn btn-warning"
              >
                🧹 Vider le panier
              </button>
              <button 
                onClick={validateOrder}
                className="btn btn-success btn-lg"
                disabled={cartItems.length === 0}
              >
                ✨ Valider la commande
              </button>
            </div>
          </div>
        )}
      </Modal>

      <Modal 
        isOpen={showStats}
        onClose={() => setShowStats(false)}
        title="📊 Statistiques de la boutique"
      >
        <div className="stats-content">
          <div className="row">
            <div className="col-md-6">
              <div className="card mb-3">
                <div className="card-body">
                  <h6 className="card-title">📦 Inventaire</h6>
                  <p>Produits totaux: <strong>{stats.totalProducts}</strong></p>
                  <p>Stock total: <strong>{stats.totalStock} unités</strong></p>
                  <p>Produits du jour: <strong>{stats.productsOfTheDay}</strong></p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card mb-3">
                <div className="card-body">
                  <h6 className="card-title">💰 Prix</h6>
                  <p>Prix moyen: <strong>{Math.round(stats.averagePrice).toLocaleString()} G</strong></p>
                  <p>Plus cher: <strong>{stats.mostExpensive.libelle}</strong></p>
                  <p>Moins cher: <strong>{stats.cheapest.libelle}</strong></p>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h6 className="card-title">🛒 Votre session</h6>
              <p>Articles dans le panier: <strong>{cartItems.length}</strong></p>
              <p>Quantité totale: <strong>{cartItems.reduce((total, item) => total + item.quantity, 0)}</strong></p>
              <p>Valeur du panier: <strong>{cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString()} G</strong></p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default HomePage