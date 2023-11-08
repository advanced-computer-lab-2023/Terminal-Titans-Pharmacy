import "./Homescreen.css"
import Meds from "../Components/Meds";

const Homescreen = () =>{
    return(
        <div className="homescreen">
            <h2 className="homescreen_title">Meds</h2>
            <div className="homescreen_meds">
                <Meds />
                <Meds />
                <Meds />
                <Meds />
                <Meds />
                <Meds />

            </div>

        </div>
    )
} 

export default Homescreen;