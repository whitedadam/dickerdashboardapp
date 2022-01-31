import {Component} from "react";
import {Table} from "reactstrap";


class GeneralSettings extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            form: {
                email: '',
                password: ''
            },
            userOption: "none",
            isGeneralSetting: false,
            isSecurity: false,
            isNotification: false,
            resetHidden: true,
            isToggleOn: false,
            isAllowDataOn: false,
            users: {
                admin: {
                    id: 1,
                    email: 'admin@dicker.com',
                    password: 'admin',
                    name: 'Admin',
                    phoneNumber: '(904)-456-3452',
                    loginAttempts: 0,
                    lockoutEnabled: false,
                    isAdmin: true,
                    allowEmail: "allowing",
                    allowData: "not allowing"
                },
                merchant: {
                    id: 2,
                    email: 'firstcheck@lastcheck.test',
                    password: '12345',
                    name: 'Bob',
                    phoneNumber: '(904)-675-6234',
                    loginAttempts: 0,
                    lockoutEnabled: false,
                    isAdmin: false,
                    allowEmail: "not allowing",
                    allowPush: "allowing",

                }
            }
        };

    }
    render(){
        return(
            <div>
                <h1>General Settings</h1>
                <Table>
                    <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Bob123</td>
                        <td>bob123@gmail.com</td>
                        <td>(904)-734-4321</td>
                    </tr>
                    </tbody>
                </Table>
            </div>
        )
    }
}
export default GeneralSettings;
