import { useContext, useEffect, useState } from "react"
import { AuthContext } from "./AuthProvider"
import axios from "axios"
import { Container, Image, Nav } from "react-bootstrap"
import ShowAppointment from "./ShowAppointment"
import YourAppointment from "./YourAppointment"

export default function Profile() {
    const { currentUser } = useContext(AuthContext)
    const [information, setInformation] = useState({})
    const [activeKey, setActiveKey] = useState("tab-1")
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
            profile
        </div>
        <Nav variant="underline" className="justify-content-center" activeKey={activeKey} onSelect={(key) => setActiveKey(key)}>
            <Nav.Item>
                <Nav.Link eventKey="tab-1">Available Appointments</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="tab-2">Your Appointment</Nav.Link>
            </Nav.Item>
        </Nav>
        <div>
            {activeKey === 'tab-1' && <ShowAppointment />}
            {activeKey === 'tab-2' && <YourAppointment />}
        </div>
    </Container>
  )
}
 