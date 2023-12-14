import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import "../Screens/AdminScreen.css";

function Sales() {
    var [meds,setMeds]= useState([])
    var[total,setTotal]=useState(0);
    const [age, setAge] = React.useState('');
    var [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;
    var [date,setDate]=useState(0);
    var [noMedsSold,setNoMedsSold]=useState(false);
    const [selectedMonth, setSelectedMonth] = useState('');
    var[uniqueMedicineNames,setuniqueMedicineNames] =useState([])
    


   
    const getMedicines = async () => {
        //   setAnchorEl(null);
        setNoMedsSold(false)
           try {
             const response = await fetch(`http://localhost:7000/Admin/totalSalesReport/${date}`, { headers: { Authorization: 'Bearer ' + sessionStorage.getItem("token") } });
            //  const response = await fetch(`http://localhost:7000/Pharma/totalSalesReport`, { headers: { Authorization: 'Bearer ' + sessionStorage.getItem("token") } });
             const jsonData = await response.json();
             console.log( jsonData)
     
             if (Array.isArray(jsonData.Result.medicinesSold)) {
               setMeds(jsonData.Result.medicinesSold);
               setTotal(jsonData.Result.totalSales);
               console.log(meds);
               setuniqueMedicineNames ( [...new Set(jsonData.Result.medicinesSold.map(med => med.medicineName))]);
               console.log('Unique Medicine Names:', uniqueMedicineNames); 

             }          
             else {
               console.error('Invalid data format. Expected an array.');
             }
             
             if(meds.length===0){
              //Empty Table
              console.log('EMPTYYYYY')
             }
           } catch (error) {
            setNoMedsSold(true)
             console.error('Error fetching data:', error);
             setuniqueMedicineNames ([]);
           }
         };

         useEffect(() => {
       }, []);

       const handleChange = (event) => {
        // setDate(event.target.value);
        setSelectedMonth(event.target.value);
        const selectedDate = event.target.value;
        setDate(selectedDate, () => {
          // Now you can use the updated value of 'date' immediately
          console.log('Updated:', selectedDate);
         
        });
        // getMedicines()
      };
       const handleClose = () => {
        setAnchorEl(null);
      };
    

       const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((previousOpen) => !previousOpen);
      };
      
      

      const Filter= async()=>{
        let month = document.getElementsByName('month')[0]?.value;
        setDate(month);
        await getMedicines();
        console.log("DATE:"+ date);
        console.log("MONTH:    "+month);
      }
    
      useEffect(() => {
        // This code will run every time 'date' changes
        console.log('Updated Date:', date);

      }, [date]); // Add 'date' as a dependency
    
     
       open=Boolean(anchorEl);
       console.log(  "UNIQUE "+uniqueMedicineNames);
  return (
   
    
<div> 

  <div style={{width:"50%" , margin:"auto"}}>
  <InputGroup className='mt-3 mb-3'>
  <Form.Select aria-label="Month" size="lg" name='month' style={{width:"50%" , margin:"auto" }} onChange={handleChange} value={selectedMonth}>
    <option value=''>Choose a month</option>
      <option value={1}>January</option>
          <option value={2}>February</option>
          <option value={3}>March</option>
          <option value={4}>April</option>
          <option value={5}>May</option>
          <option value={6}>June</option>
          <option value={7}>July</option>
          <option value={8}>August</option>
          <option value={9}>September</option>
          <option value={10}>October</option>
          <option value={11}>November</option>
          <option value={12}>December</option>
    </Form.Select>

    <Button  onClick={Filter}>
  Filter
</Button>
   </InputGroup>



  </div>

      <Table striped bordered hover style={{width:"80%" , margin:"auto" }}>
      <thead>
        <tr>
          <th>Medicine Name</th>
          <th>Amount Sold</th>
          <th>price/item</th>
          <th>Order Price</th>
          
        </tr>
      </thead>
      <tbody>
     

{noMedsSold ? (
  <tr>
    <th colSpan={4}>No medicines were sold during this month</th>
  </tr>
) : (
  <>
    {meds.map((med) => (
      <tr key={med.id}>
        <td>{med.medicineName}</td>
        <td>{med.quantitySold}</td>
        <td>{med.price}</td>
        <td>{med.totalPrice}</td>
      </tr>
    ))}
    <tr>
      <th colSpan={3}>Total sales for the month</th>
      <th>{total}</th>
    </tr>
  </>
)}


         
   
      </tbody>
    </Table>
    </div>
  );
}

export default Sales;