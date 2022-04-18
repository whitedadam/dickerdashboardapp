import React, {Fragment, useState} from "react";
import "./AdminSettings.css";
import {Container, Table} from "reactstrap";
import adminData from "../mock-admindata.json";
import {nanoid} from "nanoid";
import ReadAdminRow from "../components/ReadAdminRow";
import EditableAdminRow from "../components/EditableAdminRow";
import Paper from "@mui/material/Paper";
import dickerLogoSquare from "../images/dickerLogoSquare.png";
import Typography from "@mui/material/Typography";
import {Card} from '@mui/material';
import Button from "@mui/material/Button";
import {Grid} from "@material-ui/core";


const AdminSettings = () => {
    const [merchs, setMerchs] = useState(adminData);
    const [addForm, setAddForm] = useState({
        appUserId: "",
        password: "",
        email: "",
        phoneNumber: "",
    });
    const [editForm, setEditForm] = useState({
        appUserId: "",
        password: "",
        email: "",
        phoneNumber: "",
    });
    const [editAdminId, setEditAdminId] = useState(null);

    const handleAddFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newForm = {...addForm};
        newForm[fieldName] = fieldValue;

        setAddForm(newForm);
    };

    const handleEditForm = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name")
        const fieldValue = event.target.value;

        const newForm = { ...editForm};
        newForm[fieldName] = fieldValue;

        setEditForm(newForm);
    };
    const handleAddFormSubmit = (event) =>{
        event.preventDefault();


        const newMerch = {
            id: nanoid(),
            appUserId: addForm.appUserId,
            password: addForm.password,
            email: addForm.email,
            phoneNumber:addForm.phoneNumber
        };
        const newAdmins = [...merchs, newMerch];
        setMerchs(newAdmins);
    };
    const handleEditFormSubmit = (event) => {
        event.preventDefault();

        const editedAdmin = {
            id: editAdminId,
            appUserId: editForm.appUserId,
            password: editForm.password,
            email: editForm.email,
            phoneNumber: editForm.phoneNumber
        };
        const newAdmins = [...merchs];

        const index = merchs.findIndex((contact) =>contact.id === editAdminId);
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
            phoneNumber: contact.phoneNumber
        }
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
        <div>
            <Card style={{width: '900px', margin: 'auto', marginTop: '25px'}} sx={{boxShadow: 3}}>
                <Container className="AdminSettings">
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
                        Admin Profile
                    </Typography>
            <form onSubmit = {handleEditFormSubmit}>
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
                                <EditableAdminRow editForm = {editForm}
                                             handleEditForm={handleEditForm}
                                             handleCancel = {handleCancel}
                                />
                            ) : (
                                <ReadAdminRow
                                    contact={contact}
                                    handleEditClick = {handleEditClick}
                                    handleDelete = {handleDelete}
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
               Add an Admin Profile
            </Typography>
            <form onSubmit={handleAddFormSubmit}>
                <input type = "text"
                       name="appUserId"
                       required="required"
                       placeholder="Enter your App User ID..."
                       size= "58"
                       onChange={handleAddFormChange}
                />
                <input type = "text"
                       name = "password"
                       required = "required"
                       placeholder = "Enter your password..."
                       size = "58"
                       onChange = {handleAddFormChange}
                       />
                <input type = "text"
                       name = "email"
                       required="required"
                       placeholder="Enter your email..."
                       size = "58"
                       onChange={handleAddFormChange}
                />
                <input type="text"
                       name ="phoneNumber"
                       required="required"
                       placeholder="Enter your phone number.."
                       size = "58"
                       onChange={handleAddFormChange}
                />
                <Grid container justify="center">
                <Button type = "submit"
                        fullWidth
                        className="btn btn info"
                        variant='contained'
                        sx={{backgroundColor: '#d9c07c', mt: 3, mb: 2}}
                        style={{height: '30px',width: '250px' }}>Add</Button>
                </Grid>
            </form>
        </div>
    );
};
export default AdminSettings;