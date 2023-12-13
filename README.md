
# Titans Pharmacy

this projects intends to serve as a fully functional pharmacy webapp , it's linked to the clinic webapp having the same database for patients meaning that if you registered as a patient in the clinic website you don't need to register again in the pharmacy website , just sign in with your credentials and you're good to go 


#  Motivation
We came up with this project in order to facilitate communication between pharmacies and clinics and our goal is to bridge the gap between individuals and the medications they need, making healthcare more accessible and convenient for everyone.
# Build Status 

# Code Style
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
# Installation

Follow these steps to set up and run the MERN stack application locally on your machine.

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)

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

#### Accept Pharmacist

```http
  POST /admin/Acceptance/${username}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Username` | `String` | **Required**. The username of the pharmacist |

#### Reject Pharmacist

```http
  GET /admin/Rejection/${username}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Username` | `String` | **Required**. The username of the pharmacist |

#### Get all requested pharmacists

```http
  GET /admin/viewReqPharm
```

| Description                       |
|  :-------------------------------- |
|  gets a list of all the requested pharmacists |


#### Create Admin

```http
  POST /admin/createAdmin
```

| Body|Type|Description                       |
| ---|--|:-------------------------------- |
| `Username - Password`|`String - String`| Adds a new admin to the system with the given username and password |



#### Delete Admin

```http
  POST /admin/DeleteAdmin/${Username}
```

| Query|Type|Description                       |
| ---|--|:-------------------------------- |
| `Username `|`String `| Deletes the admin with the given username from the system |


#### Get medicine by name 

```http
  POST /admin/getMedicine/${Name}
```

| Query|Type|Description                       |
| ---|--|:-------------------------------- |
| `Name `|`String `| Gets the medicine by the medicine name |



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
||



## Patient

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
