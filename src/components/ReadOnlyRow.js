import React from 'react'
import {handle} from "express/lib/router";

const ReadOnlyRow = ({contact , handleEditClick, handleDeleteClick}) => {
    return (
            <tr>
              <td>{contact.appUserId}</td>
             <td>{contact.email}</td>
              <td>{contact.phoneNumber}</td>
                <td>
                    <button type = "button"
                            onClick = {(event) => handleEditClick(event,contact)}
                    >Edit</button>
                    <button type = "button"
                            onClick = {() => handleDeleteClick(contact.id)}
                    >Delete</button>
                </td>
            </tr>
    );
};

export default ReadOnlyRow;