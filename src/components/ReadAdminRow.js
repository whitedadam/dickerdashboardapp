import React from "react";

const ReadAdminRow = ({contact , handleEditClick, handleDelete}) => {
    return (
        <tr>
            <td>{contact.appUserId}</td>
            <td>{contact.password}</td>
            <td>{contact.email}</td>
            <td>{contact.phoneNumber}</td>
            <td>
                <button type = "button"
                        onClick = {(event) => handleEditClick(event,contact)}
                >Edit</button>
                <button type = "button"
                        onClick = {() => handleDelete(contact.id)}
                >Delete</button>
            </td>
        </tr>
    );
};

export default ReadAdminRow;