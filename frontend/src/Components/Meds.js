import "./Meds.css";
import { Link } from "react-router-dom";

const Meds = () =>{
    //use
    
    return(
        <div className="Medcines">
            <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fmedication&psig=AOvVaw1OQVHNftXTwBLMRy6QIoRT&ust=1699424613973000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCJC8wpWgsYIDFQAAAAAdAAAAABAE" alt="med name"/>

            <div className="meds_info">
                <p className="info_name">MED 1</p>
                <p className="infooo">
                Medicines are chemicals or compounds used to cure, halt, or prevent disease; ease symptoms; or help in the diagnosis of illnesses. Advances in medicines have enabled doctors to cure many diseases and save lives. These days, medicines come from a variety of sources.
                </p>

                <p className="price">10000$</p>
                <Link to={`/medicine/${1111}`} className="info_buttom">View</Link>
                

            </div>
        </div>
    )
} 

export default Meds;