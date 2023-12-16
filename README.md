
# Titans Pharmacy

this projects intends to serve as a fully functional pharmacy webapp , it's linked to the clinic webapp having the same database for patients meaning that if you registered as a patient in the clinic website you don't need to register again in the pharmacy website , just sign in with your credentials and you're good to go 


#  Motivation
We came up with this project in order to facilitate communication between pharmacies and clinics and our goal is to bridge the gap between individuals and the medications they need, making healthcare more accessible and convenient for everyone.
# Build Status 
#### Due to the free plan subscription to Mongo Atlas database the speed of the website in which you fetch data from the database or send data to the database may be slower than expected , and sometimes this may cause a runtime error yet as developers we are searching on how to make the website faster so don't worry if tou feel that the website is slow it's not an error 
# Code Style

#### 1- Indentation 
use the tab to indent 

#### 2- Naming Conventions 
use camelCase for naming 
```javascript
let medicalUse = "cold";
```
#### 3- Comments 
Use descriptive comments to explain complex code or logic. Keep comments concise and up to date.
```javascript
// This function calculates the sum of two numbers
function add(a, b) {
  return a + b;
}
```
#### 4- Line Length
limit line length to the width of the screen to have better readability

#### 5- File Organisation
Organize files logically and group related functionalities together.

# Screenshots

#### To view the images of the system press [here](https://drive.google.com/drive/folders/1v_4ZHKCGxWNHmmG9vTANK-lVoi_IKDdN?usp=share_link)






# Tech/Frameworks Used

Our web application is built using the MERN stack, incorporating various technologies and frameworks to provide a powerful and modern development environment.

## Backend

- **Node.js:**
  - A JavaScript runtime built on Chrome's V8 JavaScript engine.

- **Express.js:**
  - A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

- **MongoDB:**
  - A NoSQL document database that stores data in a flexible, JSON-like format.

## Frontend

- **React:**
  - A JavaScript library for building user interfaces, maintained by Meta.

- **React Bootstrap:**
  - A popular front-end framework for designing responsive and mobile-first websites.

 - **Material UI:**
   - A popular front-end framework for designing responsive websites.


## Database

- **MongoDB:**
  - A NoSQL document database that provides scalability, flexibility, and high performance.

## Other Technologies

- **Mongoose:**
  - An ODM (Object-Document Mapping) library for MongoDB and Node.js, providing a schema-based solution to model application data.

## Development Tools

- **npm (Node Package Manager):**
  - A package manager for JavaScript, used to manage project dependencies and scripts.

- **Create React App:**
  - A command-line tool to create React applications with no build configuration.
# Features

Our webapp can come with different features for 3 main users


## General Features

- **Secure Login:** Users can securely create accounts and log in to access personalized features.

- **Secure Password Reset:** Users can securely reset their password in case the forgot it using an OTP sent to mail 


- **Comprehensive Medicine Listings:** Browse through a comprehensive catalog of all available medicines.
  - **Rich Information:** Each medicine listing includes:
  - **Medicine Picture:** Visual representation of the medicine.
  - **Price:** Clear indication of the medicine's cost.
  
  - **Search and Filter:** Easily search for specific medicines or filter based on categories, ensuring a smooth and efficient browsing experience.

  - **User-Friendly Interface:** Navigate through the medicines catalog with an intuitive and user-friendly interface.
- **Real-time Notifications:** Users receive real-time notifications for important events and updates.


## Pharmacist

- **Secure Transactions:** Security measures to ensure the safety of user data and transactions upon receiving their hourly rate.

- **Medicine Management:**
   Pharmacists can add medicinces with their info (medicine name , price , active ingredients, medicine image , available quantity) , they can also edit details for medicines in case a change happened furthermore , they can archive or unarchive a medicine . Lastly they receive notifications on the system an via email once a medicine has gone out of stock

- **Total Sales Report:** View a comprehensive sales report based on the chosen month.
  
- **Filter Sales Report:** Easily filter the sales report based on specific medicines during specific dates.
- **Communication system with doctors:** Pharmacists can easily communicate with doctors through a chatting system 


## Patient

## 1. Shopping Cart

- **Add to Cart:** Easily add Over-the-Counter or Prescription medicines (if they exist in the prescription) to your shopping cart.

- **View Cart:**
  Quickly view and manage items in your cart.

- **Remove and Adjust:**
   Remove items or change quantities in the cart effortlessly.

