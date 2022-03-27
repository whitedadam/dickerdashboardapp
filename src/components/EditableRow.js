import {handle} from "express/lib/router";

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
                <button type = "submit">Save</button>
                <button type = "button" onClick = {handleCancelClick} >Cancel</button>
            </td>
        </tr>
    );
};
export default EditableRow