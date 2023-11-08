 import "./Meds.css";
// import { Link } from "react-router-dom";

// const Meds = () =>{
//     return(
//         <div className="Medcines">
//             <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fmedication&psig=AOvVaw1OQVHNftXTwBLMRy6QIoRT&ust=1699424613973000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCJC8wpWgsYIDFQAAAAAdAAAAABAE" alt="med name"/>

//             <div className="meds_info">
//                 <p className="info_name">MED 1</p>
//                 <p className="infooo">
//                 Medicines are chemicals or compounds used to cure, halt, or prevent disease; ease symptoms; or help in the diagnosis of illnesses. Advances in medicines have enabled doctors to cure many diseases and save lives. These days, medicines come from a variety of sources.
//                 </p>

//                 <p className="price">10000$</p>
//                 <Link to={`/medicine/${1111}`} className="info_buttom">View</Link>
                

//             </div>
//         </div>
//     )
// } 

// export default Meds;

// import React from 'react';
// import { Link } from "react-router-dom";

// const Meds = ({ medicines }) => {
//     return (
//         <div className="Medcines">
//             {medicines.map((medicine) => (
//                 <div key={medicine.id} className="medicine">
//                    {medicine.Picture && (
//                        <img src={`/images/${medicine.Picture}`} alt={medicine.Name} />
//                    )}
//                     <div className="meds_info">
//                         <p className="info_name">{medicine.Name}</p>
//                         <p className="infooo">{medicine.MedicalUse.join(' ')}</p>
//                         <p className="price">${medicine.Price}</p>
//                         <Link to={`/medicine/${medicine.Name}`} className="info_buttom">View</Link>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default Meds;

// Meds.js (Meds component)
import React from 'react';
import { Link } from 'react-router-dom';

const Meds = ({ medicines }) => {
    return (
        <div className="Medcines">
            {medicines.map((medicine) => (
                <div key={medicine.id} className="medicine">
                    {medicine.Picture && (
                        <img
                            src={`data:image/jpeg;base64,${medicine.Picture.data.toString('base64')}`}
                            alt={medicine.Name}
                        />
                    )}
                    <div className="meds_info">
                        <p className="info_name">{medicine.Name}</p>
                        <p className="infooo">{medicine.MedicalUse.join(' ')}</p>
                        <p className="price">${medicine.Price}</p>
                        <Link to={`/medicine?medicineId=${medicine._id}`} className="info_buttom">
                            View
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Meds;

// import React from 'react';
// import { Link } from 'react-router-dom';


// const Meds = ({ medicines }) => {
//     return (
//         <div className="Medcines">
//             {medicines.map((medicine) => (
//                 <div key={medicine.id} className="medicine">
//                     {medicine.Picture && (
//                         <img
//                             src={medicine.Picture.url} // Use the URL field
//                             alt={medicine.Name}
//                         />
//                     )}

//                     <div className="meds_info">
//                         <p className="info_name">{medicine.Name}</p>
//                         <p className="infooo">{medicine.MedicalUse.join(' ')}</p>
//                         <p className="price">${medicine.Price}</p>
//                         <Link to={`/medicine/${medicine.Name}`} className="info_buttom">
//                             View
//                         </Link>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };



// export default Meds;


