import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthProvider";
import { Spinner } from "react-bootstrap";
import BookCard from "./BookCard";
import BookingModal from "./BookingModal";

export default function ShowAppointment() {
  const [information, setInformation] = useState([])
  const [loading, setLoading] = useState(false)

  const [show, setShow] = useState(false)
  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)
  
  const { currentUser } = useContext(AuthContext)
  const id = currentUser?.uid
  const BASE_URL = `https://booking-api.alfred-chinchin.repl.co`

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
              <BookCard info={info} show={show} handleClose={handleClose} handleShow={handleShow} />
              <BookingModal show={show} handleClose={handleClose} info={info} />
          </div>
        ))}
        </>
      )}
    </div>
  )
}
