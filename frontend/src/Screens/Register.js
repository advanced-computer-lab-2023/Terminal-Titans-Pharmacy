import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import PatientRegistrationForm from './RegisterPatientForm.js';
import PharmacyRegistrationForm from './RegisterPharmacistForm';

function Register() {
    return (
        <Tabs
          defaultActiveKey="profile"
          id="uncontrolled-tab-example"
          className="mb-3 d-flex justify-content-center"
        >
          <Tab eventKey="home" title="Register Pharmacy">
            <PharmacyRegistrationForm />
          </Tab>
          <Tab eventKey="profile" title="Register Patient">
          {<PatientRegistrationForm />}
          </Tab>
        </Tabs>
      );
}

export default Register;