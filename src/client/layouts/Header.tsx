import { useAuthStore } from "../../store/auth.store";

function Header() {
    
    // const user = useAuthStore((state) => state.user)
    const user = localStorage.getItem("user")

    return (
        <header className="text-center" style={{marginTop:"100px"}}>
            <img src={"/logo.png"} alt="logo" width={300}/>
           <p className="mt-3">{user ? `` :`Bijoux . capes et lames de légende ... Un souffle de magie ancienne signé Gondor Chic`}</p>
        </header>
    )
}

export default Header;