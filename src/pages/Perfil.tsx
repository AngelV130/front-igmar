import { useAuth } from "@/contexts/Sesion"

export default function Perfil() {
    const {user} = useAuth()
    
    return (
       <>
            <h1>Perfil</h1>
            <p>Nombre: {user?.name}</p>
            <p>Email: {user?.email}</p>
            <p>UID: {user?.id}</p>
       </> 
    )
}