import { Table } from "reactstrap";
import userData from "../mock-data.json";

const GeneralSettings = () => {
  return (
    <div>
      <h1>General Settings</h1>
      <Table>
        <thead>
          <tr>
            <th>appUserId</th>
            <th>Email</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{userData[0].appUserId}</td>
            <td>{userData[0].email}</td>
            <td>{userData[0].phoneNumber}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};
export default GeneralSettings;
