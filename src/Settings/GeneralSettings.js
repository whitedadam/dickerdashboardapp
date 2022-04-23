import { Table } from "reactstrap";
import "./GeneralSettings.css";
import React, { useState, Fragment, useEffect } from "react";
import ReadOnlyRow from "../components/ReadOnlyRow";
import EditableRow from "../components/EditableRow";
import Paper from "@mui/material/Paper";
import dickerLogoSquare from "../images/dickerLogoSquare.png";
import { Card } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import axios from "axios";

// Endpoint to gather user by ID
const url = "/api/user-by-id";

const GeneralSettings = ({ userId }) => {
  // Will consist of Merchant Data from api
  // State variable used to prevent app crashing
  // Axios function to pull user data
  const get = async () => {
    let response = await axios.post(url, { userId });
    return response;
  };

  // Will hold user data pulled from endpoint
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    get().then((response) => {
      setContacts(response.data[0]);
    });
    // disabled to avoid warning when removing array, if we remove that array post will run on every render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Function called after updating user info in form.
  // Will update the database with admin inputted info.
  const updateUserInfoInDB = async (newContacts) => {
    // Update endpoint
    const update = "/api/update-contact";

    // Post route that takes the editted admin as a param to update db
    let response = await axios.post(update, { newContacts });

    if (response.status === 200) {
      alert("Changes successfully posted to Database");
    } else alert("Error saving changes, please try again.");
  };

  // Set of state variables and functions that handle the editing of contact info
  // This is the form that will hold the updated values within the state
  const [editFormData, setEditFormData] = useState({
    Id: "",
    UserName: "",
    PhoneNumber: "",
  });
  // Used to keep track of which row the user is editing
  const [editContactId, setEditContactId] = useState(null);

  // Called to keep track of form inputs during editting.
  // Updates the edit form state value
  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    let newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  // Called when merchant clicks save on an editable row
  // Finalizes the editted changes.
  // Will want an axios post route here to post updates to backend.
  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      Id: editContactId,
      UserName: editFormData.UserName,
      PhoneNumber: editFormData.PhoneNumber,
    };
    let newContacts = [contacts];

    // POST Route to update Contact info
    // call axios POST

    newContacts = editedContact;

    setContacts(newContacts);

    updateUserInfoInDB(newContacts);

    setEditContactId(null);
  };

  // Called when user clicks edit, turns the row into an editable row.
  const handleEditClick = (event, contact) => {
    event.preventDefault();
    console.log(contact);
    setEditContactId(contact.Id);

    const formValues = {
      Id: contact.Id,
      UserName: contact.UserName,
      PhoneNumber: contact.PhoneNumber,
    };
    setEditFormData(formValues);
  };

  // Called when user is in edit mode and clicks cancel on editting a row
  const handleCancelClick = () => {
    setEditContactId(null);
  };

  return (
    <div>
      {/* Debug Button */}
      <Button
        onClick={() => {
          console.log(contacts);
        }}
      ></Button>
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
                  <th>Id</th>
                  <th>UserName</th>
                  <th>Phone Number</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <Fragment>
                  {editContactId === contacts.Id ? (
                    <EditableRow
                      editFormData={editFormData}
                      handleEditFormChange={handleEditFormChange}
                      handleCancelClick={handleCancelClick}
                      contact={contacts}
                    />
                  ) : (
                    <ReadOnlyRow
                      contact={contacts}
                      handleEditClick={handleEditClick}
                    />
                  )}
                </Fragment>
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
          style={{
            height: "30px",
            width: "250px",
            margin: "auto",
            color: "black",
          }}
        >
          Return to Settings
        </Button>
      </Card>
    </div>
  );
};
export default GeneralSettings;
