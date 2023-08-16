import { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { AuthContext } from "./AuthProvider";
import axios from "axios";


export default function BookingModal({ show, handleClose, info }) {
    const { id: sessionId, available_date: availableDate } = info
    const { currentUser } = useContext(AuthContext)
    const id = currentUser?.uid
    const BASE_URL = 'https://booking-api.alfred-chinchin.repl.co'

    const [bookingdDate, setBookingDate] = useState("")
    const [time, setTime] = useState("")
// Monday to Friday

    const isDayDisabled = (date) => {
        const dayOfWeek = date.getDay();
        const today = new Date();
        today.setHours(0, 0, 0, 0)
        return (
            !availableDate.includes(dayOfWeek) || date < today
        );
    };

    const handleSubmit = async () => {
        const data = {
            userId: id,
            sessionId,
            bookedDate: new Date(bookingdDate).toISOString().split('T')[0],
            bookedTime: time
        }
        await axios.post(`${BASE_URL}/booking`, data)
        setBookingDate("")
        setTime("")
        handleClose()
    }

    return (
    <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>Book Appointment</Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Label>Select a time and date</Form.Label>
                    <Calendar
                        value={bookingdDate}
                        onChange={(e) => setBookingDate(e)}
                        tileDisabled={({ date }) => isDayDisabled(date)}
                    />
                    <Form.Control type="time" className="mt-4" value={time} onChange={(e) => setTime(e.target.value)} style={{ width: "22rem"}} required />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" className="rounded-pill" onClick={handleSubmit}>Book</Button>
            </Modal.Footer>
        </Modal>
    </>
  )
}
