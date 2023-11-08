import "./CartItem.css"

import { Link } from "react-router-dom";
const CartItem = () =>{
    return(
        <div className="cartitem">
            <div className="cart_image">
                <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fmedication&psig=AOvVaw1OQVHNftXTwBLMRy6QIoRT&ust=1699424613973000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCJC8wpWgsYIDFQAAAAAdAAAAABAE" alt="med name"/>

            </div>
            <Link to={`/medicine/${1111}`} className="cart_name">
                <p>Med1</p>

            </Link>
            <p className="Cart_price">$1000</p>
            <select className="cart_select">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>
            <button className="cart_del">
                <i className="fas fa-trash"></i>
            </button>
        </div>
           
    )
} 

export default CartItem;