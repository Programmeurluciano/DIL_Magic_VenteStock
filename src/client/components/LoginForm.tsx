import type { FC } from "react";


const LoginForm: FC = () => {
    return (
        <>
        <div className="col-lg-12 text-center mt-6">
            <h1>Entrez dans le sanctuaire en révélant votre indentité magique!!!</h1>
        </div>
        <div className="col-lg-8 offset-lg-2">
            <form action=""className="form-magique">
                <div className="mt-3">
                    <input type="text" className="form-control" placeholder="votre pseudo"/>
                </div>
                <div className="mt-3">
                    <input type="text" className="form-control" placeholder="votre mot de passe"/>
                </div>
                <div className="mt-3 text-center">
                    <button type="submit" className="btn btn-magique">Connexion magique</button>
                </div>
            </form>
        </div>
        </>
    )
}

export default LoginForm;

            
