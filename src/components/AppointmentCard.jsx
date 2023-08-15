import { Card, Container, Image } from "react-bootstrap";
import '../style/AppointmentCard.css'
import EditAppointmentModal from "./EditAppointmentModal";
import { useState } from "react";

export default function AppointmentCard({ info }) {
  const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const [show, setShow] = useState(false)
  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)
  const { title, description, available_date: availableDate, available_time: availableTime, intervalpersession: duration, username, email, phonenumber: phoneNumber, profilepic: profilePic } = info

  const sortedDays = availableDate.sort((a, b) => a - b);

  const groupedDays = [];
  let currentGroup = [sortedDays[0]];

  for (let i = 1; i < sortedDays.length; i++) {
    if (sortedDays[i] === sortedDays[i - 1] + 1) {
      currentGroup.push(sortedDays[i]);
    } else {
      groupedDays.push(currentGroup);
      currentGroup = [sortedDays[i]];
    }
  }
  groupedDays.push(currentGroup);

  const convertedGroups = groupedDays.map(group => {
    if (group.length === 1) {
      return dayNames[group[0]];
    } else if (group.length === 2) {
      return `${dayNames[group[0]]} - ${dayNames[group[1]]}`;
    } else {
      return `${dayNames[group[0]]} - ${dayNames[group[group.length - 1]]}`;
    }
  });

  const handleClick = () => {
    handleShow()
  }

  return (
    <>
      <Card onClick={handleClick} style={{ width: "20rem", backgroundColor: "#FEFEFE", border: "1.5px solid #531CB3", cursor: "pointer"}}>
        <Container id="card" className="pt-3">
          <Card.Title>{title} - {duration} minutes meeting</Card.Title>
          <Card.Text>{description}</Card.Text>
          <Card.Text>{convertedGroups.join(', ')}</Card.Text>
          <Card.Text>{availableTime[0]} - {availableTime[1]}</Card.Text>
          <Card.Text>By: </Card.Text>
          <div className="d-flex align-items-center mb-3" style={{ height: "5rem"}}>
            <Image src={profilePic} style={{ height: "100%"}} roundedCircle></Image>
            <div>
              <Card.Text className="m-0 ms-2 fw-bold">{username}</Card.Text>
              <Card.Text className="m-0 ms-2">{email}</Card.Text>
              <Card.Text className="m-0 ms-2">{phoneNumber}</Card.Text>
            </div>
          </div>
        </Container>
        <EditAppointmentModal show={show} handleClose={handleClose} info={info} />
      </Card>
    </>
  )
}
