import Button from "@mui/material/Button";
import { Col } from "reactstrap";

const EditableAdminRow = ({ editForm, handleEditForm, handleCancel, user }) => {
  return (
    <tr>
      {/* Id Col (cannot be changed) */}
      <td>{user.Id}</td>
      <td>
        {/* Merchant Id (can be changed to assign merchant to user) */}
        <input
          type="text"
          required="required"
          placeholder="Enter a MerchantId..."
          name="MerchantId"
          value={editForm.MerchantId}
          onChange={handleEditForm}
        ></input>
      </td>
      {/* UserName Col (cannot be changed) */}
      <td>{user.UserName}</td>
      {/* LockoutEnabled Col (can be changed to allow user to log back in) */}
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter false to reactivate user..."
          name="LockoutEnabled"
          value={editForm.LockoutEnabled}
          onChange={handleEditForm}
        ></input>
      </td>
      {/* Submit / Cancel */}
      <td>
        <Col>
          <Button
            type="submit"
            sx={{ backgroundColor: "#d9c07c", mt: 3, mb: 2 }}
            style={{ height: "30px", width: "100px" }}
          >
            Save
          </Button>
          <Button
            type="button"
            onClick={handleCancel}
            sx={{ backgroundColor: "#d9c07c", mt: 3, mb: 2 }}
            style={{ height: "30px", width: "100px" }}
          >
            Cancel
          </Button>
        </Col>
      </td>
    </tr>
  );
};
export default EditableAdminRow;
