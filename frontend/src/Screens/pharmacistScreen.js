
import Button from 'react-bootstrap/Button';
 import Nav from "../Components/Pharmacist-NavBar"
import Tess from "../Components/Addmed"
import Body from '../Components/PharmScreenBody';
import Rep from"../Components/SalesReports"

function pharmacistScreen() {
    return (
    <div>
       <Nav/>
       <Body/>
       <Tess/>
       <Rep/>
    </div>   
        
    )
}
export default pharmacistScreen;