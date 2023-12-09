const PatientModel = require("../Models/Patient.js");
const MedicineModel = require("../Models/Medicine.js");
const CartItem = require("../Models/Cart.js");
const Order = require("../Models/Orders.js");
const express = require('express');
const protect = require("../middleware/authMiddleware.js");
const router = express.Router();
const stripe= require('stripe')
const healthPackageModel = require("../Models/healthPackageModel.js");
const healthPackageStatus = require("../Models/healthPackageStatus.js");
const transactionsModel=require("../Models/transactionsModel.js");


//App variables
const app = express();
app.use(express.urlencoded({ extended: false }))
const stripeInstance = stripe('sk_test_51OAmglE5rOvAFcqVk714zBO64pgCArV8MfP0BWTnycXGzLnWqkX5cP37OvMffUIDt6DdoKif93x9PfiC39XvkhJr00LuYVmMyv');
//const stripe = require('stripe')(s);

router.get('/filterMedical/:MedicalUse', protect, async (req, res) => {
  try {
    const exists = await PatientModel.findById(req.user);
    if (!exists || req.user.__t !== 'patient') {
      return res.status(500).json({
        success: false,
        message: 'Not authorized',
      });
    }

    const medicalUse = req.params.MedicalUse.toLowerCase();
    console.log(medicalUse);

    if (!medicalUse) {
      return res.status(400).send({ message: 'Please fill the input', success: false });
    }

    const filteredMedicines = await MedicineModel.find({
      MedicalUse: medicalUse,
      OverTheCounter: true,
      Archived: false,
    });

    if (!filteredMedicines.length) {
      return res.status(400).send({
        message: 'No medicines found with the specified medical use and conditions.',
        success: false,
      });
    }

    console.log(filteredMedicines);
    res.status(200).send({ Result: filteredMedicines, success: true });
  } catch (error) {
    console.error('Error filtering medicine data:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// //filter based on medical use
// router.get('/filterMedical/:MedicalUse', protect, async (req, res) => {
//   let exists = await PatientModel.findById(req.user);
//   if (!exists || req.user.__t != "Patient") {
//     return res.status(500).json({
//       success: false,
//       message: "Not authorized"
//     });
//   }
//   const MedicalUse = req.params.MedicalUse.toLowerCase();
//   console.log(MedicalUse);
//   if (!MedicalUse) {
//     return res.status(400).send({ message: 'Please fill the input', success: false });
//   }

//   const Medicines = await MedicineModel.find({ MedicalUse });
//   if (!Medicines.length) {
//     return res.status(400).send({ message: 'No medicines found with the specified medical use.', success: false });
//   }
//   console.log(Medicines);
//   res.status(200).send({ Result: Medicines, success: true })

// });



// //search for medicine based on name
// router.get('/getMedicine/:Name', protect, async (req, res) => {
//   let exists = await PatientModel.findById(req.user);
//   if (!exists || req.user.__t != "Patient") {
//     return res.status(500).json({
//       success: false,
//       message: "Not authorized"
//     });
//   }
//   const Name = req.params.Name.toLowerCase();
//   console.log(Name);
//   if (!Name) {
//     return res.status(400).send({ message: 'Please fill the input', success: false });
//   }
//   try {
//     // const Name = req.body;
//     const Medicines = await MedicineModel.findOne({ Name , OverTheCounter: true , Archived: false });
//     console.log(Medicines);
//     if (!Medicines) {
//       return (res.status(400).send({ message: "No Medicine with this name", success: false }));
//     }
//     res.status(200).json({ Result: Medicines, success: true });
//   }

//   catch (error) {
//     res.status(500).json({ message: "Failed getMedicine", success: false })
//   }
// });
// router.get('/getMedicine/:Name', protect, async (req, res) => {
//   try {
//     let exists = await PatientModel.findById(req.user);
//     if (!exists || req.user.__t != "Patient") {
//       return res.status(500).json({
//         success: false,
//         message: "Not authorized"
//       });
//     }

//     const Name = req.params.Name.toLowerCase();
//     console.log(Name);

//     if (!Name) {
//       return res.status(400).send({ message: 'Please fill the input', success: false });
//     }

//     const searchedMedicine = await MedicineModel.findOne({ Name, OverTheCounter: true, Archived: false });

//     if (!searchedMedicine) {
//       // If the searched medicine is not found, check for alternatives based on medical use
//       const alternatives = await MedicineModel.find({ MedicalUse: searchedMedicine.MedicalUse, OverTheCounter: true, Archived: false });
      
//       if (alternatives.length === 0) {
//         return res.status(400).send({ message: "No Medicine with this name and no alternatives found", success: false });
//       }

//       return res.status(200).json({ Alternatives: alternatives, success: true });
//     }

//     if (searchedMedicine.Stock <= 0) {
//       // If the searched medicine is out of stock, get alternatives based on medical use
//       const alternatives = await MedicineModel.find({ MedicalUse: searchedMedicine.MedicalUse, OverTheCounter: true, Archived: false });
      
//       if (alternatives.length === 0) {
//         return res.status(400).send({ message: "Medicine is out of stock and no alternatives found", success: false });
//       }

//       return res.status(200).json({ Alternatives: alternatives, success: true });
//     }

//     res.status(200).json({ Result: searchedMedicine, success: true });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed getMedicine", success: false });
//   }
// });
// Search for a medicine by name
router.get('/getMedicine/:Name', protect, async (req, res) => {
  try {
    let exists = await PatientModel.findById(req.user);
    if (!exists || req.user.__t !== "patient") {
      return res.status(500).json({
        success: false,
        message: "Not authorized"
      });
    }

    const Name = req.params.Name.toLowerCase();
    console.log(Name);

    if (!Name) {
      return res.status(400).send({ message: 'Please fill the input', success: false });
    }

    const searchedMedicine = await MedicineModel.findOne({ Name, OverTheCounter: true, Archived: false });

    if (!searchedMedicine) {
      return res.status(400).send({ message: "No Medicine with this name found", success: false });
    }

    res.status(200).json({ Result: searchedMedicine, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to search for the medicine", success: false });
  }
});

// Find alternatives for a medicine based on its name
router.get('/findAlternatives/:Name', protect, async (req, res) => {
  try {
    let exists = await PatientModel.findById(req.user);
    if (!exists || req.user.__t !== "patient") {
      return res.status(500).json({
        success: false,
        message: "Not authorized"
      });
    }

    const Name = req.params.Name.toLowerCase();
    console.log(Name);

    if (!Name) {
      return res.status(400).send({ message: 'Please fill the input', success: false });
    }

    const searchedMedicine = await MedicineModel.findOne({ Name, OverTheCounter: true, Archived: false });

    if (!searchedMedicine) {
      // If the searched medicine is not found, check for alternatives based on medical use
      const alternatives = await MedicineModel.find({ MedicalUse: searchedMedicine.MedicalUse, OverTheCounter: true, Archived: false, Quantity: { $gt: 0 } });
      console.log(alternatives);
      if (alternatives.length === 0) {
        return res.status(400).send({ message: "No alternatives found for this medicine", success: false });
      }

      return res.status(200).json({ Alternatives: alternatives, success: true });
    }

    if (searchedMedicine.Quantity <= 0) {
      // If the searched medicine is out of stock, get alternatives based on medical use
      const alternatives = await MedicineModel.find({ MedicalUse: searchedMedicine.MedicalUse, OverTheCounter: true, Archived: false, Quantity: { $gt: 0 } });
      console.log(alternatives);
      if (alternatives.length === 0) {
        return res.status(400).send({ message: "Medicine is out of stock and no alternatives found", success: false });
      }

      return res.status(200).json({ Alternatives: alternatives, success: true });
    }

    return res.status(400).send({ message: "This medicine is not eligible for alternatives", success: false });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to find alternatives", success: false });
  }
});

//get all medicine over the counter and not archived
router.get('/getAllMedicine2', protect, async (req, res) => {
  try {
    let exists = await PatientModel.findById(req.user);
    if (!exists || req.user.__t != "patient") {
      return res.status(500).json({
        success: false,
        message: "Not authorized"
      });
    }

    const meds = await MedicineModel.find({ OverTheCounter: true , Archived: false});

    // Add a new property 'isOverTheCounter' to each medicine object

    res.status(200).json({ success: true, meds});
  } catch (error) {
    console.error('Error fetching medicine data:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

//old get all medicine
router.get('/getAllMedicine', protect, async (req, res) => {
  try {
    console.log(req.user.__t);
    let exists = await PatientModel.findById(req.user);
    if (!exists || req.user.__t != "patient") {
      return res.status(500).json({
        success: false,
        message: "Not authorized"
      });
    }

    const meds = await MedicineModel.find();
console.log(meds)
    
    // const medicines = data.Result.filter((medicine) => medicine.Picture);
    res.status(200).json({ success: true, meds });
  } catch (error) {
    console.error('Error fetching medicine data:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

//get medicine by id
router.get('/getMedicineById/:id', protect, async (req, res) => {
  try {
    let exists = await PatientModel.findById(req.user);
    if (!exists || req.user.__t != "patient") {
      return res.status(500).json({
        success: false,
        message: "Not authorized"
      });
    }
    const id = req.params.id;
    const meds = await MedicineModel.findById(id);

    // const medicines = data.Result.filter((medicine) => medicine.Picture);
    res.status(200).json({ success: true, meds });
  } catch (error) {
    console.error('Error fetching medicine data:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/getAllMedicalUses', protect, async (req, res) => {
  console.log("pp");
  try {

    let exists = await PatientModel.findById(req.user);
    if (!exists || req.user.__t !== 'patient' ) {
      return res.status(500).json({
        success: false,
        message: 'Not authorized',
      });
    }
    const medicines = await MedicineModel.find({Archived:false, OverTheCounter: true});

    // Extract unique medical uses using Set
    const medicalUsesSet = new Set();
    medicines.forEach((medicine) => {
      medicine.MedicalUse.forEach((use) => {
        medicalUsesSet.add(use);
      });
    });

    const medicalUses = Array.from(medicalUsesSet);
console.log(medicalUsesSet)
    res.status(200).json({ success: true, medicalUses });
  } catch (error) {
    console.error('Error fetching medical uses:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});


// }
// router.get('/viewAvailableMedicines', viewInfo);
// Import required packages

// Add a medicine to the cart
// router.post('/addToCart', protect, async (req, res) => {
//   let exists = await patientModel.findById(req.user);
//   if (!exists) {
//     return res.status(500).json({
//       success: false,
//       message: "Not authorized"
//     });
//   }
//   try {
//     const medicineId = req.body.medicineId;

//     // Check if the item is already in the cart
//     const existingCartItem = await CartItem.findOne({ medicineId });

//     if (existingCartItem) {
//       if (quantity <= 0) {
//         return res.status(400).json({ error: 'Invalid quantity selected' });
//       }

//       // Check if there's enough quantity in stock
//       if (medicine.Quantity - existingCartItem.quantity >= quantity) {
//         // If it exists, update the quantity and calculate the new price
//         existingCartItem.quantity += quantity;
//         existingCartItem.price = existingCartItem.quantity * medicine.Price; // Calculate the new price
//         await existingCartItem.save();

//         // Decrement the medicine quantity
//         // medicine.Quantity -= quantity;
//         await medicine.save();

//         res.json(existingCartItem);
//       } else {
//         res.status(404).json({ message: "no stoke", success: false });
//       }
//     } else {
//       if (quantity <= 0) {
//         return res.status(400).json({ error: 'Invalid quantity selected' });
//       }

//       // If not, create a new cart item and calculate the price
//       const newCartItem = new CartItem({ medicineId, quantity });
//       newCartItem.price = newCartItem.quantity * medicine.Price; // Calculate the price
//       await newCartItem.save();

//       // Decrement the medicine quantity
//       //  medicine.Quantity -= quantity;
//       await medicine.save();

//       res.json(newCartItem);
//     }
//   }
//   catch (error) {
//     console.error('Error adding to cart:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// Add a medicine to the cart
router.post('/addToCart/:medicineId', protect, async (req, res) => {
  let exists = await PatientModel.findById(req.user);
  if (!exists || req.user.__t !== "patient") {
    return res.status(500).json({
      success: false,
      message: "Not authorized"
    });
  }
  try {
    const userId = req.user._id; // Assuming req.user contains the user ID
    const medicineId = req.params.medicineId;
    const quantity = req.body.quantity || 1; // Default to 1 if quantity is not provided

    // Check if the item is already in the cart for the specific user
    const existingCartItem = await CartItem.findOne({ userId, medicineId });

    // Retrieve medicine details
    const medicine = await MedicineModel.findById(medicineId);

    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found', success: false });
    }

    if (existingCartItem) {
      // If it exists, update the quantity and calculate the new price
      if (medicine.Quantity - existingCartItem.quantity >= quantity) {
        existingCartItem.quantity += quantity;
      }else{
        return res.status(400).json({ message: "no stoke", success: false });
      }
      existingCartItem.price = medicine.Price; // Calculate the new price
      await existingCartItem.save();

      res.json({ existingCartItem, success: false });
    } else {
      // If not, create a new cart item and calculate the price
      const newCartItem = new CartItem({ userId, medicineId, quantity });
      newCartItem.price = medicine.Price; // Calculate the price
      await newCartItem.save();

      res.json({ newCartItem, success: false });
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: 'Internal server error', success: false });
  }
});

// router.get('/cartItemCount', async (req, res) => {
//   try {
//       // const userId = req.params.userId;

//       // // Count the number of items in the user's cart
//       // const itemCount = await Cart.countDocuments({ userId });
//       const itemCount = await Cart.countDocuments();
//       console.log(itemCount);
//       res.json({ itemCount });
//   } catch (error) {
//       console.error('Error getting cart item count:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// Retrieve the number of items in the cart to help in the frontend
router.get('/cartItemCount', protect, async (req, res) => {
  let exists = await PatientModel.findById(req.user);
  if (!exists || req.user.__t !== "patient") {
    return res.status(500).json({
      success: false,
      message: "Not authorized"
    });
  }
  try {
    // Assuming you have a field named userId in the CartItem model
    const cartItems = await CartItem.find({ userId: req.user._id });

    const itemCount = cartItems.length;

    console.log(itemCount);
    res.json({ itemCount });
  } catch (error) {
    console.error('Error getting cart item count:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add this route handler to your Express app (app.js or your main application file)
// const getListMed = async (req, res) => {
//   //retrieve all users from the database
//   try {
//     const meds = await MedicineModel.find();
//     res.status(200).json({ Result: meds, success: true });
//   }

//   catch (error) {
//     res.status(500).json({ message: "No Medicine listed", success: false })
//   }
// }

// router.get('/getAllMedicine', getListMed);

// View the cart
router.get('/cartinCheckOut',protect, async (req, res) => {
  let exists = await PatientModel.findById(req.user);
  if (!exists || req.user.__t !== "patient") {
    return res.status(500).json({
      success: false,
      message: "Not authorized"
    });
  } let pid = req.user._id//temp until login
 
  let myHealthStatus = await healthPackageStatus.findOne({ patientId: pid, status: 'Subscribed' });
  
  const packId = myHealthStatus.healthPackageId;
  var discountP = 0;
  if (packId) {
      const allPackages = await healthPackageModel.find({ _id: packId });
      if (allPackages.length > 0)
          discountP = allPackages[0].medicinDiscountInPercentage;
      else
          return (res.status(400).send({ error: "cant find package", success: false }));

  }
  console.log(packId);
  const cartItems = await CartItem.find({ userId: pid });
  let list = []
  let total=0;
  for (var x in cartItems) {
    console.log(cartItems[x])
    const med = await MedicineModel.findById(cartItems[x].medicineId);
    medInfo = {
      id: med._id,
      Name: med.Name,
      Price: med.Price-(med.Price*discountP/100),
      Quantity: cartItems[x].quantity,
    }
    total+=(med.Price-(med.Price*discountP/100))*cartItems[x].quantity,
    list.push(medInfo);
  }
  
  Result = {
    total: total,
    medInfo: list,
    wallet: Math.round(exists.Wallet * 100) / 100,  
  }
  res.json(Result);
});

// Delete an item from the cart
router.delete('/deleteCartItem/:cartItemId', protect, async (req, res) => {
  let exists = await PatientModel.findById(req.user);
  if (!exists || req.user.__t !== "patient") {
    return res.status(500).json({
      success: false,
      message: "Not authorized"
    });
  }
  const cartItemId = req.params.cartItemId;

  try {
    // Find the cart item by its unique ID and remove it
    const deletedCartItem = await CartItem.findByIdAndRemove({ _id: cartItemId, userId: req.user._id });

    if (!deletedCartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    res.json({ message: 'Cart item deleted successfully', deletedCartItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// View the cart
router.get('/cart', protect, async (req, res) => {
  let exists = await PatientModel.findById(req.user);
  if (!exists || req.user.__t !== "patient") {
    return res.status(500).json({
      success: false,
      message: "Not authorized"
    });
  }
  const cartItems = await CartItem.find({ userId: req.user._id });
  res.json(cartItems);
});

// Update the quantity of an item in the cart
router.put('/updateCartItem/:cartItemId', protect, async (req, res) => {
  let exists = await PatientModel.findById(req.user);
  if (!exists || req.user.__t !== "patient") {
    return res.status(500).json({
      success: false,
      message: "Not authorized"
    });
  }
  const cartItemId = req.params.cartItemId;
  const newQuantity = req.body.quantity;

  try {
    // Find the cart item by its unique ID
    const cartItem = await CartItem.findOne({ _id: cartItemId, userId: req.user._id });

    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    // Update the quantity
    cartItem.quantity = newQuantity;
    await cartItem.save();

    res.json({ message: 'Cart item quantity updated successfully', updatedCartItem: cartItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});
router.get('/cart/total', protect, async (req, res) => {
  let exists = await PatientModel.findById(req.user);
  if (!exists || req.user.__t !== "patient") {
    return res.status(500).json({
      success: false,
      message: "Not authorized"
    });
  }
  try {
    // Use the aggregate pipeline to calculate the total price for the specific user
    const totalResult = await CartItem.aggregate([
      {
        $match: {
          userId: req.user._id // Match the user ID
        }
      },
      {
        $group: {
          _id: null,
          totalPrice: { $sum: { $multiply: ['$price', '$quantity'] } }
        }
      }
    ]);

    // If there are results, send the total price; otherwise, set it to 0
    const totalPrice = totalResult.length > 0 ? totalResult[0].totalPrice : 0;
    res.json({ totalPrice });
  } catch (error) {
    console.error('Error fetching total price:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// router.get('/getAllMedicine', protect, async (req, res) => {
//   //retrieve all users from the database
//   try {
//     let user = await adminModel.findById(req.user);
//     if (!user || user.__t !== 'Admin') {
//       return res.status(500).json({
//         success: false,
//         message: "Not authorized"
//       });
//     }

//     const meds = await MedicineModel.find();
//     res.status(200).json({ Result: meds, success: true });
//   }

//   catch (error) {
//     res.status(500).json({ message: "No Medicine listed", success: false })
//   }
// });


// Checkout and create an order
router.get('/checkout/:id/:address/:paymentMethod', async (req, res) => {
  try {
    console.log('checkouttt')
    console.log(req.params)
    // let exists = await PatientModel.findById(req.user);
    // if (!exists || req.user.__t != "Patient") {
    //   return res.status(500).json({
    //     success: false,
    //     message: "Not authorized"
    //   });
    // }
    console.log(req.params)
    const patientId = req.params.id;

    // Get the items from the cart
    const cartItems = await CartItem.find({ userId: patientId });
    //console.log(cartItems);

    // Initialize variables for order creation
    let total = 0;
    const itemsForOrder = [];
    
    // Calculate the total cost and construct the order
    for (const cartItem of cartItems) {
      const medicine = await MedicineModel.findById(cartItem.medicineId);
      console.log(medicine);

      if (medicine) {
        const itemTotal = cartItem.quantity * medicine.Price;
        console.log('Item Total:', itemTotal); // Add this line for debugging
        total += itemTotal;

        itemsForOrder.push({
          medicineId: cartItem.medicineId,
          quantity: cartItem.quantity,
          price: medicine.Price, // Use the price from the medicine schema
        });
      } else {
        // Handle the case where the medicine is not found
        return res.status(400).json({ error: 'Medicine not found' });
      }

    }

    // Debugging: Output the 'total' value to the console for verification
    console.log('Total before setting:', total);

    // Check if the cart is empty and set 'total' to 0 in that case
    if (itemsForOrder.length === 0) {
      total = 0;
    }

    // Debugging: Output the 'total' value after setting it
    console.log('Total after setting:', total);
    if (total > 0) {
      let myHealthStatus = await healthPackageStatus.findOne({ patientId: patientId.id, status: 'Subscribed' });
      const packId = myHealthStatus?.healthPackageId;
      var discountP = 0;
      if (packId) {
          const allPackages = await healthPackageModel.find({ _id: packId });
          if (allPackages.length > 0)
              discountP = allPackages[0].medicinDiscountInPercentage;
          else
              return (res.status(400).send({ error: "cant find package", success: false }));

      }
      const discount = (total * (discountP / 100));
      total = total - discount;

      // Create the order in the database
      const newOrder = new Order({
          userId: patientId,
          items: itemsForOrder,
          total: total,
          discount: discount,
          address: req.params.address,
          paymentMethod: req.params.paymentMethod,
          status: 'processing'
      });
      await newOrder.save();
      addTransaction(-1 * total, patientId, req.params.paymentMethod, 'Medicine Purchase');

  }

    // Clear the cart by removing all cart items

    await CartItem.deleteMany({ userId: patientId });
    console.log('right before redirect')
    if(req.params.paymentMethod==='Card')
    return res.redirect('http://localhost:4000/checkout?id=true')
  else
  return res.status(200).json({ message: 'Checkout successful. Your order has been placed.' });
  } catch (error) {
    console.error(error);
  return  res.status(500).json({ error: 'Checkout failed. Server error.' });
  }
});

// Add a new delivery address for a patient
router.post('/addAddress', protect,async (req, res) => {
  let exists = await PatientModel.findById(req.user);
  if (!exists || req.user.__t != "patient") {
    return res.status(500).json({
      success: false,
      message: "Not authorized"
    });
  }
  const patientId = req.user._id;//temp untill login
  const newAddress = req.body.address;
  // const { patientId, newAddress} = req.body; // Assuming you send patientId and newAddress in the request body
  console.log(newAddress);
  try {
    // Find the patient by their ID
    const patient = await PatientModel.findById(patientId);
    console.log(patient);
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    // Check if the patient has an address array
    if (!patient.address) {
      patient.address = [];
      console.log(patient.address);
    }

    // Validate the new address
    if (typeof newAddress !== 'string') {
      return res.status(400).json({ error: 'Invalid address format' });
    }

    // Add the new address to the array of addresses
    //patient.address.push(newAddress);
    if (patient.address.includes(newAddress)) {
      return res.status(400).json({ error: 'Address already exists for this patient' });
    }
    patient.address.push(newAddress);
    console.log(patient.address);
    // Save the updated patient data
    // const updatedPatient = await patient.save();
    const updatedPatient = await PatientModel.findOneAndUpdate({ _id: patientId },
      {
        address: patient.address,

      });
    res.json({ message: 'Address added successfully', patient: updatedPatient, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add the address' });
  }
});


// Retrieve the patient's addresses
router.get('/getAddresses',protect, async (req, res) => {
  let exists = await PatientModel.findById(req.user);
  if (!exists || req.user.__t != "patient") {
    return res.status(500).json({
      success: false,
      message: "Not authorized"
    });
  }
  const patientId = req.user._id;


  try {
    // Find the patient by their ID
    const patient = await PatientModel.findById(patientId);

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    const address = patient.address; // Retrieve the patient's addresses
    let result={
      address:address,
      Name:patient.Name
    }
    res.json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve addresses' });
  }
});

// Retrieve order details and status
router.get('/getOrder', protect,async (req, res) => {
  const user = await PatientModel.findById(req.user);
  if (!user || user.__t !== 'patient') {
    return res.status(500).json({
      success: false,
      message: "Not authorized"
    });
  }

  // const orderId = req.params.orderId;

  try {
    // Find the order by its ID
    // const order = await Order.find({_id:orderId,userId:req.user._id});
    const order = await Order.find({userId:req.user._id});

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Return order details and status
    res.json({ order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve order details' });
  }
});

// Retrieve a certain order details and status
router.get('/getOrder/:orderId', protect,async (req, res) => {
  const user = await PatientModel.findById(req.user);
  if (!user || user.__t !== 'patient') {
    return res.status(500).json({
      success: false,
      message: "Not authorized"
    });
  }

  const orderId = req.params.orderId;

  try {
    // Find the order by its ID
    const order = await Order.findOne({_id:orderId,userId:req.user._id});

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Return order details and status
    res.json({ order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve order details' });
  }
});

// Cancel an order
router.put('/cancelOrder/:orderId', protect,async (req, res) => {
  console.log(req);
  const user = await PatientModel.findById(req.user);
  if (!user || user.__t !== 'patient') {
    return res.status(500).json({
      success: false,
      message: "Not authorized"
    });
  }
  const orderId = req.params.orderId;

  try {
    // Find the order by its ID
    let order = await Order.findOne({_id:orderId,userId:req.user._id});

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    console.log(order);
    // Update the order's status to "canceled"
    if(order.status !== 'out for delievery' || order.status !== 'delivered' || order.status !== 'returned' || order.status !== 'refunded' || order.status !== 'failed' || order.status !== 'completed')
      order.status = 'canceled';

    // Save the updated order data
    await order.save();

    let myOrders = await Order.find({userId:req.user._id});

    res.json({ message: 'Order canceled successfully', myOrders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to cancel the order' });
  }
});

async function getOrderDetails(pid) {
  try {
      let myHealthStatus = await healthPackageStatus.findOne({ patientId: pid, status: 'Subscribed' });
      const packId = myHealthStatus.healthPackageId;
      var discountP = 0;
      if (packId) {
          const allPackages = await healthPackageModel.find({ _id: packId });
          if (allPackages.length > 0)
              discountP = allPackages[0].medicinDiscountInPercentage;
          else
              return (res.status(400).send({ error: "cant find package", success: false }));

      }
      const cartItems = await CartItem.find({ userId: pid });
      let list = []
      for (var x in cartItems) {
          const med = await MedicineModel.findById(cartItems[x].medicineId);
          medInfo = {
              id: med._id,
              name: med.Name,
              price: med.Price * 100 * (1 - discountP / 100),
              quantity: cartItems[x].quantity
          }
          list.push(medInfo);
      }
      return list
  }
  catch (error) {
      console.log(error);
  }

}

const processCardPayment = async (req, res,pid,address) => {
  const paymentMethod = 'Card';
  try {
    let orderDetails=await getOrderDetails(pid);
    console.log(address)
    const session =await stripeInstance.checkout.sessions.create({

      payment_method_types: ["card"],
      mode: "payment",
      line_items: orderDetails.map(item => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
            },
            unit_amount: item.price,
          },
          quantity: item.quantity,
        }
      }),
      success_url: `http://localhost:7000/patient/checkout/${pid}/${encodeURIComponent(address)}/${encodeURIComponent(paymentMethod)}`,
      cancel_url: `http://localhost:4000/cancel`,
    })
   

    // Handle the response as needed
    
    return res.json({ url: session.url});
  } catch (e) {
    console.error('Error processing card payment', e.message);
    return false;
    //res.status(500).json({ error: e.message })
  }
};

const processWalletPayment = async (req,res,userId,address) => {
  const paymentMethod = 'Wallet';
  let orderDetails=await getOrderDetails(userId);
  var total=0;
  console.log(orderDetails);
for(var x in orderDetails){
  total+=orderDetails[x].price;
  console.log(total);
}
total=total/100;
  const user = await PatientModel.findById(userId);
  user.Wallet = user.Wallet - total;
  if (user.Wallet < 0) {
      console.error('Insufficient funds in wallet');
      let result = res.status(400).send({ hello: 'Insufficient funds' });
      console.log(result);
      return result;
  }
  try {
      await PatientModel.findByIdAndUpdate(userId, user);
      var response = await fetch(`http://localhost:7000/patient/checkout/${userId}/${encodeURIComponent(address)}/${encodeURIComponent(paymentMethod)}`);
    if(response.status===200)
    return res.status(200).json({ message: 'Checkout successful. Your order has been placed.' });
  } catch (e) {
      console.error('Error processing wallet payment', e.message);
      return res.status(500).json({ error: e.message });
  }
};

router.post('/payment' ,protect, async (req,res) => {
  console.log('kkk')
  

    
  let exists = await PatientModel.findById(req.user);
  if (!exists || req.user.__t != "patient") {
    return res.status(500).json({
      success: false,
      message: "Not authorized"
    });
  }
  let userId=exists._id
  console.log(req.body)
  let paymentMethod = req.body.paymentMethod;
  try {
    if (paymentMethod === "wallet") {
      
      let respone= await processWalletPayment(req,res,userId,req.body.address);
      console.log(response)
      return response
  } else {
    if (paymentMethod === "card"){ 
         const response= await processCardPayment(req,res,userId,req.body.address);
         console.log('card')
         //console.log(response);

          }
       
    else
    var response= await fetch(`http://localhost:7000/patient/checkout/${userId}/${encodeURIComponent(req.body.address)}/${encodeURIComponent(paymentMethod)}`);
    if(response.status===200)
    return res.status(200).json({ message: 'Checkout successful. Your order has been placed.' });
  }
  }

   catch (e) {
      console.error('Error processing payment', e.message);
      return false;
  }
});

// Add a route to view the patient's wallet balance and refund details
router.get('/viewWallet', protect, async (req, res) => {
  try {
    let exists = await PatientModel.findById(req.user);
    if (!exists || req.user.__t !== "patient") {
      return res.status(500).json({
        success: false,
        message: "Not authorized"
      });
    }

    const patient = await PatientModel.findById(req.user._id);

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    let walletBalance = patient.Wallet || 0;

    // Retrieve refund details for canceled orders that are not COD
    const canceledOrders = await Order.find({
      userId: req.user._id,
      status: 'canceled',
      paymentMethod: { $ne: 'COD' }
    });

    let totalRefund = 0;

    for (const order of canceledOrders) {
      totalRefund += order.total;
    }

    walletBalance += totalRefund;
    res.status(200).json({
      walletBalance,
      totalRefund
    });
  } catch (error) {
    console.error('Error fetching wallet details:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

const addTransaction = (amount, userId, paymentMethod, description) => {
  console.log('l')
  const newTransaction = new transactionsModel({
      amount: Math.round(amount * 100) / 100,
      userId: userId,
      paymentMethod: paymentMethod,
      description: description
  });
  newTransaction.save();
  console.log('l')
}


module.exports = router;
