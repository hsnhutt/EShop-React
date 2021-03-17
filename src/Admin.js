import React, { Component } from "react";
import { Table } from "react-bootstrap";
import {Button,ButtonToolbar} from "react-bootstrap";
import {AddAdminModal} from "./AddAdminModal";

export class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = { admins: [],addModalShow:false };
  }
  refreshList() {
    fetch("http://localhost:62168/api/admin")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ admins: data });
      });
  }

  componentDidMount() {
    this.refreshList();
  }

  componentDidUpdate() {
    this.refreshList();
  }

  render() {
    const { admins } = this.state;
    let addModalClose=()=>this.setState({addModalShow:false})
    return (
      <div>
        <Table className="mt-4" striped bordered hover size="sm">
          <thead>
            <tr>
              <th>AdminId</th>
              <th>Username</th>
              <th>Mail</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id}>
                <td>{admin.id}</td>
                <td>{admin.username}</td>
                <td>{admin.mail}</td>
                <td>{admin.password}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <ButtonToolbar>
            <Button variant="primary" onClick={() => this.setState({addModalShow:true})}>
                Add Admin
            </Button>
            <AddAdminModal show={this.state.addModalShow} onHide={addModalClose} />
        </ButtonToolbar>
      </div>
    );
  }
}
