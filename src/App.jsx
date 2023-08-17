import { BrowserRouter, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { AuthProvider } from "./components/AuthProvider";
import { Container, Nav, Navbar } from "react-bootstrap";
import { getAuth } from "firebase/auth";
import SectionAuth from "./components/SectionAuth";
import AuthPage from "./pages/AuthPage";
import MainMenuPage from "./pages/MainMenuPage";
import SetUpPage from "./pages/SetUpPage";
import RoleContext from "./components/roleContext";
import useLocalStorage from "use-local-storage";
import { Provider } from "react-redux";
import store from "./store";
import { TokenContext } from "./components/TokenContext";
import CheckAppointment from "./pages/CheckAppointment";
// import { Provider } from "react-redux";
// import store from "./store";

function Layout({ setRoles }) {
  const auth = getAuth()
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/check')
  }

  const logout = () => {
    setRoles(false)
    auth.signOut()
  }
  return (
    <>
      <SectionAuth>
        <Navbar expand="md" className="pt-4" style={{ background: "#FCFAFA"}}>
          <Container>
            <Navbar.Brand href="/" style={{ color: "#531CB3", fontWeight: "bold" }}>EzBook</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                  <Nav.Link className="me-4" onClick={handleClick} style={{ color: "#531CB3", fontWeight: "500" }}>Check Appointment</Nav.Link>
                  <Nav.Link className="rounded-pill" style={{ color: "#531CB3", fontWeight: "500" }} onClick={logout}>Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </SectionAuth>
      <Outlet />
    </>
  )
}

export default function App() {
  const [roles, setRoles] = useLocalStorage("roles", false)
  const [token, setToken] = useLocalStorage("token", null)
  return (
    <Provider store={store}>
    
      <div style={{ backgroundColor: "#FCFAFA",height: "100vh"}}>
        <TokenContext.Provider value={{ token, setToken }}>
          <RoleContext.Provider value={{ roles, setRoles }}>
            <AuthProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Layout setRoles={setRoles} />}>
                    <Route index element={<MainMenuPage />} />
                    <Route path="/login" element={<AuthPage />} />
                    <Route path="/setup" element={<SetUpPage />} />
                    <Route path="/check" element={<CheckAppointment />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </AuthProvider>
          </RoleContext.Provider>
        </TokenContext.Provider>
      </div>
    </Provider>
  )
}