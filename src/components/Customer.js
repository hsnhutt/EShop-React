import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { Button, ButtonToolbar } from "react-bootstrap";
import { AddCustomerModal } from "./modals/customer/AddCustomerModal";
import { EditCustomerModal } from "./modals/customer/EditCustomerModal";

export class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = { customers: [], addModalShow: false, editModalShow: false };
  }
  refreshList() {
    fetch("http://localhost:62168/api/customer")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ customers: data });
      });
  }

  componentDidMount() {
    this.refreshList();
  }

  componentDidUpdate() {
    this.refreshList();
  }

  deleteCustomer(id) {
    if (window.confirm("Are you sure?")) {
      fetch("http://localhost:62168/api/customer/" + id, {
        method: "DELETE",
        header: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
    }
  }
  formatDate(string) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  }
  render() {
    const {
      customers,
      id,
      customerName,
      country,
      age,
      password,
      dateOfJoining,
    } = this.state;

    let addModalClose = () => this.setState({ addModalShow: false });

    let editModalClose = () => this.setState({ editModalShow: false });
    return (
      <div>
        <Table className="mt-4" striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Customer Id</th>
              <th>Customer Name</th>
              <th>Country</th>
              <th>Age</th>
              <th>Password</th>
              <th>Date Of Joining</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.customerName}</td>
                <td>{customer.country}</td>
                <td>{customer.age}</td>
                <td class="hidetext">{customer.password}</td>
                <td>
                  {new Intl.DateTimeFormat(['ban', 'id']).format(customer.dateOfJoining)}
                </td>
                <td>
                  <ButtonToolbar>
                    <Button
                      className="mr-2"
                      variant="info"
                      onClick={() =>
                        this.setState({
                          editModalShow: true,
                          id: customer.id,
                          customerName: customer.customerName,
                          country: customer.country,
                          age: customer.age,
                          password: customer.password,
                          dateOfJoining: customer.dateOfJoining,
                        })
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      className="mr-2"
                      variant="danger"
                      onClick={() => this.deleteCustomer(customer.id)}
                    >
                      Delete
                    </Button>
                    <EditCustomerModal
                      show={this.state.editModalShow}
                      onHide={editModalClose}
                      id={id}
                      customerName={customerName}
                      country={country}
                      age={age}
                      password={password}
                      dateOfJoining={dateOfJoining}
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
            Add Customer
          </Button>
          <AddCustomerModal
            show={this.state.addModalShow}
            onHide={addModalClose}
          />
        </ButtonToolbar>
      </div>
    );
  }
}
