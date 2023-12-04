 import "./Homescreen.css"
// // // // // import Meds from "../Components/Meds";

// // // // // const Homescreen = () =>{
// // // // //     return(
// // // // //         <div className="homescreen">
// // // // //             <h2 className="homescreen_title">Meds</h2>
// // // // //             <div className="homescreen_meds">
// // // // //                 <Meds />
// // // // //                 <Meds />
// // // // //                 <Meds />
// // // // //                 <Meds />
// // // // //                 <Meds />
// // // // //                 <Meds />

// // // // //             </div>

// // // // //         </div>
// // // // //     )
// // // // // } 

// // // // // export default Homescreen;
// // // // import React, { useState, useEffect } from 'react';
// // // // import Meds from "../Components/Meds";
// // // // import Meds2 from "../Screens/Meds";

// // // // const Homescreen = () => {
// // // //     const [medicines, setMedicines] = useState([]);
// // // //     const params = new URLSearchParams(window.location.search);
// // // //     const userId = params.get('medicineId');
// // // //     console.log(userId);
// // // //     useEffect(() => {
// // // //         const getMedicines = async () => {
// // // //             try {
// // // //                 var response = await fetch(`http://localhost:8000/Patient/getAllMedicine/`);
// // // //                 const jsonData = await response.json();
// // // //                 let result = jsonData.Result;
// // // //                 setMedicines(result);
// // // //             } catch (error) {
// // // //                 console.error('Error fetching data:', error);
// // // //             }
// // // //         };

// // // //         getMedicines();
// // // //     }, []);

// // // //     return (
// // // //         <div className="homescreen">
// // // //             <h2 className="homescreen_title">Meds</h2>
// // // //             <div className="homescreen_meds">
// // // //                 {medicines.map((medicine) => (
// // // //                     <Meds key={medicine.Name} medicines={[medicine]} />
// // // //                 ))}
// // // //             </div>
// // // //         </div>
// // // //     );
// // // // }




// // // // // import React, { useState, useEffect } from 'react';
// // // // // import Meds from "../Components/Meds";

// // // // // const Homescreen = () => {
// // // // //     const [medicines, setMedicines] = useState([]);

// // // // //     useEffect(() => {
// // // // //         const getMedicines = async () => {
// // // // //             try {
// // // // //                 var response = await fetch(`http://localhost:8000/Admin/getAllMedicine/`);
// // // // //                 const jsonData = await response.json();
// // // // //                 let result = jsonData.Result;
// // // // //                 setMedicines(result);
// // // // //             } catch (error) {
// // // // //                 console.error('Error fetching data:', error);
// // // // //             }
// // // // //         };

// // // // //         getMedicines();
// // // // //     }, []);

// // // // //     return (
// // // // //         <div className="homescreen">
// // // // //             <h2 className="homescreen_title">Meds</h2>
// // // // //             <div className="homescreen_meds">
// // // // //                 <Meds medicines={medicines} />
// // // // //             </div>
// // // // //         </div>
// // // // //     )
// // // // // }

// // // // export default Homescreen;
// // // import React, { useState, useEffect } from 'react';
// // // import Meds from '../Components/Meds';
// // // import SearchFilterComponent from '../Components/SearchFilter';

// // // const Homescreen = () => {
// // //   const [medicines, setMedicines] = useState([]);

// // //   useEffect(() => {
// // //     const getMedicines = async () => {
// // //       try {
// // //         const response = await fetch('http://localhost:8000/Patient/getAllMedicine/');
// // //         const jsonData = await response.json();
// // //         const result = jsonData.Result;
// // //         setMedicines(result);
// // //       } catch (error) {
// // //         console.error('Error fetching data:', error);
// // //       }
// // //     };

// // //     getMedicines();
// // //   }, []);

// // //   return (
// // //     <div className="homescreen">
// // //       <h2 className="homescreen_title">Meds</h2>
// // //       <SearchFilterComponent />
// // //       <div className="homescreen_meds">
// // //         {medicines.map((medicine) => (
// // //           <Meds key={medicine.Name} medicines={[medicine]} />
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Homescreen;
// // // Homescreen.js
// import React, { useState, useEffect } from 'react';
// import Meds from '../Components/Meds';
// import axios from 'axios';

// // const Homescreen = ({ filteredAndSearchedMedicines }) => {
// //   const [medicines, setMedicines] = useState([]);

// //   useEffect(() => {
// //     const getMedicines = async () => {
// //       try {
// //         const response = await fetch('http://localhost:8000/Patient/getAllMedicine2/',{headers:{Authorization:'Bearer '+sessionStorage.getItem("token")}});
// //         const jsonData = await response.json();

// //         // Check if jsonData.Result is an array
// //         if (Array.isArray(jsonData.meds)) {
// //           setMedicines(jsonData.meds);
// //         } else {
// //           console.error('Invalid data format. Expected an array.');
// //         }
// //       } catch (error) {
// //         console.error('Error fetching data:', error);
// //       }
// //     };

// //     getMedicines();
// //   }, []);

