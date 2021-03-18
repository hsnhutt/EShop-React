import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

export class EditAdminModal extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch("http://localhost:62168/api/admin/" + this.props.id, {
      method: "PUT",
      body: JSON.stringify({
        Id: parseInt(event.target.Id.value,10) ,
        Username: event.target.Username.value,
        Mail: event.target.Mail.value,
        Password: event.target.Password.value,
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
              Edit Admin
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
                  <Form.Group controlId="Username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      name="Username"
                      required
                      defaultValue={this.props.username}
                      placeholder="Username"
                    />
                  </Form.Group>

                  <Form.Group controlId="Mail">
                    <Form.Label>Mail</Form.Label>
                    <Form.Control
                      type="email"
                      name="Mail"
                      required
                      defaultValue={this.props.mail}
                      placeholder="Mail"
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

                  <Form.Group>
                    <Button variant="primary" type="submit">
                      Update Admin
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
