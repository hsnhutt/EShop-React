import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

export class EditProductModal extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch("http://localhost:62168/api/product/" + this.props.id, {
      method: "PUT",
      body: JSON.stringify({
        Id: parseInt(event.target.Id.value, 10),
        categoryId: parseInt(event.target.categoryId.value, 10),
        productName: event.target.productName.value,
        unitPrice: parseInt(event.target.unitPrice.value, 10),
        amount: parseInt(event.target.amount.value, 10),
        description: event.target.description.value,
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
              Edit Product
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
                  <Form.Group controlId="categoryId">
                    <Form.Label>categoryId</Form.Label>
                    <Form.Control
                      type="text"
                      name="categoryId"
                      required
                      defaultValue={this.props.categoryId}
                      placeholder="categoryId"
                    />
                  </Form.Group>
                  <Form.Group controlId="productName">
                    <Form.Label>productName</Form.Label>
                    <Form.Control
                      type="text"
                      name="productName"
                      required
                      defaultValue={this.props.productName}
                      placeholder="productName"
                    />
                  </Form.Group>

                  <Form.Group controlId="unitPrice">
                    <Form.Label>unitPrice</Form.Label>
                    <Form.Control
                      type="text"
                      name="unitPrice"
                      required
                      defaultValue={this.props.unitPrice}
                      placeholder="unitPrice"
                    />
                  </Form.Group>

                  <Form.Group controlId="amount">
                    <Form.Label>unitPrice</Form.Label>
                    <Form.Control
                      type="text"
                      name="amount"
                      required
                      defaultValue={this.props.amount}
                      placeholder="amount"
                    />
                  </Form.Group>

                  <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      name="description"
                      required
                      defaultValue={this.props.description}
                      placeholder="description"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Button variant="primary" type="submit">
                      Update Product
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