// //   return (
// //     <div className="homescreen">
// //       <h2 className="homescreen_title">Meds</h2>
// //       <div className="homescreen_meds">
// //         {Array.isArray(medicines) ? (
// //           medicines.map((medicine) => <Meds key={medicine.Name} medicines={[medicine]} />)
// //         ) : (
// //           <p>Error: Medicines data is not in the expected format.</p>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Homescreen;
// // const Homescreen = ({ filteredAndSearchedMedicines }) => {
// //   const [medicines, setMedicines] = useState([]);
// //   const [allMedicines, setAllMedicines] = useState([]);

// //   useEffect(() => {
// //     const getMedicines = async () => {
// //       try {
// //         const response = await fetch('http://localhost:8000/Patient/getAllMedicine2/', { headers: { Authorization: 'Bearer ' + sessionStorage.getItem("token") } });
// //         const jsonData = await response.json();

// //         if (Array.isArray(jsonData.meds)) {
// //           setAllMedicines(jsonData.meds);
// //         } else {
// //           console.error('Invalid data format. Expected an array.');
// //         }
// //       } catch (error) {
// //         console.error('Error fetching data:', error);
// //       }
// //     };

// //     getMedicines();
// //   }, []);

// //   // Check if filteredAndSearchedMedicines is not null or undefined
// //   const mergedMedicines = [...allMedicines, ...(filteredAndSearchedMedicines || [])];

// //   return (
// //     <div className="homescreen">
// //       <h2 className="homescreen_title">Meds</h2>
// //       <div className="homescreen_meds">
// //         {Array.isArray(mergedMedicines) ? (
// //           mergedMedicines.map((medicine) => <Meds key={medicine.Name} medicines={[medicine]} />)
// //         ) : (
// //           <p>Error: Medicines data is not in the expected format.</p>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Homescreen;
// //import React, { useState, useEffect } from 'react';
// //import Meds from './Meds';

// // const Homescreen = ({ filteredAndSearchedMedicines }) => {
// //   const [allMedicines, setAllMedicines] = useState([]);

// //   useEffect(() => {
// //     const getMedicines = async () => {
// //       try {
// //         const response = await fetch('http://localhost:8000/Patient/getAllMedicine2/', { headers: { Authorization: 'Bearer ' + sessionStorage.getItem("token") } });
// //         const jsonData = await response.json();

// //         if (Array.isArray(jsonData.meds)) {
// //           setAllMedicines(jsonData.meds);
// //         } else {
// //           console.error('Invalid data format. Expected an array.');
// //         }
// //       } catch (error) {
// //         console.error('Error fetching data:', error);
// //       }
// //     };

// //     getMedicines();
// //   }, []);

// //   useEffect(() => {
// //     // You can update the state with the filteredAndSearchedMedicines
// //     // whenever it changes.
// //     // This assumes filteredAndSearchedMedicines is an array of medicines.
// //     setAllMedicines(filteredAndSearchedMedicines);
// //   }, [filteredAndSearchedMedicines]);

// //   return (
// //     <div className="homescreen">
// //       <h2 className="homescreen_title">Meds</h2>
// //       <div className="homescreen_meds">
// //         {Array.isArray(allMedicines) ? (
// //           allMedicines.map((medicine) => <Meds key={medicine.Name} medicines={[medicine]} />)
// //         ) : (
// //           <p>Error: Medicines data is not in the expected format.</p>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Homescreen;
// import Dropdown from 'react-bootstrap/Dropdown';
// import Form from 'react-bootstrap/Form';
// import InputGroup from 'react-bootstrap/InputGroup';
// import SplitButton from 'react-bootstrap/SplitButton';

// const Homescreen = () => {
//   const [allMedicines, setAllMedicines] = useState([]);
//   const [medicalUses, setMedicalUses] = useState([]);

//   useEffect(() => {
//     const getMedicines = async () => {
//       try {
//         const response = await fetch('http://localhost:8000/Patient/getAllMedicine2/', { headers: { Authorization: 'Bearer ' + sessionStorage.getItem("token") } });
//         const jsonData = await response.json();

//         if (Array.isArray(jsonData.meds)) {
//           setAllMedicines(jsonData.meds);
//         } else {
//           console.error('Invalid data format. Expected an array.');
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     getMedicines();
//   }, []);

//   const handleSearch = async () => {
//     const inputValue = document.getElementById('searchInput').value;
//     try {
//       const response = await axios.get(`http://localhost:8000/Patient/getMedicine/${inputValue}`, { headers: { Authorization: 'Bearer ' + sessionStorage.getItem("token") } });
//       if (response.status === 200) {
//         setAllMedicines(response.data.Result);
//        // onSearch(response.data.Result);
//       } else {
//         console.error('Failed to search medicines. Unexpected response:', response);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   const handleMedicalUseFilter = async (medicalUse) => {
//     try {
//       const response = await axios.get(`http://localhost:8000/Patient/filterMedical/${medicalUse}`, { headers: { Authorization: 'Bearer ' + sessionStorage.getItem("token") } });
//       if (response.status === 200) {
//         setAllMedicines(response.data.Result);
//         //onFilter(response.data.Result);
//        // onSearch(response.data.Result);
//       } else {
//         console.error('Failed to filter medicines. Unexpected response:', response);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
       