## 2. Checkout

- **Prescription Checkout:**
  Checkout with prescription medicines based on your uploaded prescription.

- **Multiple Delivery Addresses:**
  Add and choose from multiple delivery addresses during checkout.

- **Payment Options:** Choose from Wallet, Credit Card (via Stripe), or Cash on Delivery during checkout.

## 3. Order Management

- **View Orders:**
  Access current and past orders easily.

- **Order Details:**
  View order details, status, and alternatives for out-of-stock medicines.

- **Cancel Orders:**
   Cancel orders when needed.

- **Secure Transactions:** Security measures to ensure the safety of user data and transactions.

## 4. Communication System
- **Chat system with Pharmacists:** Pharmacists can easily communicate with doctors through a chatting system 



## Admin

- **Add Administrator:**
   Easily add a new administrator with predefined credentials.

- **Remove User Accounts:**
   Admins can remove pharmacists or patients from the system.

- **Pharmacist Onboarding:**
   View information uploaded by pharmacists applying to join the platform.

- **Approve/Reject Pharmacist Request:**
   Admins can accept or reject pharmacist registration requests.

- **View Pharmacist Information:**
   Access detailed information about registered pharmacists.

- **View Patient Information:**
   View basic information about registered patients.



# Code Examples
## 1. Express.js API Endpoint

```javascript
// Example code for creating an Express.js API endpoint
const express = require("express");
const mongoose = require('mongoose');
const multer = require("multer");
mongoose.set('strictQuery', false);
require("dotenv").config();
const jwt = require('jsonwebtoken');
const connectDB = require('./config/db.js');
const MongoURI = process.env.MONGO_URI;
const app = express();
const port = process.env.PORT || "7000";
const http =require ('http');
const Admin = require('./Routes/Adminph.js');
const Patient = require('./Routes/PatientController.js');
const Pharmacist = require('./Routes/PharmacistController.js');
const securityModule=require('./Routes/securityRoute.js')
const ejs = require('ejs');

// Start the server
const server = http.Server(app)
  server.listen(port, "localhost", () => {
    console.log("Server is running on port 7000");
  });

```
## 2. MongoDB Connection

```javascript
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const MongoURI = process.env.MONGO_URI ;

const connectDB = async () => {
  try{
      const conn = await mongoose.connect(process.env.MONGO_URI,{
          dbName: 'mernapp'
      });

      console.log(`mongodb connected ${conn.connection.host}`)
  }
  catch(err){
      console.log(err)
      process.exit(1)
  }
}

module.exports = connectDB
```
## 3. React Page creation

```javascript

import Body from '../Components/PharmScreenBody';
import Nav from "../Components/Pharmacist-NavBar";



function pharmacistScreen() {
    return (
    <div>
       <Nav/>
       <Body/>
    </div>   
        
    )
}
export default pharmacistScreen;
```

## 4. React Component #1

```javascript
import React from 'react';
import { Link } from 'react-router-dom';

const Meds = ({ medicines }) => {
    if (!medicines || !Array.isArray(medicines)) {
        return null; // or handle this case in a way that makes sense for your application
      }
  return (
    <div className="Medcines">
      {medicines.map((medicine) => (
        <div key={medicine.id} className="medicine">
          {medicine.Picture && medicine.Picture.data && medicine.Picture.contentType && (
            <img
              src={`data:${medicine.Picture.contentType};base64,${arrayBufferToBase64(medicine.Picture.data.data)}`}
              alt={medicine.Name}
            />
          )}
          <div className="meds_info">
            <p className="info_name">{medicine.Name}</p>
            <p className="infooo">{medicine.MedicalUse.join(' ')}</p>
            <p className="price">${medicine.Price} </p>
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

// Utility function to convert ArrayBuffer to Base64
function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;

  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  return btoa(binary);
}


```
## React Component #2
```javascript
import React, { useState } from 'react';

const SearchFilterComponent = ({ onSearchResult }) => {
  const [searchInput, setSearchInput] = useState('');
  const [filterInput, setFilterInput] = useState('');

  const handleSearch = async () => {
    try {
      const response = await fetch('http://localhost:7000/Patient/getMedicine2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Name: searchInput }),
      });

      const jsonData = await response.json();
      console.log(jsonData);

      // Invoke the onSearchResult prop with the search result
      onSearchResult && onSearchResult(jsonData.Result);

      // If needed, perform other actions with the result
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  const handleFilter = async () => {
    try {
      const response = await fetch('http://localhost:7000/Patient/filterMedical2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ MedicalUse: filterInput }),
      });

      const jsonData = await response.json();
      console.log(jsonData);
      // Update state or handle the response as needed
    } catch (error) {
      console.error('Error filtering:', error);
    }
  };

  return (
    <div>
      <textarea
        placeholder="Search..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <textarea
        placeholder="Filter..."
        value={filterInput}
        onChange={(e) => setFilterInput(e.target.value)}
      />
      <button onClick={handleFilter}>Filter</button>
    </div>
  );
};

export default SearchFilterComponent;

```
## Installation

