// import { useState } from "react";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";

export default function EditAppointmentModal({ show, handleClose, info }) {
    const { title, description, available_date: availableDate, available_time: availableTime, intervalpersession: duration, id } = info
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

    const [newTitle, setNewTitle] = useState(title)
    const [newDescription, setNewDescription] = useState(description)
    const [newDate, setNewDate] = useState(availableDate)
    const [newStartTime, setNewStartTime] = useState(availableTime[0])
    const [newEndTime, setNewEndTime] = useState(availableTime[1])
    const [newDuration, setNewDuration] = useState(duration)

    const BASE_URL = import.meta.env.VITE_BASE_URL

    const handleChange = (index) => {
        if (newDate.includes(index)) {
            setNewDate(newDate.filter(day => day !== index));
          } else {
            setNewDate([...newDate, index]);
          }
          console.log(newDate)
    }

    const handleClick = async () => {
        console.log(id)
        const data = {
            title: newTitle,
            description: newDescription,
            availableDate: newDate,
            availableTime: [newStartTime, newEndTime],
            duration: newDuration
        }
        await axios.put(`${BASE_URL}/appointment/${id}`, data)
        handleClose()
    }

    const handleDelete = async () => {
        await axios.delete(`${BASE_URL}/appointment/${id}`)
        handleClose()
    }

    return (
    <>
        <Modal show={show} onHide={handleClose} fullscreen>
            <Modal.Header closeButton>Edit Appointment</Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label>Event Name</Form.Label>
                    <Form.Control className="" type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} required />

                    <Form.Label className="mt-4">Description</Form.Label>
                    <Form.Control as="textarea" rows={3} value={newDescription} onChange={(e) => setNewDescription(e.target.value)} required />

                    <Form.Label className="mt-4">Available Days</Form.Label>
                    <div className="inline-check mt-3">
                    {daysOfWeek.map((day, index) => (
                        <Form.Check
                        key={`inline-check-${index}`}
                        inline
                        label={day}
                        value={index}
                        name="roles"
                        id={`inline-check-${index}`}
                        onChange={() => handleChange(index)}
                        checked={newDate.includes(index)}
                        />
                    ))}
                    </div>


                    <Form.Label className="mt-4">Available Time</Form.Label>
                    <div className="d-flex align-items-baseline">
                        <Form.Control type="time" value={newStartTime} onChange={(e) => setNewStartTime(e.target.value)} style={{ width: "10rem"}} required />
                        <i className="bi bi-dash-lg mx-3"></i>
                        <Form.Control type="time" value={newEndTime} onChange={(e) => setNewEndTime(e.target.value)} style={{ width: "10rem"}} required />
                    </div>

                    <Form.Label className="mt-4">Duration</Form.Label>
                    <Form.Select value={newDuration} onChange={(e) => setNewDuration(e.target.value)} aria-label="Default select example" required>
                        <option value={30}>30 minutes</option>
                        <option value={60}>1 hour</option>
                        <option value={90}>1 hour 30 minutes</option>
                        <option value={120}>2 hours</option>
                    </Form.Select>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" className="rounded" onClick={handleDelete}><i className="bi bi-trash"></i></Button>
                <Button variant="primary" className="px-4 py-2 ms-3 rounded-pill" onClick={handleClick}>Edit</Button>
            </Modal.Footer>
        </Modal>
    </>
  )
}