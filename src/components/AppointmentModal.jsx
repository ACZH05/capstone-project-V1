// import { useState } from "react";
import { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { AuthContext } from "./AuthProvider";
import axios from "axios";

export default function AppointmentModal({ show, handleClose }) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState([])
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [duration, setDuration] = useState(30)

    const { currentUser } = useContext(AuthContext)
    const BASE_URL = `https://booking-api.alfred-chinchin.repl.co`

    const handleChange = (e) => {
        const { value, checked } = e.target
        
        if (checked) {
            setDate([...date, value])
        } else {
            setDate(date.filter((e) => e !== value))
        }
    }

    const handleClick = async () => {
        const id = currentUser.uid
        const data = {
            title,
            description,
            availableDate: date,
            availableTime: [startTime, endTime],
            duration,
            user_id: id
        }
        await axios.post(`${BASE_URL}/appointment`, data)
        setTitle("")
        setDescription("")
        setDate("")
        setStartTime("")
        setEndTime("")
        setDuration(30)
        handleClose()
    }

    return (
    <>
        <Modal show={show} onHide={handleClose} fullscreen>
            <Modal.Header closeButton>Create Appointment</Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label>Event Name</Form.Label>
                    <Form.Control className="" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

                    <Form.Label className="mt-4">Description</Form.Label>
                    <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} required />

                    <Form.Label className="mt-4">Available Days</Form.Label>
                    <div className="inline-check mt-3">
                        <div key={`inline-check`} className="mb-3">
                          <Form.Check inline label="SUN" value={0} name="roles" id={`inline-check-1`} onChange={handleChange}/>
                          <Form.Check inline label="MON" value={1} name="roles" id={`inline-check-2`} onChange={handleChange}/>
                          <Form.Check inline label="TUE" value={2} name="roles" id={`inline-check-3`} onChange={handleChange}/>
                          <Form.Check inline label="WED" value={3} name="roles" id={`inline-check-4`} onChange={handleChange}/>
                          <Form.Check inline label="THU" value={4} name="roles" id={`inline-check-5`} onChange={handleChange}/>
                          <Form.Check inline label="FRI" value={5} name="roles" id={`inline-check-6`} onChange={handleChange}/>
                          <Form.Check inline label="SAT" value={6} name="roles" id={`inline-check-7`} onChange={handleChange}/>
                        </div>
                    </div>


                    <Form.Label className="mt-4">Available Time</Form.Label>
                    <div className="d-flex align-items-baseline">
                        <Form.Control type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} style={{ width: "10rem"}} required />
                        <i className="bi bi-dash-lg mx-3"></i>
                        <Form.Control type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} style={{ width: "10rem"}} required />
                    </div>

                    <Form.Label className="mt-4">Duration</Form.Label>
                    <Form.Select value={duration} onChange={(e) => setDuration(e.target.value)} aria-label="Default select example" required>
                        <option value={30}>30 minutes</option>
                        <option value={60}>1 hour</option>
                        <option value={90}>1 hour 30 minutes</option>
                        <option value={120}>2 hours</option>
                    </Form.Select>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" className="rounded-pill" onClick={handleClick} required>Create</Button>
            </Modal.Footer>
        </Modal>
    </>
  )
}