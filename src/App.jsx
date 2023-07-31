import { BrowserRouter, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { AuthProvider } from "./components/AuthProvider";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { getAuth } from "firebase/auth";
import SectionAuth from "./components/SectionAuth";
import AuthPage from "./pages/AuthPage";
// import { Provider } from "react-redux";
// import store from "./store";

function Layout() {
  const auth = getAuth()
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/booking')
  }
  return (
    <>
      <SectionAuth>
        <Navbar className="pt-4" style={{ background: "#FAF3E9"}}>
          <Container>
            <Navbar.Brand href="/" style={{ color: "#FF7F50", fontWeight: "bold" }}>BookMyHealth</Navbar.Brand>
              <Nav>
                  <Nav.Link className="me-4" onClick={handleClick} style={{ color: "#FF7F50", fontWeight: "500" }}>Check My Booking schedule</Nav.Link>
                  <Button className="px-4 rounded-pill" style={{ background: "transparent", border: "2px solid #FF7F50", color: "#FF7F50", fontWeight: "500" }} onClick={() => auth.signOut()}>Logout</Button>
              </Nav>
          </Container>
        </Navbar>
      </SectionAuth>
      <Outlet />
    </>
  )
}

export default function App() {
  return (
    // <Provider store={store}>
      <div style={{ backgroundColor: "#FAF3E9",height: "100vh", overflow: "hidden"}}>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
              <Route path="/login" element={<AuthPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </div>
    // </Provider>
  )
}