//         const medicalUsesResponse = await axios.get('http://localhost:8000/Patient/getAllMedicalUses', { headers: { Authorization: 'Bearer ' + sessionStorage.getItem("token") } });
//         if (medicalUsesResponse.status === 200) {
//           setMedicalUses(medicalUsesResponse.data.medicalUses);
//         } else {
//           console.error('Failed to get medical uses. Unexpected response:', medicalUsesResponse);
//         }
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     };

//     // Fetch initially
//     fetchData();

//     // Poll for updates every 5 seconds (adjust the interval as needed)
//     const intervalId = setInterval(fetchData, 5000);

//     // Cleanup interval on component unmount
//     return () => clearInterval(intervalId);
//   }, []); // Runs once on mount

//   return (
//     <div className="homescreen">
//       <h2 className="homescreen_title">Meds</h2>
//       <div className="homescreen_meds">
//       <InputGroup className="mb-3">
//   <SplitButton
//     variant="outline-secondary"
//     title="Action"
//     id="segmented-button-dropdown-1"
//   >
//     {medicalUses.map((use, index) => (
//       <Dropdown.Item key={index} onClick={() => handleMedicalUseFilter(use)}>
//         {use}
//       </Dropdown.Item>
//     ))}
//     <Dropdown.Divider />
//   </SplitButton>
//   <Form.Control aria-label="Text input with dropdown button" />
// </InputGroup>

      
    
//         {Array.isArray(allMedicines) ? (
//           allMedicines.map((medicine) => <Meds key={medicine.Name} medicines={[medicine]} />)
//         ) : (
//           <p>Error: Medicines data is not in the expected format.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Homescreen;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import SplitButton from 'react-bootstrap/SplitButton';
import Meds from '../Components/Meds';
import Navbar from './Components/Navbar';

const Homescreen = () => {
  const [allMedicines, setAllMedicines] = useState([]);
  const [medicalUses, setMedicalUses] = useState([]);

  useEffect(() => {
    const getMedicines = async () => {
      try {
        const response = await fetch('http://localhost:8000/Patient/getAllMedicine2/', { headers: { Authorization: 'Bearer ' + sessionStorage.getItem("token") } });
        const jsonData = await response.json();

        if (Array.isArray(jsonData.meds)) {
          setAllMedicines(jsonData.meds);
        } else {
          console.error('Invalid data format. Expected an array.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getMedicines();
  }, []);

  const handleSearch = async () => {
    const inputValue = document.getElementById('searchInput').value;
    try {
      const response = await axios.get(`http://localhost:8000/Patient/getMedicine/${inputValue}`, { headers: { Authorization: 'Bearer ' + sessionStorage.getItem("token") } });
      if (response.status === 200) {
        setAllMedicines([response.data.Result]);
      } else {
        console.error('Failed to search medicines. Unexpected response:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleMedicalUseFilter = async (medicalUse) => {
    try {
      const response = await axios.get(`http://localhost:8000/Patient/filterMedical/${medicalUse}`, { headers: { Authorization: 'Bearer ' + sessionStorage.getItem("token") } });
      if (response.status === 200) {
        setAllMedicines(response.data.Result);
      } else {
        console.error('Failed to filter medicines. Unexpected response:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const medicalUsesResponse = await axios.get('http://localhost:8000/Patient/getAllMedicalUses', { headers: { Authorization: 'Bearer ' + sessionStorage.getItem("token") } });
        if (medicalUsesResponse.status === 200) {
          setMedicalUses(medicalUsesResponse.data.medicalUses);
        } else {
          console.error('Failed to get medical uses. Unexpected response:', medicalUsesResponse);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    // Fetch initially
    fetchData();

    // Poll for updates every 5 seconds (adjust the interval as needed)
    const intervalId = setInterval(fetchData, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Runs once on mount

  return (
    
    <div>
      <Navbar/>
<InputGroup className="mb-3">
  <SplitButton
    variant="outline-secondary"
    title="Search"
    id="segmented-button-dropdown-1"
    onClick={handleSearch}
  >
    {medicalUses.map((use, index) => (
      <Dropdown.Item key={index} onClick={() => handleMedicalUseFilter(use)}>
        {use}
      </Dropdown.Item>
    ))}
    <Dropdown.Divider />
  </SplitButton>
  <Form.Control
    id="searchInput"
    type="search"
    placeholder="Search"
    aria-label="Text input for search"
     
  />
</InputGroup>
      <div className="homescreen">
        <h2 className="homescreen_title">Meds</h2>
        <div className="homescreen_meds">
          {Array.isArray(allMedicines) ? (
            allMedicines.map((medicine) => <Meds key={medicine.Name} medicines={[medicine]} />)
          ) : (
            <p>Error: Medicines data is not in the expected format.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Homescreen;
