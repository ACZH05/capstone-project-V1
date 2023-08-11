import { useContext, useEffect } from "react"
import { AuthContext } from "../components/AuthProvider"
import axios from "axios"

import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { RoleContext } from "../components/roleContext";

export default function MainMenuPage() {
    const { currentUser } = useContext(AuthContext)
    const { setRoles } = useContext(RoleContext)
    const id = currentUser.uid
    const url = "https://booking-api.alfred-chinchin.repl.co"
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`${url}/roles/${id}`)
            .then(response => {
                const data = response.data
                if (!data[0].roles) {
                    setRoles(false)
                    navigate('/setup')
                } else {
                    setRoles(true)
                }
            })
    }, [id, navigate, setRoles])
    return (
    <div>
        <div className="position-absolute">
            <Spinner animation="border" />
        </div>
    </div>
    )
}
