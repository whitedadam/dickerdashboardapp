import React, {Fragment, useState} from "react";
import "./AdminSettings.css";
import {Container, NavItem, NavLink, Table} from "reactstrap";
import adminData from "../mock-admindata.json";
import {nanoid} from "nanoid";
import ReadAdminRow from "../components/ReadAdminRow";
import EditableAdminRow from "../components/EditableAdminRow";



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
    })
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
        }
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
    }

    return (
        <div>
            <h1>Admin Profile</h1>
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
                    ))};
                    </tbody>
                </Table>
            </form>
            <h2 align = "center"> Add an Admin Profile</h2>
            <form onSubmit={handleAddFormSubmit}>
                <input type = "text"
                       name="appUserId"
                       required="required"
                       placeholder="Enter your App User ID..."
                       size= "50"
                       onChange={handleAddFormChange}
                />
                <input type = "text"
                       name = "password"
                       required = "required"
                       placeholder = "Enter your password..."
                       size = "50"
                       onChange = {handleAddFormChange}
                       />
                <input type = "text"
                       name = "email"
                       required="required"
                       placeholder="Enter your email..."
                       size = "50"
                       onChange={handleAddFormChange}
                />
                <input type="text"
                       name ="phoneNumber"
                       required="required"
                       placeholder="Enter your phone number.."
                       size = "50"
                       onChange={handleAddFormChange}
                />
                <button type = "submit">Add</button>
            </form>
        </div>
    );
};
export default AdminSettings;