import { Col, Row, Container, Button, Form } from "react-bootstrap";
import '../style/AuthPage.css'
import { useContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
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

    const provider = new GoogleAuthProvider()

    useEffect(() => {
        if (currentUser) navigate("/")
    }, [currentUser, navigate])

    const handleGoogleLogin = async () => {
        try {
            signInWithPopup(auth, provider)
        }
        catch (error) {
            console.log(error.code)
        }
    }

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

    const handleClickSignIn = (e) => {
        e.preventDefault()
        setActive(true)
        setEmail("")
        setPassword("")
        setError(null)
    }

    const handleClickSignUp = (e) => {
        e.preventDefault()
        setActive(false)
        setEmail("")
        setPassword("")
        setPhoneNumber("")
        setError(null)
    }
  return (
    <div style={{ backgroundColor: "#FCFAFA", height: "100dvh", overflow: "hidden"}}>
        <Row className="flex-center" style={{ minWidth:"300px", height: "70%"}}>
            <Col className="p-0 d-inline-flex mt-3 mx-3">
                {active ? (
                    <Container className="px-3 pt-4" style={{ width: "100%"}}>
                        <div style={{ fontSize: 32, fontWeight: "bold", color: "#531CB3"}}>Sign Up</div>
                        <Form onSubmit={handleSignUp}>
                            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-5" style={{ width: "100%"}} placeholder="Enter Email" required />
                            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-4" style={{ width: "100%"}} placeholder="Enter password" required />
                            <Button type="submit" className="mt-5 border-0 sign-up-button rounded-pill" style={{ width: "100%", backgroundColor: "#531CB3"}}>Sign Up</Button>
                            <p className="mt-3 text-center"><a href="" onClick={handleClickSignUp}>Got an account? Click here to sign in!</a></p>
                        </Form>
                    </Container>
                ) : (
                    <Container className="px-3 pt-4">
                        <div style={{ fontSize: 32, fontWeight: "bold", color: "#531CB3"}}>Sign In</div>
                        <Form onSubmit={handleSignIn}>
                            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)}  className="mt-5" style={{ width: "100%"}} placeholder="Enter Email" required />
                            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-4" style={{ width: "100%"}} placeholder="Enter password" required />
                            {error && (
                                <p className="text-danger mt-3">{error}</p>
                            )}
                            <Button type="submit" className="mt-4 border-0 sign-up-button rounded-pill" style={{ width: "100%", backgroundColor: "#531CB3"}}>Sign In</Button>
                            <hr />
                            <Button variant="outline-dark" className="rounded-pill" style={{ width: "100%"}} onClick={handleGoogleLogin}><i className="bi bi-google me-2"></i>continue with google</Button>
                        </Form>
                        <p className="mt-3 text-center"><a href="" onClick={handleClickSignIn}>First time? Click here to sign up!</a></p>
                    </Container>

                )}
            </Col>
            <Col className="p-0 row-cols-1 position-relative d-none d-xl-inline-flex" style={{backgroundColor: "#531CB3", borderRadius: "0 20px 20px 0"}}>
                <Container className="" style={{ width: "100%"}}>
                        <div className="position-absolute top-50 start-50 translate-middle" style={{color: "#FCFAFA"}}>
                        <h3>Welcome To</h3>
                        <h1 className="text-center">EzBook</h1>
                    </div>
                    </Container>
            </Col>
        </Row>
    </div>
  )
}