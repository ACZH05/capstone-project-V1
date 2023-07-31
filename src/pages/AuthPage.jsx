import { Col, Row, Container, Button, Form } from "react-bootstrap";
import '../style/AuthPage.css'
import { useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { AuthContext } from "../components/AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [active, setActive] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const auth = getAuth()
    const { currentUser } = useContext(AuthContext)
    const url = import.meta.env.VITE_BASE_URL

    useEffect(() => {
        if (currentUser) navigate("/")
    }, [currentUser, navigate])

    const handleSignUp = async (e) => {
        e.preventDefault()
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)
            const id = res.user.uid
            const apiRes = await axios.post(`${url}/user`, {id, phone_number: phoneNumber})
            console.log(apiRes.data)
        }
        catch (error) {
            console.error(error)
            setError("This email had already registered before.")
        }

    }

    const handleSignIn = async (e) => {
        e.preventDefault()
        try {
            await signInWithEmailAndPassword(auth, email, password)
        }
        catch (error) {
            console.error(error)
            if (error.code === "auth/wrong-password") {
                setError("Email or password incorrect.")
            }
            else if (error.code === "auth/too-many-requests") {
                setError("Sorry, you have exceeded the maximum number of allowed login attempts. For security purposes, please try again later.")
            }
        }
    }

    const handleClickSignIn = () => {
        setActive(true)
        setEmail("")
        setPassword("")
        setError(null)
    }

    const handleClickSignUp = () => {
        setActive(false)
        setEmail("")
        setPassword("")
        setPhoneNumber("")
        setError(null)
    }
  return (
    <div style={{ backgroundColor: "#FAF3E9", height: "100dvh", overflow: "hidden"}}>
        <Row className="flex-center">
            <div className={active ? "overlay active" : "overlay"} style={{ width: "50%"}}>
                {active ? (
                    <div className="d-flex flex-column position-absolute top-50 start-0 translate-middle-y mx-5" style={{color: "#FAF3E9"}}>
                    <h3>Welcome To</h3>
                    <h1>BookMyHealth</h1>
                    <p>Start booking now by signing in!</p>
                    <Button className="mt-3 border-0 sign-up-button rounded-pill fw-bold" style={{ backgroundColor: "#FAF3E9", color: "#FF7F50"}} onClick={handleClickSignUp}>Sign In</Button>
                </div>
                ) : (
                    <div className="d-flex flex-column position-absolute top-50 start-0 translate-middle-y mx-5" style={{color: "#FAF3E9"}}>
                        <h3>Welcome To</h3>
                        <h1>BookMyHealth</h1>
                        <p>First time user? Creat an account now!</p>
                        <Button className="mt-3 border-0 sign-up-button rounded-pill fw-bold" style={{ backgroundColor: "#FAF3E9", color: "#FF7F50"}} onClick={handleClickSignIn}>Sign Up</Button>
                    </div>
                )}
            </div>
            <Col className="p-0">
                <Container className="px-5 pt-4" style={{ width: "100%"}}>
                    <div style={{ fontSize: 32, fontWeight: "bold", color: "#FF7F50"}}>Sign Up</div>
                    <Form onSubmit={handleSignUp}>
                        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-5" style={{ width: "100%"}} placeholder="Enter Email" required />
                        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-4" style={{ width: "100%"}} placeholder="Enter password" required />
                        <Form.Control type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="mt-4" style={{ width: "100%"}} placeholder="Enter phone number" required />
                        <Button type="submit" className="mt-5 border-0 sign-up-button rounded-pill" style={{ width: "100%", backgroundColor: "#FF7F50"}}>Sign Up</Button>
                    </Form>
                    {error && (
                        <p className="text-danger">{error}</p>
                    )}
                </Container>
            </Col>
            <Col className="p-0">
                <Container className="px-5 pt-4" style={{ width: "100%"}}>
                        <div style={{ fontSize: 32, fontWeight: "bold", color: "#FF7F50"}}>Sign In</div>
                        <Form onSubmit={handleSignIn}>
                            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)}  className="mt-5" style={{ width: "100%"}} placeholder="Enter Email" required />
                            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-4" style={{ width: "100%"}} placeholder="Enter password" required />
                            <Button type="submit" className="mt-5 border-0 sign-up-button rounded-pill" style={{ width: "100%", backgroundColor: "#FF7F50"}}>Sign In</Button>
                        </Form>
                        {error && (
                            <p className="text-danger">{error}</p>
                        )}
                    </Container>
            </Col>
        </Row>
    </div>
  )
}