import type { FC } from "react"
import type { ProductInput } from "../components/Card"
import Card from "../components/Card"

const data : Array<ProductInput >= [
    {title:"title test" , price:200 , stock: 30 , image: ""  },
    {title:"title test" , price:200 , stock: 30 , image: ""  },
    {title:"title test" , price:200 , stock: 30 , image: ""  }
]

const HomePage: FC = () => {

  return (
    <div className="container">
        <div className="row">
            {
                data.map((item , index) => {
                    return (
                        <div className="col-lg-4">
                            <Card key={index} image={item.image}   title={item.title}   price={item.price}   stock={item.stock}  />
                        </div>
                    )
                })
            }
            <div className="col-lg-8 offset-lg-2">
                <p>Entrez dans le sanctuaire en révélant votre indentité magique!!!</p>
                <form action="">
                    <div className="mt-3">
                        <input type="text" className="form-control" placeholder="votre pseudo"/>
                    </div>
                    <div className="mt-3">
                        <input type="text" className="form-control" placeholder="votre mot de passe"/>
                    </div>
                    <div className="mt-3">
                        <button type="submit" className="btn btn-primary">Connexion magique</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default HomePage
