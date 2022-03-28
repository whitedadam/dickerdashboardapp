import Button from "@mui/material/Button";

const EditableAdminRow = ({editForm,handleEditForm, handleCancel} ) => {
    return(
        <tr>
            <td>
                <input type = "text"
                       required= "required"
                       placeholder="Enter an App User Id.."
                       name = "appUserId"
                       value = {editForm.appUserId}
                       onChange = {handleEditForm}
                ></input>
            </td>
            <td>
                <input type = "text"
                       required="required"
                       placeholder="Enter an email.."
                       name = "email"
                       value = {editForm.email}
                       onChange = {handleEditForm}
                ></input>
            </td>
            <td>
                <input type = "text"
                       required = "required"
                       placeholder = "Enter a phone number.."
                       name = "phoneNumber"
                       value = {editForm.phoneNumber}
                       onChange = {handleEditForm}
                ></input>
            </td>
            <td>
                <Button type = "submit"
                        sx={{backgroundColor: '#d9c07c', mt: 3, mb: 2}}
                        style={{height: '30px',width: '100px' }}>Save</Button>
                <Button type = "button" onClick = {handleCancel}
                        sx={{backgroundColor: '#d9c07c', mt: 3, mb: 2}}
                        style={{height: '30px',width: '100px' }}>Cancel</Button>
            </td>
        </tr>
    );
};
export default EditableAdminRow