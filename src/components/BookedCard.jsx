import { Card, Container, Image } from "react-bootstrap";

export default function BookedCard({ info }) {
    const { title, intervalpersession: duration, description, username, email, phonenumber: phoneNumber, profilepic: profilePic, bookeddatetime: bookedDateTime } = info
    const isoDate = new Date(bookedDateTime)

    const localDate = isoDate.toLocaleDateString("en-GB")
    const localTime = isoDate.toLocaleTimeString()

    const endTime = new Date(isoDate.getTime() + duration * 60000)
    const localEndTime = endTime.toLocaleTimeString()
  return (
    <div>
      <Card style={{ width: "20rem", backgroundColor: "#531CB3", border: "1.5px solid #531CB3", color: "white"}}>
        <Container className="pt-3">
          <Card.Title>{title} - {duration} minutes meeting</Card.Title>
          <Card.Text>{description}</Card.Text>
          <Card.Text>{localDate}</Card.Text>
          <Card.Text>{localTime} - {localEndTime}</Card.Text>
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
    </div>
  )
}
