import { useContext, useEffect, useState } from "react";
import AppointmentModal from "./AppointmentModal";
import axios from "axios";
import { AuthContext } from "./AuthProvider";
import AppointmentCard from "./AppointmentCard";
import { Spinner } from "react-bootstrap";

export default function YourAppointment() {
  const [show, setShow] = useState(false)
  const [information, setInformation] = useState([])
  const [loading, setLoading] = useState(false)

  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)
  
  const { currentUser } = useContext(AuthContext)
  const id = currentUser?.uid
  const BASE_URL = import.meta.env.VITE_BASE_URL

  useEffect(() => {
    setLoading(true)
    axios.get(`${BASE_URL}/appointment/${id}`)
      .then((result) => {
        setInformation(result.data)
      })
    setLoading(false)
  }, [BASE_URL, id, information])

  return (
    <div className="d-md-flex gap-5 justify-content-center">
      {loading ? <Spinner animation="border" /> : (

        <>
        {information.map((info, index) => (
          <div key={index} className="mt-4">
              <AppointmentCard info={info} />
  
          </div>
        ))}
          <div className="position-relative mt-4" style={{ width: "20rem", height: "19rem", border: "solid 1px #531CB3", cursor: "pointer"}} onClick={handleShow}>
            <i className="bi bi-plus-lg position-absolute top-50 start-50 translate-middle fs-1" style={{ color: "#531CB3"}}></i>
          </div>
          <AppointmentModal show={show} handleClose={handleClose} />
        </>
      )}
    </div>
  )
}
