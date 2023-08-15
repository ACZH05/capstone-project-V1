import { Card, Container, Image } from "react-bootstrap";

export default function AppointmentCard({ title, description, availableDate, availableTime, duration, username, email, phoneNumber, profilePic }) {
  const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

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
  return (
    <>
      <Card style={{ width: "20rem", backgroundColor: "#FEFEFE", border: "1.5px solid black"}}>
        <Container className="mt-3">
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
      </Card>
    </>
  )
}
