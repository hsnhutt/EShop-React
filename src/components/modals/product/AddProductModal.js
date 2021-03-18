import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

export class AddProductModal extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch("http://localhost:62168/api/product", {
      method: "POST",
      body: JSON.stringify({
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
              Add product
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="categoryId">
                    <Form.Label>Category Id</Form.Label>
                    <Form.Control
                      type="text"
                      name="categoryId"
                      required
                      placeholder="Category Id"
                    />
                  </Form.Group>
                  <Form.Group controlId="productName">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="productName"
                      required
                      placeholder="Product Name"
                    />
                  </Form.Group>

                  <Form.Group controlId="unitPrice">
                    <Form.Label>Unit Price</Form.Label>
                    <Form.Control
                      type="text"
                      name="unitPrice"
                      required
                      placeholder="Unit Price"
                    />
                  </Form.Group>

                  <Form.Group controlId="amount">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                      type="text"
                      name="amount"
                      required
                      placeholder="Amount"
                    />
                  </Form.Group>

                  <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      name="description"
                      required
                      placeholder="Description"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Button variant="primary" type="submit">
                      Add product
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
