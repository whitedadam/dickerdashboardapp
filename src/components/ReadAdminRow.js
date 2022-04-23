import React from "react";
import Button from "@mui/material/Button";

const ReadAdminRow = ({ user, handleEditClick, }) => {
  return (
    <tr>
      <td>{user.Id}</td>
      <td>{user.MerchantId}</td>
      <td>{user.UserName}</td>
      <td>{user.LockoutEnabled.toString()}</td>
      <td>
        <Button
          type="button"
          onClick={(event) => handleEditClick(event, user)}
          sx={{ backgroundColor: "#d9c07c", mt: 3, mb: 2 }}
          style={{ height: "30px", width: "100px" }}
        >
          Edit
        </Button>
      </td>
    </tr>
  );
};

export default ReadAdminRow;
