import { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { AuthContext } from "./AuthProvider";
import axios from "axios";
import DateTimePicker from "react-datetime-picker";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { TokenContext } from "./TokenContext";


export default function BookingModal({ show, handleClose, info }) {
    const { title, description, id: sessionId, available_date: availableDate, intervalpersession: duration, email } = info
    const { currentUser } = useContext(AuthContext)
    const { token } = useContext(TokenContext)
    const id = currentUser?.uid
    const BASE_URL = 'https://booking-api.alfred-chinchin.repl.co'

    const [bookingdDateTime, setBookingDateTime] = useState("")
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
        const baseDate = new Date(bookingdDateTime.toISOString());
        const newDate = new Date(baseDate.getTime() + duration * 60000);

        const data = {
            userId: id,
            sessionId,
            bookedDateTime: bookingdDateTime.toISOString(),
        }

        const event = {
            'conferenceDataVersion': 0,
            'summary': title,
            'description': description,
            'start': {
                'dateTime': bookingdDateTime.toISOString(),
                'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
            },
            'end': {
                'dateTime': newDate.toISOString(),
                'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
            },
            'attendees': [
                { 'email': email},
                { "email": currentUser.email}
            ]
        }

        await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(event)
        }).then((data) => {
            return data.json()
        }).then((data) => {
            console.log(data)
        })

        await axios.post(`${BASE_URL}/booking`, data)
        setBookingDateTime("")
        handleClose()
    }

    return (
    <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>Book Appointment</Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Label>Select a time and date</Form.Label>
                    <DateTimePicker
                        value={bookingdDateTime}
                        onChange={(e) => setBookingDateTime(e)}
                        tileDisabled={({ date }) => isDayDisabled(date)}
                        className="ms-3"
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" className="rounded-pill" onClick={handleSubmit}>Book</Button>
            </Modal.Footer>
        </Modal>
    </>
  )
}
