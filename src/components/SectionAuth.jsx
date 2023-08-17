import { useContext } from "react"
import { AuthContext } from "./AuthProvider"
import { RolesContext } from "./RolesContext"


export default function SectionAuth({ children }) {
    const { currentUser } = useContext(AuthContext)
    const { roles } = useContext(RolesContext)
    console.log(roles)
    
    if (!currentUser || !roles) return
    return (
    <>
        { children }
    </>
    )
}
