import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { Button, ButtonToolbar } from "react-bootstrap";
import { AddAdminModal } from "./modals/admin/AddAdminModal";
import { EditAdminModal } from "./modals/admin/EditAdminModal";

export class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = { admins: [], addModalShow: false, editModalShow: false };
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

  deleteAdmin(id) {
    if (window.confirm("Are you sure?")) {
      fetch("http://localhost:62168/api/admin/" + id, {
        method: "DELETE",
        header: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
    }
  }

  render() {
    const { admins, id, username, mail, password } = this.state;
    let addModalClose = () => this.setState({ addModalShow: false });
    let editModalClose = () => this.setState({ editModalShow: false });
    return (
      <div>
        <Table className="mt-4" striped bordered hover size="sm">
          <thead>
            <tr>
              <th>AdminId</th>
              <th>Username</th>
              <th>Mail</th>
              <th>Password</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id}>
                <td>{admin.id}</td>
                <td>{admin.username}</td>
                <td>{admin.mail}</td>
                <td class="hidetext">{admin.password}</td>
                <td>
                  <ButtonToolbar>
                    <Button
                      className="mr-2"
                      variant="info"
                      onClick={() =>
                        this.setState({
                          editModalShow: true,
                          id: admin.id,
                          username: admin.username,
                          mail: admin.mail,
                          password: admin.password,
                        })
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      className="mr-2"
                      variant="danger"
                      onClick={() => this.deleteAdmin(admin.id)}
                    >
                      Delete
                    </Button>
                    <EditAdminModal
                      show={this.state.editModalShow}
                      onHide={editModalClose}
                      id={id}
                      username={username}
                      mail={mail}
                      password={password}
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
            Add Admin
          </Button>
          <AddAdminModal
            show={this.state.addModalShow}
            onHide={addModalClose}
          />
        </ButtonToolbar>
      </div>
    );
  }
}
