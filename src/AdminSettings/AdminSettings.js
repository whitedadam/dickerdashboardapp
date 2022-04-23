import React, { Fragment, useState } from "react";
import "./AdminSettings.css";
import { Container, Table } from "reactstrap";
import adminData from "../mock-admindata.json";
import ReadAdminRow from "../components/ReadAdminRow";
import EditableAdminRow from "../components/EditableAdminRow";
import Paper from "@mui/material/Paper";
import dickerLogoSquare from "../images/dickerLogoSquare.png";
import Typography from "@mui/material/Typography";
import { Card } from "@mui/material";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const AdminSettings = () => {
  const [merchs, setMerchs] = useState(adminData);
  const [editForm, setEditForm] = useState({
    appUserId: "",
    password: "",
    email: "",
    phoneNumber: "",
  });
  const [editAdminId, setEditAdminId] = useState(null);

  const handleEditForm = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newForm = { ...editForm };
    newForm[fieldName] = fieldValue;

    setEditForm(newForm);
  };
  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedAdmin = {
      id: editAdminId,
      appUserId: editForm.appUserId,
      password: editForm.password,
      email: editForm.email,
      phoneNumber: editForm.phoneNumber,
    };
    const newAdmins = [...merchs];

    const index = merchs.findIndex((contact) => contact.id === editAdminId);
    newAdmins[index] = editedAdmin;

    setMerchs(newAdmins);

    setEditAdminId(null);
  };
  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditAdminId(contact.id);

    const formValues = {
      appUserId: contact.appUserId,
      password: contact.password,
      email: contact.email,
      phoneNumber: contact.phoneNumber,
    };
    setEditForm(formValues);
  };
  const handleCancel = () => {
    setEditAdminId(null);
  };
  const handleDelete = (contactId) => {
    const newContacts = [...merchs];

    const index = merchs.findIndex((contact) => contact.id === contactId);

    newContacts.splice(index, 1);

    setMerchs(newContacts);
  };

  return (
    <>
      <div>
        <Card
          style={{ width: "900px", margin: "auto", marginTop: "25px" }}
          sx={{ boxShadow: 3 }}
        >
          <Container className="AdminSettings">
            <Paper
              sx={{
                boxShadow: 0,
                marginLeft: "160px",
                marginRight: "auto",
                marginTop: "15px",
                marginBottom: "15px",
              }}
            >
              <img src={dickerLogoSquare} alt={"dicker logo"} class="center" />
            </Paper>
            <Typography
              fontWeight="bold"
              id="loginHeader"
              component="h1"
              variant="h5"
              align="center"
            >
              Admin Profile
            </Typography>
            <form onSubmit={handleEditFormSubmit}>
              <Table>
                <thead>
                  <tr>
                    <th>appUserId</th>
                    <th>Password</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {merchs.map((contact) => (
                    <Fragment>
                      {editAdminId === contact.id ? (
                        <EditableAdminRow
                          editForm={editForm}
                          handleEditForm={handleEditForm}
                          handleCancel={handleCancel}
                        />
                      ) : (
                        <ReadAdminRow
                          contact={contact}
                          handleEditClick={handleEditClick}
                          handleDelete={handleDelete}
                        />
                      )}
                    </Fragment>
                  ))}
                </tbody>
              </Table>
            </form>
          </Container>
        </Card>
      </div>
      {/* Return to Dashboard Card */}
      <Card
        style={{
          margin: "25px auto auto",
          display: "table",
          padding: "inherit",
        }}
        sx={{ boxShadow: 3 }}
      >
        <Button
          component={Link}
          to="/adminDash"
          className="button button1"
          sx={{ backgroundColor: "#d9c07c", mt: 3, mb: 2 }}
          style={{
            height: "30px",
            width: "250px",
            margin: "auto",
            color: "black",
          }}
        >
          Return to Admin Dashboard
        </Button>
      </Card>
    </>
  );
};
export default AdminSettings;
