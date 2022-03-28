import {Table} from "reactstrap";
import userData from "../mock-data.json";
import './GeneralSettings.css';
import React, {useState, Fragment } from "react";
import {nanoid} from "nanoid";
import ReadOnlyRow from "../components/ReadOnlyRow";
import EditableRow from "../components/EditableRow";
import Paper from "@mui/material/Paper";
import dickerLogoSquare from "../images/dickerLogoSquare.png";
import {Card} from '@mui/material';
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {Grid} from "@material-ui/core";



const GeneralSettings = () => {
  const [contacts, setContacts] = useState(userData);
  const [addFormData, setAddFormData] = useState({
    appUserId: "",
    email: "",
    phoneNumber: "",
  });
  const [editFormData, setEditFormData] = useState({
      appUserId: "",
      email: "",
      phoneNumber: "",
  })
    const [editContactId, setEditContactId] = useState(null);

const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = {...addFormData};
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
};

const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name")
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData};
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
};
  const handleAddFormSubmit = (event) =>{
    event.preventDefault();


    const newContact = {
      id: nanoid(),
      appUserId: addFormData.appUserId,
      email: addFormData.email,
      phoneNumber:addFormData.phoneNumber
    };
    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  };
const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
        id: editContactId,
        appUserId: editFormData.appUserId,
        email: editFormData.email,
        phoneNumber: editFormData.phoneNumber
    }
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) =>contact.id === editContactId);
    newContacts[index] = editedContact;

    setContacts(newContacts);

    setEditContactId(null);

};

  const handleEditClick = (event, contact) => {
      event.preventDefault();
      setEditContactId(contact.id);

      const formValues = {
          appUserId: contact.appUserId,
          email: contact.email,
          phoneNumber: contact.phoneNumber
      }
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
  }

  return (
    <div>
        <Card style={{width: '900px', margin: 'auto', marginTop: '25px'}} sx={{boxShadow: 3}}>
            <Container className="GeneralSettings">
                <Paper
                    sx={{
                        boxShadow: 0,
                        marginLeft: '160px',
                        marginRight: 'auto',
                        marginTop: '15px',
                        marginBottom: '15px'
                    }}
                >
                    <img src={dickerLogoSquare} alt={'dicker logo'} class="center"/>
                </Paper>
                <Typography fontWeight='bold' id='loginHeader' component='h1' variant='h5' align='center'>
                    User Profile
                </Typography>
        <form onSubmit = {handleEditFormSubmit}>
      <Table>
        <thead>
          <tr>
            <th >appUserId</th>
            <th  >Email</th>
            <th  >Phone Number</th>
              <th  >Actions</th>
          </tr>
        </thead>
        <tbody>
        {contacts.map((contact) => (
            <Fragment>
                {editContactId === contact.id ? (
                    <EditableRow editFormData = {editFormData}
                                 handleEditFormChange={handleEditFormChange}
                                 handleCancelClick = {handleCancelClick}
                    />
                ) : (
                <ReadOnlyRow
                    contact={contact}
                    handleEditClick = {handleEditClick}
                    handleDeleteClick = {handleDeleteClick}
                />
                    )}
            </Fragment>
            ))}
        </tbody>
      </Table>
        </form>
            </Container>
        </Card>
        <Typography fontWeight='bold' id='loginHeader' component='h1' variant='h5' align='center'>
            Add a Profile
        </Typography>
      <form onSubmit={handleAddFormSubmit}>
        <input type = "text"
               name="appUserId"
               required="required"
               placeholder="Enter your App User ID..."
               size = "38"
               onChange={handleAddFormChange}
               />
        <input type = "text"
               name = "email"
               required="required"
               placeholder="Enter your email..."
               size = "38"

               onChange={handleAddFormChange}
               />
        <input type="text"
               name ="phoneNumber"
               required="required"
               placeholder="Enter your phone number.."
               size = "38"
               onChange={handleAddFormChange}
               />
          <Grid container justify="center">
        <Button type = "submit"
                sx={{backgroundColor: '#d9c07c', mt: 3, mb: 2}}
                style={{height: '30px',width: '250px' }}>Add</Button>
          </Grid>
      </form>
    </div>
  );
};
export default GeneralSettings;
