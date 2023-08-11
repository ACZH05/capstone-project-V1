import { useContext } from "react"
import { AuthContext } from "./AuthProvider"
import { RoleContext } from "./roleContext"

export default function SectionAuth({ children }) {
    const { currentUser } = useContext(AuthContext)
    const { roles } = useContext(RoleContext)
    console.log(roles)
    
    if (!currentUser || !roles) return
    return (
    <>
        { children }
    </>
    )
}
