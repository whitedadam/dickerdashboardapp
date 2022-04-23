import React, { Fragment, useEffect, useState } from "react";
import "./AdminSettings.css";
import { Container, Table, Col, Row, Spinner } from "reactstrap";
import ReadAdminRow from "../components/ReadAdminRow";
import EditableAdminRow from "../components/EditableAdminRow";
import Paper from "@mui/material/Paper";
import dickerLogoSquare from "../images/dickerLogoSquare.png";
import Typography from "@mui/material/Typography";
import { Card } from "@mui/material";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import axios from "axios";

// Endpoint to gather users
const url = "/api/users";

const AdminSettings = () => {
  // Will consist of Merchant Data from api
  // State variable used to prevent app crashing
  // Axios function to pull user data
  const get = async () => {
    let response = await axios.get(url);
    return response;
  };

  // Will hold user data pulled from endpoint
  const [merchs, setMerchs] = useState([]);
  useEffect(() => {
    get().then((response) => {
      setMerchs(response.data);
    });
  }, []);

  // Function called after updating user info in form.
  // Will update the database with admin inputted info.
  const updateUserInfoInDB = async (editedAdmin) => {
    // Update endpoint
    const update = "/api/update-user";

    // Post route that takes the editted admin as a param to update db
    let response = await axios.post(update, { editedAdmin });
    console.log(response);

    if (response.status === 200) {
      alert("Changes successfully posted to Database");
    } else alert("Error saving changes, please try again.");
  };

  // Set of state variables and functions that handle the editing merch profiles
  // This is the form that will hold the updated values within the state
  const [editForm, setEditForm] = useState({
    Id: "",
    MerchantId: null,
    UserName: "",
    LockoutEnabled: null,
  });
  // Used to keep track of which row the admin is editing
  const [editAdminId, setEditAdminId] = useState(null);

  // Called to keep track of form inputs during editting.
  // Updates the edit form state value
  const handleEditForm = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newForm = { ...editForm };
    newForm[fieldName] = fieldValue;

    setEditForm(newForm);
  };

  // Called when merchant clicks save on an editable row
  // Finalizes the editted changes.
  // Will want an axios post route here to post updates to backend.
  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedAdmin = {
      Id: editAdminId,
      MerchantId: Number(editForm.MerchantId),
      UserName: editForm.UserName,
      LockoutEnabled: editForm.LockoutEnabled,
    };
    const newAdmins = [...merchs];

    const index = merchs.findIndex((user) => user.Id === editAdminId);
    newAdmins[index] = editedAdmin;

    setMerchs(newAdmins);

    updateUserInfoInDB(editedAdmin);

    setEditAdminId(null);
  };

  // Called when admin clicks edit, turns the row into an editable row.
  const handleEditClick = (event, user) => {
    event.preventDefault();
    setEditAdminId(user.Id);

    const formValues = {
      Id: editAdminId,
      MerchantId: user.MerchantId,
      UserName: user.UserName,
      LockoutEnabled: user.LockoutEnabled,
    };
    setEditForm(formValues);
  };

  // Called when admin is in edit mode and clicks cancel on editting a row
  const handleCancel = () => {
    setEditAdminId(null);
  };

  // Displayed is merchants is empty to prevent app crashing
  if (!merchs)
    return (
      <Container>
        <Col>
          <Row></Row>
          <Row>
            <Spinner color={"warning"}></Spinner>Loading data...
          </Row>
          <Row></Row>
        </Col>
      </Container>
    );

  return (
    <>
      <div>
        <Card
          style={{ width: "100%", margin: "auto", marginTop: "25px" }}
          sx={{ boxShadow: 3 }}
        >
          <Container className="AdminSettings">
            <Paper
              sx={{
                boxShadow: 0,
                marginLeft: "275px",
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
              {/* <form> */}
              <Table>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>MerchantId</th>
                    <th>UserName</th>
                    <th>LockoutEnabled</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {merchs.map((user) => (
                    <Fragment>
                      {editAdminId === user.Id ? (
                        <EditableAdminRow
                          user={user}
                          editForm={editForm}
                          handleEditForm={handleEditForm}
                          handleCancel={handleCancel}
                        />
                      ) : (
                        <ReadAdminRow
                          user={user}
                          handleEditClick={handleEditClick}
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
