import Sales from "../Components/AdminMonthlySales"
import Nav from "../Components/Admin-NavBar"
 function SalesPage(){
    const params = new URLSearchParams(window.location.search);
  const  sessid  = params.get('id');
  console.log(params)
  if(sessid){
    sessionStorage.setItem("token", sessid);
  }
console.log(sessid)
    return(
        <div>
            <Nav/>
            <Sales/>
        </div>
    )
}
export default SalesPage;