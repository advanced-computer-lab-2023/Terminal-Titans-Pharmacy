import "./cartScreen.css"
import CartItem from "../Components/CartItem";
const cartScreen = () =>{
    return(
        <div className="cartscreen">
            <div className="cart_left">
                <h2>Shopping Cart</h2>
                <CartItem/>
                <CartItem/>
                <CartItem/>

                <CartItem/>

            </div>
            <div className="cart_right">
                <div className="cart_info">
                    <p>Subtotal (0) items</p>
                    <p>$1000</p>
                </div>
                <div>
                    <button>Checkout</button>        
                </div>
        
            </div>

        </div>
    )
} 

export default cartScreen;