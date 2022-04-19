import { Table } from "reactstrap";
import userData from "../mock-data.json";
import "./GeneralSettings.css";
import React, { useState, Fragment } from "react";
import ReadOnlyRow from "../components/ReadOnlyRow";
import EditableRow from "../components/EditableRow";
import Paper from "@mui/material/Paper";
import dickerLogoSquare from "../images/dickerLogoSquare.png";
import { Card } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const GeneralSettings = () => {
  const [contacts, setContacts] = useState(userData);
  const [editFormData, setEditFormData] = useState({
    appUserId: "",
    email: "",
    phoneNumber: "",
  });
  const [editContactId, setEditContactId] = useState(null);

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      email: editFormData.email,
      phoneNumber: editFormData.phoneNumber,
    };
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);
    newContacts[index] = editedContact;

    setContacts(newContacts);

    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      email: contact.email,
      phoneNumber: contact.phoneNumber,
    };
    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };
  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === contactId);

    newContacts.splice(index, 1);

    setContacts(newContacts);
  };

  return (
    <div>
      {/* User Profile Card */}
      <Card
        style={{ width: "900px", margin: "auto", marginTop: "25px" }}
        sx={{ boxShadow: 3 }}
      >
        <Container className="GeneralSettings">
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
            User Profile
          </Typography>
          <form onSubmit={handleEditFormSubmit}>
            <Table>
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <Fragment>
                    {editContactId === contact.id ? (
                      <EditableRow
                        editFormData={editFormData}
                        handleEditFormChange={handleEditFormChange}
                        handleCancelClick={handleCancelClick}
                      />
                    ) : (
                      <ReadOnlyRow
                        contact={contact}
                        handleEditClick={handleEditClick}
                        handleDeleteClick={handleDeleteClick}
                      />
                    )}
                  </Fragment>
                ))}
              </tbody>
            </Table>
          </form>
        </Container>
      </Card>
      {/* Return to Settings Card */}
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
          to="/settings"
          className="button button1"
          sx={{ backgroundColor: "#d9c07c", mt: 3, mb: 2 }}
          style={{ height: "30px", width: "250px", margin: "auto", color: "black" }}
        >
          Return to Settings
        </Button>
      </Card>
    </div>
  );
};
export default GeneralSettings;
