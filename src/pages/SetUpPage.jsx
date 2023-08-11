import { Button, Col, Container, Form, Row } from "react-bootstrap";

export default function SetUpPage() {
  return (
    <div style={{ height: "100dvh", overflow: "hidden"}}>
      <Row className="flex-center" style={{ minWidth:"300px", height: "70%"}}>
            <Col className="p-0 mt-3 mx-3">
              <Container className="px-3 pt-4" style={{ width: "100%"}}>
                  <div style={{ fontSize: 32, fontWeight: "bold", color: "#531CB3"}}>Information</div>
                  <Form>
                    <Form.Label className="mt-4">Username</Form.Label>
                    <Form.Control type="text" style={{ width: "100%"}} placeholder="Enter username" required />

                    <Form.Label className="mt-3">Phone Number</Form.Label>
                    <Form.Control type="password" style={{ width: "100%"}} placeholder="Enter password" required />

                    <Form.Label className="mt-3">Profile Picture (Optional)</Form.Label>
                    <Form.Control type="file" style={{ width: "100%"}} />

                    <div className="inline-radio mt-3">
                        <div key={`inline-radio`} className="mb-3">
                          <Form.Check
                            inline
                            label="Student"
                            name="roles"
                            type="radio"
                            id={`inline-radio-1`}
                          />
                          <Form.Check
                            inline
                            label="Educator"
                            name="roles"
                            type="radio"
                            id={`inline-radio-2`}
                          />
                        </div>
                    </div>
                    <Button type="submit" className="mt-4 border-0 sign-up-button rounded-pill" style={{ width: "100%", backgroundColor: "#531CB3"}}>Sign Up</Button>
                  </Form>
              </Container>
            </Col>
        </Row>
    </div>
  )
}
