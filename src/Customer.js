import React, { Component } from "react";
import { Table } from "react-bootstrap";
import {Button,ButtonToolbar} from "react-bootstrap";
import {AddCustomerModal} from "./AddCustomerModal";

export class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = { customers: [],addModalShow:false };
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

  render() {
    const { customers } = this.state;
    let addModalClose=()=>this.setState({addModalShow:false})
    return (
      <div>
        <Table className="mt-4" striped bordered hover size="sm">
          <thead>
            <tr>
              <th>CustomerId</th>
              <th>CustomerName</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.customerName}</td>
                <td>{customer.country}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <ButtonToolbar>
            <Button variant="primary" onClick={() => this.setState({addModalShow:true})}>
                Add Customer
            </Button>
            <AddCustomerModal show={this.state.addModalShow} onHide={addModalClose} />
        </ButtonToolbar>
      </div>
    );
  }
}
