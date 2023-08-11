import { BrowserRouter, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { AuthProvider } from "./components/AuthProvider";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { getAuth } from "firebase/auth";
import SectionAuth from "./components/SectionAuth";
import AuthPage from "./pages/AuthPage";
import MainMenuPage from "./pages/MainMenuPage";
import SetUpPage from "./pages/SetUpPage";
import { RoleContext } from "./components/roleContext";
import useLocalStorage from "use-local-storage";
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
        <Navbar className="pt-4" style={{ background: "#FCFAFA"}}>
          <Container>
            <Navbar.Brand href="/" style={{ color: "#531CB3", fontWeight: "bold" }}>BookMyHealth</Navbar.Brand>
              <Nav>
                  <Nav.Link className="me-4" onClick={handleClick} style={{ color: "#531CB3", fontWeight: "500" }}>Check My Booking schedule</Nav.Link>
                  <Button className="px-4 rounded-pill" style={{ background: "transparent", border: "2px solid #531CB3", color: "#531CB3", fontWeight: "500" }} onClick={() => auth.signOut()}>Logout</Button>
              </Nav>
          </Container>
        </Navbar>
      </SectionAuth>
      <Outlet />
    </>
  )
}

export default function App() {
  const [roles, setRoles] = useLocalStorage("roles", false)
  return (
    // <Provider store={store}>
    
      <div style={{ backgroundColor: "#FCFAFA",height: "100vh", overflow: "hidden"}}>
        <RoleContext.Provider value={{ roles, setRoles }}>
          <AuthProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<MainMenuPage />} />
                  <Route path="/login" element={<AuthPage />} />
                  <Route path="/setup" element={<SetUpPage />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </RoleContext.Provider>
      </div>
    // </Provider>
  )
}