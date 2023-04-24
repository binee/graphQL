import React from "react";
import { Container, Row, Col, Card , ListGroup} from "react-bootstrap";

const About = () => {
  return (
    <> Featured
      <Container className="p-3">
        <Row className="d-flex justify-content-center">
          <Col>
            <Card>
              <Card.Header as="h5">Featured</Card.Header>
              <Card.Body>
                <Card.Title>Special title treatment</Card.Title>
                <Card.Text>
                  With supporting text below as a natural lead-in to additional
                  content.
                </Card.Text>
              </Card.Body>
              <ListGroup variant="flush">
        <ListGroup.Item>Cras justo odio</ListGroup.Item>
        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
      </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default About;
