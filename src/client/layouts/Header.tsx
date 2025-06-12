import { useAuthStore } from "../../store/auth.store";

function Header() {
    
    const user = useAuthStore((state) => state.user)

    return (
        <header className="text-center">
            <img src={"/logo.png"} alt="logo" width={300}/>
           <p className="mt-3">{user ? `Bonjour ${user.name}` :`Bijoux . capes et lames de légende ... Un souffle de magie ancienne signé Gondor Chic`}</p>
        </header>
    )
}

export default Header;