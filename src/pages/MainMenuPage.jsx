import { useContext, useEffect } from "react"
import { AuthContext } from "../components/AuthProvider"
import axios from "axios"

import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import Profile from "../components/Profile";
import { RolesContext } from "../components/RolesContext";

export default function MainMenuPage() {
    const { currentUser } = useContext(AuthContext)
    const { roles, setRoles } = useContext(RolesContext)
    const id = currentUser?.uid
    const url = import.meta.env.VITE_BASE_URL
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
                        setRoles(true)
                    }
                })
        }
    }, [id, navigate, setRoles, currentUser, url])
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
