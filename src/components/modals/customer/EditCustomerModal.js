import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

export class EditCustomerModal extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch("http://localhost:62168/api/customer/" + this.props.id, {
      method: "PUT",
      body: JSON.stringify({
        Id: parseInt(event.target.Id.value, 10),
        CustomerName: event.target.CustomerName.value,
        Country: event.target.Country.value,
        Age: event.target.Age.value,
        Password: event.target.Password.value,
        DateOfJoining: event.target.DateOfJoining.value,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => console.log(json))
      .then(
        (result) => {
          alert("Success");
        },
        (error) => {
          console.log(error);
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
              Edit Customer
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="Id">
                    <Form.Label>Id</Form.Label>
                    <Form.Control
                      type="text"
                      name="Id"
                      required
                      disabled
                      defaultValue={this.props.id}
                      placeholder="Id"
                    />
                  </Form.Group>
                  <Form.Group controlId="CustomerName">
                    <Form.Label>CustomerName</Form.Label>
                    <Form.Control
                      type="text"
                      name="CustomerName"
                      required
                      defaultValue={this.props.customerName}
                      placeholder="CustomerName"
                    />
                  </Form.Group>

                  <Form.Group controlId="Country">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                      type="text"
                      name="Country"
                      required
                      defaultValue={this.props.country}
                      placeholder="Country"
                    />
                  </Form.Group>

                  <Form.Group controlId="Age">
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                      type="number"
                      name="Age"
                      required
                      defaultValue={this.props.age}
                      placeholder="Age"
                    />
                  </Form.Group>

                  <Form.Group controlId="Password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="Password"
                      required
                      defaultValue={this.props.password}
                      placeholder="Password"
                    />
                  </Form.Group>

                  <Form.Group controlId="DateOfJoining">
                    <Form.Label>DateOfJoining</Form.Label>
                    <Form.Control
                      type="date"
                      name="DateOfJoining"
                      required
                      defaultValue={this.props.DateOfJoining}
                      placeholder="DateOfJoining"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Button variant="primary" type="submit">
                      Update Customer
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
