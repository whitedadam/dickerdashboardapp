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
                <button type = "submit">Save</button>
                <button type = "button" onClick = {handleCancel} >Cancel</button>
            </td>
        </tr>
    );
};
export default EditableAdminRow