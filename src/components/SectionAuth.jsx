import { useContext } from "react"
import { AuthContext } from "./AuthProvider"

export default function SectionAuth({ children }) {
    const { currentUser } = useContext(AuthContext)

    if (!currentUser) return
    return (
    <>
        { children }
    </>
    )
}
