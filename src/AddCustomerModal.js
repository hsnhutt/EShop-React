import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

export class AddCustomerModal extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    fetch("http://localhost:62168/api/customer", {
      method: "POST",
      body: JSON.stringify({
        CustomerName: event.target.CustomerName.value,
        Country: event.target.Country.value,
        Age: event.target.Age.value,
        Password: event.target.Password.value,
        DateOfJoining: event.target.DateOfJoining.value,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => console.log(json))
      .then(
        (result) => {
          alert("Success");
        },
        (error) => {
          alert("Failed");
        }
      );
  }

  render() {
    return (
      <div className="container">
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Add Customer
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="CustomerName">
                    <Form.Label>CustomerName</Form.Label>
                    <Form.Control
                      type="text"
                      name="CustomerName"
                      // required
                      placeholder="CustomerName"
                    />
                  </Form.Group>

                  <Form.Group controlId="Country">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                      type="text"
                      name="Country"
                      // required
                      placeholder="Country"
                    />
                  </Form.Group>

                  <Form.Group controlId="Age">
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                      type="number"
                      name="Age"
                      // required
                      placeholder="Age"
                    />
                  </Form.Group>

                  <Form.Group controlId="Password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="Password"
                      // required
                      placeholder="Password"
                    />
                  </Form.Group>

                  <Form.Group controlId="DateOfJoining">
                    <Form.Label>DateOfJoining</Form.Label>
                    <Form.Control
                      type="date"
                      name="DateOfJoining"
                      // required
                      placeholder="DateOfJoining"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Button variant="primary" type="submit">
                      Add Customer
                    </Button>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.props.onHide}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
