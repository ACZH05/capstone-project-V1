import axios from "axios";
import { useContext, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { AuthContext } from "../components/AuthProvider";
import { RoleContext } from "../components/roleContext";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase";

export default function SetUpPage() {
  const [username, setUsername] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [profilePic, setProfilePic] = useState(null)
  const [role, setRole] = useState("")

  const BASE_URL = 'https://booking-api.alfred-chinchin.repl.co'
  const { currentUser } = useContext(AuthContext)
  const { setRoles } = useContext(RoleContext)
  const id = currentUser.uid
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let imageUrl = ""
      const img = profilePic ? profilePic  : 'default.jpg'
      const imageRef = ref(storage, `profilePictures/${img}`)
      imageUrl = await getDownloadURL(imageRef)
      console.log(imageUrl)
      
      const data = {
        username: username,
        phonenumber: phoneNumber,
        profilepic: imageUrl,
        roles: role
      }
      await axios.put(`${BASE_URL}/users/${id}`, data)
      console.log("here")
      setRoles(true)
      navigate('/')
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <div style={{ height: "100dvh", overflow: "hidden"}}>
      <Row className="flex-center" style={{ minWidth:"300px", height: "70%"}}>
            <Col className="p-0 mt-3 mx-3">
              <Container className="px-3 pt-4" style={{ width: "100%"}}>
                  <div style={{ fontSize: 32, fontWeight: "bold", color: "#531CB3"}}>Information</div>
                  <Form onSubmit={handleSubmit}>
                    <Form.Label className="mt-4">Username</Form.Label>
                    <Form.Control type="text" value={username} style={{ width: "100%"}} placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} required />

                    <Form.Label className="mt-3">Phone Number</Form.Label>
                    <Form.Control type="text" value={phoneNumber} style={{ width: "100%"}} placeholder="Exp: 0123456789" onChange={(e) => setPhoneNumber(e.target.value)} required />

                    <Form.Label className="mt-3">Profile Picture (Optional)</Form.Label>
                    <Form.Control type="file" style={{ width: "100%"}} onChange={(e) => setProfilePic(e.target.value)} />

                    <div className="inline-radio mt-3">
                        <div key={`inline-radio`} className="mb-3">
                          <Form.Check
                            inline
                            label="Student"
                            value="student"
                            name="roles"
                            type="radio"
                            id={`inline-radio-1`}
                            checked={role === "student"}
                            onChange={(e) => setRole(e.target.value)}
                          />
                          <Form.Check
                            inline
                            label="Educator"
                            value="educator"
                            name="roles"
                            type="radio"
                            id={`inline-radio-2`}
                            checked={role === "educator"}
                            onChange={(e) => setRole(e.target.value)}
                          />
                        </div>
                    </div>
                    <Button type="submit" className="mt-4 border-0 sign-up-button rounded-pill" style={{ width: "100%", backgroundColor: "#531CB3"}}>Sign Up</Button>
                  </Form>
              </Container>
            </Col>
        </Row>
    </div>
  )
}
