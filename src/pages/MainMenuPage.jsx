import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../components/AuthProvider"
import axios from "axios"

import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { RoleContext } from "../components/roleContext";
import Profile from "../components/Profile";

export default function MainMenuPage() {
    const { currentUser } = useContext(AuthContext)
    const { roles, setRoles } = useContext(RoleContext)
    const [role, setRole] = useState("")
    const id = currentUser?.uid
    const url = "https://booking-api.alfred-chinchin.repl.co"
    const navigate = useNavigate()

    useEffect(() => {
        setRoles(false)
        if (!currentUser) {
            navigate('/login')
        } else {
            axios.get(`${url}/roles/${id}`)
                .then(response => {
                    const data = response.data
                    if (!data[0]?.roles) {
                        setRoles(false)
                        navigate('/setup')
                    } else {
                        setRole(data[0].roles)
                        setRoles(true)
                    }
                })
        }
    }, [id, navigate, setRoles, currentUser])
    return (
    <div>
        {!roles ? (
            <div className="position-absolute top-50 start-50 translate-middle">
                <Spinner  animation="border" />
            </div>
            ) : (
                <Profile />
        )}
    </div>
    )
}
