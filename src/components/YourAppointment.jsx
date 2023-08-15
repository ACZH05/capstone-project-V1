import { useContext, useEffect, useState } from "react";
import AppointmentModal from "./AppointmentModal";
import axios from "axios";
import { AuthContext } from "./AuthProvider";
import AppointmentCard from "./AppointmentCard";

export default function YourAppointment() {
  const [show, setShow] = useState(false)
  const [information, setInformation] = useState([])

  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)
  
  const { currentUser } = useContext(AuthContext)
  const id = currentUser?.uid
  const BASE_URL = `https://booking-api.alfred-chinchin.repl.co`

  useEffect(() => {
    axios.get(`${BASE_URL}/appointment/${id}`)
      .then((result) => {
        setInformation(result.data)
      })
  }, [BASE_URL, id])

  return (
    <div className="d-md-flex gap-5 justify-content-center">
      {information.map((info, index) => (
        <div key={index} className="mt-4">
            <AppointmentCard title={info.title} description={info.description} availableDate={info.available_date} availableTime={info.available_time} duration={info.intervalpersession} username={info.username} email={info.email} phoneNumber={info.phonenumber} profilePic={info.profilepic} />

        </div>
      ))}
        <div className="position-relative mt-4" style={{ width: "20rem", height: "19rem", border: "solid 1px black", cursor: "pointer"}} onClick={handleShow}>
          <i className="bi bi-plus-lg position-absolute top-50 start-50 translate-middle fs-1 "></i>
        </div>
        <AppointmentModal show={show} handleClose={handleClose} />
    </div>
  )
}