- [Install VS Code](https://code.visualstudio.com/download)
- [Install Node](http://nodejs.org/)
- [Install Git](https://git-scm.com/downloads)
After downloading these two, open a terminal and do the following:
```bash
  npm install -g nodemon
  npm install -g express
  npm install -g mongoose
```

# API Reference

 ### General

#### Forgot password

 ```http
  POST /security/forgotPassword
```

|Body|Type|Description |
|----------|--|:------------------------- |
|`User Email`|`String`|resets the password |



#### Change password

 ```http
  POST /security/changePassword
```

|Body|Type|Description |
|---------|---|:------------------------- |
|`Old Password - New Password`|`String - String`|Changes the password given that the old password macthes the password in the database (for extra security) with the new password |



#### OTP sending via email 

 ```http
  POST /security/sendOTP
```

|Body|Description                |
|------------|:------------------------- |
| `User Email`|Sends an OTP to the user via email in case of forgotten password |


#### OTP verification

 ```http
  POST /security/verifyOTP
```

|Body|Description                |
|----|:------------------------- |
| `User Email`|Verifies the OTP  |

  ### Admin

#### Gets all medicine

```http
  GET /Admin/getAllMedicine
```

| Description                       |
|  :-------------------------------- |
|  gets a list of all Medicines |

#### Gets medicine by a specific name

```http
  GET /Admin/getMedicine/${Name}
```

| Query|Type|Description                       |
| ---|--|:-------------------------------- |
| ` Name`|` String`| Fetches the Medicine having the same Name as the queryParam provided|


#### Gets all medical use

```http
  GET /Admin/getAllMedicalUses
```

| Description                       |
|  :-------------------------------- |
|  gets a list of all Medical Uses |

#### Gets medicine by a specific medical use

```http
  GET /Admin/filterMedical/${MedicalUse)
```

| Query|Type|Description                       |
| ---|--|:-------------------------------- |
| ` MedicalUse`|` String`| Fetches a list of all medicine with a certain Medical Use Provided|

#### Accept Pharmacist

```http
  POST /Admin/Acceptance/${username}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Username` | `String` | **Required**. The username of the pharmacist |

#### Reject Pharmacist

```http
  DELETE /Admin/Rejection/${username}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Username` | `String` | **Required**. The username of the pharmacist |

#### Get all requested pharmacists

```http
  GET /Admin/viewReqPharm
```

| Description                       |
|  :-------------------------------- |
|  gets a list of all the requested pharmacists |

#### Get the total sales report by a specific month

```http
  GET /Admin/totalSalesReport/${chosenMonth}
```

| Query|Type|Description                       |
| ---|--|:-------------------------------- |
| ` chosenMonth`|` String`| Fetches the sales report filtered by the month provided as a queryParam|


## Pharmacist

#### Add medicine

```http
  POST /Pharma/addMedicine
```

| Body      | Description                |
| :--------------- | :------------------------- |
| `Formdata`  |  Adds a new medicine based on the values in the formdata  

Formdata contains medicine name , price , quantity , active ingrredient(s) , Medical use , (Over the counter or prescription based medicine) , medicine image



#### View Total sales report

```http
  GET /Pharma/totalSalesReport
```

|   Description | 
| :----- |
| Gets the total sales report for the year 

#### Filter sales report on month

```http
GET /Pharma/totalSalesReport/${date}
```
|Parameter | Description |
| :----- | :---- |
|date| Returns the total sales report for a specific month 



## Patient

####  Add a new address 

```http
POST /Patient/addAddress
```
|Body| Description|
|:-----|:------|
|Address| Allows the patient to add a new address where the medicines are to be delivered 

#### Get all the unarchived medicines 

```http
GET /Patient/getAllMedicine2
```
|Description|
|:-----|
Gets all the unarchived medicines and displays them to the patient

#### Find an alternative
```http
GET /Patient/findAlternatives/${inputValue}
```

|Parameter|Description|
|:----|:-----|
input value|Finds an alternative for the medicine 

N.B: the input value is the medicine name 


#### Delete cart item

``` http
POST /Patient/deleteCartItem/${item._id}
````

|Parameter|Description|
|:----|:-----|
item_id|Deletes an item from the cart based on the id of this item 


## Test cases 
#### to view test cases press [here](https://drive.google.com/drive/folders/1YnBdlzHtmMuBAtA8-NMeNZC3hgSjfdd8?usp=sharing)
# How to use

Follow these steps to set up and run the MERN stack application locally on your machine.


## Clone the Repository

```bash
git clone https://github.com/advanced-computer-lab-2023/Terminal-Titans-Pharmacy.git

cd Terminal-Titans-Pharmacy

```

## Backend Setup



```bash
# Navigate to the server directory

cd src

# Install server dependencies

npm install

# Create a .env file in the server directory and add the following:
# PORT=7000
# MONGO_URI='mongodb+srv://farahalfawzy:terminaltitans@mernapp.n3hzhmm.mongodb.net/?retryWrites=true&w=majority'
#JWT_SECRET='abc123'
#MAIL_USER='terminaltitansacl@gmail.com'
#MAIL_PASS='hzbw etjg nozv yluu'

# You can start the backend either by running it on Node using

node App.js

#Or on Nodemon using 

npm run dev

```


## Frontend Setup



```bash
# Navigate to the Frontend directory

cd frontend

# Install frontend dependencies

npm install

npm start

```

# Contributing

We welcome contributions from the community! If you're interested in contributing to our project, please follow the guidelines below:

## Getting Started

 1. **Fork the Repository:**
   - Click the "Fork" button on the top right corner of this repository to create your own copy.

2. **Clone Your Fork:**
   - Clone the repository to your local machine using the following command:
     ```bash
     git clone https://github.com/your-username/your-project.git
     
     #replace the url with the url of your repo 
     ```

3. **Create a Branch:**
   - Create a new branch for your feature or bug fix:
     ```bash
     git checkout -b feature/new-feature
     ```

4. **Make Changes:**
   - Implement your changes or add new features.

5. **Test:**
   - Ensure that your changes are thoroughly tested.

6. **Commit Changes:**
   - Commit your changes with a descriptive commit message:
     ```bash
     git commit -m "Add new feature: your feature description"
     ```

7. **Push Changes:**
   - Push your changes to your forked repository:
     ```bash
     git push origin feature/new-feature
     ```

8. **Create a Pull Request:**
   - Open a Pull Request (PR) from your forked repository to the original repository. Provide a detailed description of your changes.

## Contributors

- [Farah Maher](https://github.com/farahalfawzy)
- [Seif Hossam](https://github.com/seifhossam2002)
- [Paula Bassem](https://github.com/paula-iskander)
- [Abdelrahman Ahmed](https://github.com/Abdelrahman772)
- [Micheal Mokhles](https://github.com/Mickey0002)
- [Abdullah el nahas](https://github.com/AbdullahElNahas)
- [Youssef Eid](https://github.com/Joseph-Eid)
- [Habiba Mohamed](https://github.com/HabibaMohamedd4)


# Credits
We would initially like to thank Dr. Mervat Abu el Kheir and all the TAs for their help , there have been multiple online sources that aided us in this project and these sources are :
- http://openai.com/chatgpt 
- https://bard.google.com/chat
- https://www.bing.com/search?q=Bing+AI&showconv=1&FORM=hpcodx
- https://m.youtube.com/watch?v=0divhP3pEsg
- https://www.youtube.com/watch?v=-0exw-9YJBo&list=PLillGF-RfqbbQeVSccR9PGKHzPJSWqcsm
- https://youtu.be/mYy-d6BtqmU?si=p0M90zFwYVzqlmyv
- https://youtu.be/gnM3Ld6_upE?si=SGJ3iAZse6htZK0I
- https://youtu.be/1r-F3FIONl8
# License

This project is licensed under the Apache License 2.0 - see the [LICENSE](https://www.apache.org/licenses/LICENSE-2.0) file for details.
