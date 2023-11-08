import './Navbar.css';
import {Link} from 'react-router-dom';
const Navbar = ({click}) =>{
    return (
        <nav className = "navbar">
    {/*logo*/}
    <div className="navbar_logo">
        <h2>Titans Pharmacy</h2>

    </div>
    {/* links*/}
    <ul className="navbar_links">
        <li>
            <Link to="/cart" className='cart__link'>
                <i className='fas fa-shopping-cart'></i>
                {/*con*/}
                <span>
                    Cart 
                    <span className='cartlogo_badge'>0</span>
                </span>
                
            </Link>
        </li>
        <li>
            <Link to="/patient">
                store

            </Link>
        </li>
    </ul>
    {/*menu*/}
    <div className='ham_menu' onClick={click}>
        <div></div>
        <div></div>
        <div></div>

    </div>

</nav>
        

    )
}
export default Navbar;