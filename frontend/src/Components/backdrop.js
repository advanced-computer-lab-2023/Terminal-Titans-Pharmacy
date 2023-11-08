import "./backdrop.css"
const Backdrop = ({show, click}) =>{

    return show &&<div className="backdrop" onClick={click}> Home Screen</div>;
} 

export default Backdrop;