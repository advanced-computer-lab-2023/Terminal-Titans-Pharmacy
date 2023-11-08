import "./sidedrawe.css"
import { Link } from "react-router-dom";
const Sidedrawer = ({show, click}) =>{
    const sidedrawerClass = ["sidedrawer"];
    if (show){
        sidedrawerClass.push("show")
    }
    return <div className={sidedrawerClass.join(" ")}>     
        <ul className="sidedrawer_links" onClick={click}>
            <li>
                <Link to="/cart">
                <i className="fas fa fa-shopping-cart"></i>
                <span>
                    cart <span className="sidedrawer_cardtbadge">0</span>
                </span>
                </Link>

            </li>
            <li>
                <Link to="/Patient">store</Link>
            </li>

        </ul>
        </div>
} 

export default Sidedrawer;