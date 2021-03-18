import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { Button, ButtonToolbar } from "react-bootstrap";
import { AddProductModal } from "./modals/product/AddProductModal";
import { EditProductModal } from "./modals/product/EditProductModal";

export class Product extends Component {
  constructor(props) {
    super(props);
    this.state = { products: [], addModalShow: false, editModalShow: false };
  }
  refreshList() {
    fetch("http://localhost:62168/api/product")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ products: data });
      });
  }

  componentDidMount() {
    this.refreshList();
  }

  componentDidUpdate() {
    this.refreshList();
  }

  deleteProduct(id) {
    if (window.confirm("Are you sure?")) {
      fetch("http://localhost:62168/api/product/" + id, {
        method: "DELETE",
        header: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
    }
  }

  render() {
    const {
      products,
      id,
      categoryId,
      productName,
      unitPrice,
      amount,
      description,
    } = this.state;
    let addModalClose = () => this.setState({ addModalShow: false });
    let editModalClose = () => this.setState({ editModalShow: false });
    return (
      <div>
        <Table className="mt-4" striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Product Id</th>
              <th>Category Id</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.categoryId}</td>
                <td>{product.productName}</td>
                <td>
                  {new Intl.NumberFormat("en-GB", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(product.unitPrice)}
                </td>
                <td>{product.amount}</td>
                <td>{product.description}</td>
                <td>
                  <ButtonToolbar>
                    <Button
                      className="mr-2"
                      variant="info"
                      onClick={() =>
                        this.setState({
                          editModalShow: true,
                          id: product.id,
                          categoryId: product.categoryId,
                          productName: product.productName,
                          unitPrice: product.unitPrice,
                          amount: product.amount,
                          description: product.description,
                        })
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      className="mr-2"
                      variant="danger"
                      onClick={() => this.deleteProduct(product.id)}
                    >
                      Delete
                    </Button>
                    <EditProductModal
                      show={this.state.editModalShow}
                      onHide={editModalClose}
                      id={id}
                      categoryId={categoryId}
                      productName={productName}
                      unitPrice={unitPrice}
                      amount={amount}
                      description={description}
                    />
                  </ButtonToolbar>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <ButtonToolbar>
          <Button
            variant="primary"
            onClick={() => this.setState({ addModalShow: true })}
          >
            Add Product
          </Button>
          <AddProductModal
            show={this.state.addModalShow}
            onHide={addModalClose}
          />
        </ButtonToolbar>
      </div>
    );
  }
}
