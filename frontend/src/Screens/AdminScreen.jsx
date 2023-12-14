import AcceptRejectPharmacist from "../Components/AcceptRejectPharmacist.jsx";

const AdminPage = () => {
    const params = new URLSearchParams(window.location.search);
  const  sessid  = params.get('id');
  if(sessid){
    sessionStorage.setItem("token", sessid);
  }

    return(
        <div>
            <h1>Admin Page</h1>

            <AcceptRejectPharmacist />
        </div>
    )
}

export default AdminPage