import { useContext, useEffect, useState } from "react"
import { AuthContext } from "./AuthProvider"
import axios from "axios"
import { Col, Container, Image, Nav, Row } from "react-bootstrap"
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
        <div className="d-flex flex-column flex-md-row justify-content-center align-items-center">
            <div>
                <Image src={information.profilepic} className="mt-4" style={{ width: "175px"}} roundedCircle />
            </div>
            <div className="ms-4 mt-4">
                <h1 className="m-0">{information.username}</h1>
                <p className="m-0 fs-4">{information.email}</p>
                <p className="m-0 mt-3">Phone Number: {information.phonenumber}</p>
                <p className="m-0">Roles: {information.roles}</p>
            </div>
        </div>
        <Nav variant="underline" className="mt-3 justify-content-center" activeKey={activeKey} onSelect={(key) => setActiveKey(key)}>
            <Nav.Item>
                <Nav.Link eventKey="tab-1">Available Appointments</Nav.Link>
            </Nav.Item>
            {information.roles === "educator" && (
                <Nav.Item>
                    <Nav.Link eventKey="tab-2">Your Appointment</Nav.Link>
                </Nav.Item>
            )}
        </Nav>
        <div>
            {activeKey === 'tab-1' && <ShowAppointment />}
            {activeKey === 'tab-2' && information.roles === "educator" && <YourAppointment />}
        </div>
    </Container>
  )
}
 