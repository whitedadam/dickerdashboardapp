import React from 'react'
import Button from "@mui/material/Button";

const ReadOnlyRow = ({contact , handleEditClick, handleDeleteClick}) => {
    return (
            <tr>
              <td>{contact.appUserId}</td>
             <td>{contact.email}</td>
              <td>{contact.phoneNumber}</td>
                <td>
                    <Button type = "button"
                            onClick = {(event) => handleEditClick(event,contact)}
                            sx={{backgroundColor: '#d9c07c', mt: 3, mb: 2}}
                            style={{height: '30px',width: '100px' }}
                    >Edit</Button>
                    <Button type = "button"
                            onClick = {() => handleDeleteClick(contact.id)}
                            sx={{backgroundColor: '#d9c07c', mt: 3, mb: 2}}
                            style={{height: '30px',width: '100px' }}
                    >Delete</Button>
                </td>
            </tr>
    );
};

export default ReadOnlyRow;