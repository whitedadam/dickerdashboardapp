import Button from "@mui/material/Button";

const EditableRow = ({editFormData,handleEditFormChange, handleCancelClick} ) => {
    return(
        <tr>
            <td>
                <input type = "text"
                       required= "required"
                       placeholder="Enter an App User Id.."
                       name = "appUserId"
                       value = {editFormData.appUserId}
                       onChange = {handleEditFormChange}
                      ></input>
            </td>
            <td>
                <input type = "text"
                       required="required"
                       placeholder="Enter an email.."
                       name = "email"
                       value = {editFormData.email}
                       onChange = {handleEditFormChange}
                ></input>
            </td>
            <td>
                <input type = "text"
                       required = "required"
                       placeholder = "Enter a phone number.."
                       name = "phoneNumber"
                       value = {editFormData.phoneNumber}
                       onChange = {handleEditFormChange}
                ></input>
            </td>
            <td>
                <Button type = "submit"
                        sx={{backgroundColor: '#d9c07c', mt: 3, mb: 2}}
                        style={{height: '30px',width: '100px' }}
                        >Save</Button>
                <Button type = "button" onClick = {handleCancelClick}
                        sx={{backgroundColor: '#d9c07c', mt: 3, mb: 2}}
                        style={{height: '30px',width: '100px' }}>Cancel</Button>
            </td>
        </tr>
    );
};
export default EditableRow