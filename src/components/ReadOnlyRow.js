import React from "react";
import Button from "@mui/material/Button";

const ReadOnlyRow = ({ contact, handleEditClick, }) => {
  return (
    <tr>
      <td>{contact.Id}</td>
      <td>{contact.UserName}</td>
      <td>{contact.PhoneNumber}</td>
      <td>
        <Button
          type="button"
          onClick={(event) => handleEditClick(event, contact)}
          sx={{ backgroundColor: "#d9c07c", mt: 3, mb: 2 }}
          style={{ height: "30px", width: "100px" }}
        >
          Edit
        </Button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
