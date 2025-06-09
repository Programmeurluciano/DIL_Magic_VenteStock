import type { FC } from "react"
import Card from "../components/Card"
import type { ProductInput } from "../../types/product.type"
import CardDuJour from "../components/CardDuJour"
import LoginForm from "../components/LoginForm"

const data : Array<ProductInput >=[
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
    }
  ]

const HomePage: FC = () => {

  return (
    <div className="container">
        <div className="row">
            {
                data.map((item , index) => {
                    console.log(index);
                    
                    if ( item.estDuJour) {
                        return (
                            <div className="col-lg-4" key={item.id}>
                                <CardDuJour  reference={item.reference} libelle={item.libelle} prix={item.prix} quantiteEnStock={item.quantiteEnStock} id={item.id} estDuJour={item.estDuJour}  />
                            </div>
                        )
                    }

                    return (
                        <div className="col-lg-4" key={item.id}>
                            <Card reference={item.reference} libelle={item.libelle} prix={item.prix} quantiteEnStock={item.quantiteEnStock} id={item.id} estDuJour={item.estDuJour}  />
                        </div>
                    )
                })
            }
            <LoginForm/>
            
        </div>
    </div>
  )
}

export default HomePage
