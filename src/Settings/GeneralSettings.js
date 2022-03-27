import {Row, Table} from "reactstrap";
import userData from "../mock-data.json";
import './GeneralSettings.css';
import React, {useState, Fragment } from "react";
import {use} from "express/lib/router";
import {nanoid} from "nanoid";
import ReadOnlyRow from "../components/ReadOnlyRow";
import EditableRow from "../components/EditableRow";



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
      <h1>User Profile</h1>
        <form onSubmit = {handleEditFormSubmit}>
      <Table>
        <thead>
          <tr>
            <th>appUserId</th>
            <th>Email</th>
            <th>Phone Number</th>
              <th>Actions</th>
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
            ))};
        </tbody>
      </Table>
        </form>
      <h2> Add a Profile</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input type = "text"
               name="appUserId"
               required="required"
               placeholder="Enter your App User ID..."
               onChange={handleAddFormChange}
               />
        <input type = "text"
               name = "email"
               required="required"
               placeholder="Enter your email..."
               onChange={handleAddFormChange}
               />
        <input type="text"
               name ="phoneNumber"
               required="required"
               placeholder="Enter your phone number.."
               onChange={handleAddFormChange}
               />
        <button type = "submit">Add</button>
      </form>
    </div>
  );
};
export default GeneralSettings;
