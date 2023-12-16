import React from 'react';
import Body from '../Components/PharmScreenBody';
import Nav from "../Components/Pharmacist-NavBar";


//const params = new URLSearchParams(window.location.search);
// const  sessid  = params.get('id');
// console.log(params)
// console.log(sessionStorage.getItem("token"))
// if(sessid){
//   sessionStorage.setItem("token", sessid);
// }


function pharmacistScreen() {

    return (
    <div>
       <Nav/>
       <Body/>
       {/* <Tess/> */}
       
    </div>   
        
    )
}
export default pharmacistScreen;