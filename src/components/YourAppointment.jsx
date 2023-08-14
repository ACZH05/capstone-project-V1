import { useState } from "react";
import AppointmentModal from "./AppointmentModal";

export default function YourAppointment() {
  const [show, setShow] = useState(false)

  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  return (
    <div className="d-flex gap-5">
        <div className="position-relative" style={{ width: "200px", height: "200px", border: "solid 1px black", cursor: "pointer"}} onClick={handleShow}>
          <i className="bi bi-plus-lg position-absolute top-50 start-50 translate-middle fs-1 "></i>
        </div>
        <AppointmentModal show={show} handleClose={handleClose} />
    </div>
  )
}
