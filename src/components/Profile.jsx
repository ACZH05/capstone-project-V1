import { useContext, useEffect, useState } from "react"
import { AuthContext } from "./AuthProvider"
import axios from "axios"
import { Container, Image } from "react-bootstrap"

export default function Profile() {
    const { currentUser } = useContext(AuthContext)
    const [information, setInformation] = useState({})
    const id = currentUser.uid
    const BASE_URL = 'https://booking-api.alfred-chinchin.repl.co'

    useEffect(() => {
        axios.get(`${BASE_URL}/users/${id}`)
            .then((result) => {
                setInformation(result.data[0])
            })
        }, [id])
  return (
    <Container>
        <div className="profile-section">
        </div>
        
    </Container>
  )
}
 