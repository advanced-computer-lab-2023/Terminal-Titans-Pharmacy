const PatientModel = require("../Models/Patient.js");
const MedicineModel = require("../Models/Medicine.js");
const CartItem = require("../Models/Cart.js");
const Order = require("../Models/Orders.js");
const express = require('express');
const protect = require("../middleware/authMiddleware.js");
const router = express.Router();

//App variables
const app = express();
app.use(express.urlencoded({ extended: false }))

//add another patient with a set username and password
const createPatient = async (req, res) => {
  try {
    const { Username, Gender, Name, Email, Password, HourlyRate, Affiliation, EducationalBackground, Position } = req.body;
    const userexist = await PatientModel.findOne({ Username });
    if (userexist) {
      res.status(400);
      throw new Error("Username already exist");
    }
    const Patient = new PatientModel({ Username, Gender, Name, Email, Password, HourlyRate, Affiliation, EducationalBackground, Position });
    const NewPatient = await Patient.save();
    res.status(201).json(NewPatient);
  }
  catch (error) {
    res.status(500).json({ error: 'Failed OP', success: false })
  }
}
//filter 
const filterMed = async (req, res) => {
  let exists = await adminModel.findById(req.user);
  if (!exists) {
    return res.status(500).json({
      success: false,
      message: "Not authorized"
    });
  }
  const MedicalUse = req.params.MedicalUse.toLowerCase();
  if (!MedicalUse) {
    return res.status(400).send({ message: 'Please fill the input', success: false });
  }

  const Medicines = await MedicineModel.find({ MedicalUse });
  if (!Medicines.length) {
    return res.status(400).send({ message: 'No medicines found with the specified medical use.', success: false });
  }

  res.status(200).send({ Result: Medicines, success: true })

}
router.get('/filterMedical/:MedicalUse', protect, filterMed);



//search for medicine based on name
const getMedicine = async (req, res) => {
  let exists = await adminModel.findById(req.user);
  if (!exists) {
    return res.status(500).json({
      success: false,
      message: "Not authorized"
    });
  }
  const Name = req.params.Name.toLowerCase();
  if (!Name) {
    return res.status(400).send({ message: 'Please fill the input', success: false });
  }
  try {
    // const Name = req.body;
    const Medicines = await MedicineModel.findOne({ Name });
    if (!Medicines) {
      return (res.status(400).send({ message: "No Medicine with this name", success: false }));
    }
    res.status(200).json({ Result: Medicines, success: true });
  }

  catch (error) {
    res.status(500).json({ message: "Failed getMedicine", success: false })
  }
}

router.get('/getMedicine/:Name', protect, getMedicine);

//view a list of all available medicine pic,price,description
// const viewInfo =async (req,res)=> {
//  const pic = req.query.Picture;
//  const price = req.query.Price;

router.get('/Admin/getAllMedicine', protect, async (req, res) => {
  try {
    let exists = await adminModel.findById(req.user);
    if (!exists) {
      return res.status(500).json({
        success: false,
        message: "Not authorized"
      });
    }
    // Make a request to your medicine data source
    const response = await fetch('http://localhost:8000/Admin/getAllMedicine/'); // Replace with your actual API endpoint
    const data = await response.json();

    if (!data.success) {
      return res.status(400).json({ success: false, message: data.message });
    }

    const medicines = data.Result.filter((medicine) => medicine.Picture);
    res.status(200).json({ success: true, Result: medicines });
  } catch (error) {
    console.error('Error fetching medicine data:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});


// }
// router.get('/viewAvailableMedicines', viewInfo);
// Import required packages

// Add a medicine to the cart
router.post('/addToCart', protect, async (req, res) => {
  let exists = await adminModel.findById(req.user);
  if (!exists) {
    return res.status(500).json({
      success: false,
      message: "Not authorized"
    });
  }
  try {
    const medicineId = req.body.medicineId;

    // Check if the item is already in the cart
    const existingCartItem = await CartItem.findOne({ medicineId });

    if (existingCartItem) {
      if (quantity <= 0) {
        return res.status(400).json({ error: 'Invalid quantity selected' });
      }

      // Check if there's enough quantity in stock
      if (medicine.Quantity - existingCartItem.quantity >= quantity) {
        // If it exists, update the quantity and calculate the new price
        existingCartItem.quantity += quantity;
        existingCartItem.price = existingCartItem.quantity * medicine.Price; // Calculate the new price
        await existingCartItem.save();

        // Decrement the medicine quantity
        // medicine.Quantity -= quantity;
        await medicine.save();

        res.json(existingCartItem);
      } else {
        res.status(404).json({ message: "no stoke", success: false });
      }
    } else {
      if (quantity <= 0) {
        return res.status(400).json({ error: 'Invalid quantity selected' });
      }

      // If not, create a new cart item and calculate the price
      const newCartItem = new CartItem({ medicineId, quantity });
      newCartItem.price = newCartItem.quantity * medicine.Price; // Calculate the price
      await newCartItem.save();

      // Decrement the medicine quantity
      //  medicine.Quantity -= quantity;
      await medicine.save();

      res.json(newCartItem);
    }
  }
  catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: 'Internal server error' });
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

router.get('/cartItemCount', async (req, res) => {
  try {
    const cartItems = await CartItem.find();
    const itemCount = cartItems.length;

    console.log(itemCount);
    res.json({ itemCount });
  } catch (error) {
    console.error('Error getting cart item count:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Add this route handler to your Express app (app.js or your main application file)
const getListMed = async (req, res) => {
  //retrieve all users from the database
  try {
    const meds = await MedicineModel.find();
    res.status(200).json({ Result: meds, success: true });
  }

  catch (error) {
    res.status(500).json({ message: "No Medicine listed", success: false })
  }
}

router.get('/getAllMedicine', getListMed);
// Delete an item from the cart
router.delete('/deleteCartItem/:cartItemId', async (req, res) => {
  let exists = await adminModel.findById(req.user);
  if (!exists) {
    return res.status(500).json({
      success: false,
      message: "Not authorized"
    });
  }
  const cartItemId = req.params.cartItemId;

  try {
    // Find the cart item by its unique ID and remove it
    const deletedCartItem = await CartItem.findByIdAndRemove(cartItemId);

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
router.get('/cart', async (req, res) => {
  let exists = await adminModel.findById(req.user);
  if (!exists) {
    return res.status(500).json({
      success: false,
      message: "Not authorized"
    });
  }
  const cartItems = await CartItem.find();
  res.json(cartItems);
});

// Update the quantity of an item in the cart
router.put('/updateCartItem/:cartItemId', async (req, res) => {
  let exists = await adminModel.findById(req.user);
  if (!exists) {
    return res.status(500).json({
      success: false,
      message: "Not authorized"
    });
  }
  const cartItemId = req.params.cartItemId;
  const newQuantity = req.body.quantity;

  try {
    // Find the cart item by its unique ID
    const cartItem = await CartItem.findById(cartItemId);

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
router.get('/cart/total', async (req, res) => {
  try {
    // Use the aggregate pipeline to calculate the total price
    const totalResult = await CartItem.aggregate([
      {
        $group: {
          _id: null,
          totalPrice: { $sum: { $multiply: ['$price', '$quantity'] } }
        }
      }
    ]);

    // If there are results, send the total price; otherwise, set it to 0
    const totalPrice = totalResult.length > 0 ? totalResult[0].totalPrice : 0;
    //console.log(totalPrice);
    res.json({ totalPrice });
  } catch (error) {
    console.error('Error fetching total price:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Checkout and create an order
router.post('/checkout', async (req, res) => {
  try {
    // Get the items from the cart
    const cartItems = await CartItem.find();
    console.log(cartItems);

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

    // Create the order in the database
    const newOrder = new Order({
      items: itemsForOrder,
      total,
    });
    await newOrder.save();

    // Clear the cart by removing all cart items
    await CartItem.deleteMany();

    res.json({ message: 'Checkout successful. Your order has been placed.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Checkout failed. Server error.' });
  }
});

// Add a new delivery address for a patient
router.post('/addAddress', async (req, res) => {
  const { patientId, newAddress } = req.body; // Assuming you send patientId and newAddress in the request body
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
    const updatedPatient = await patient.save();

    res.json({ message: 'Address added successfully', patient: updatedPatient });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add the address' });
  }
});


// Retrieve the patient's addresses
router.get('/getAddresses/:patientId', async (req, res) => {
  const patientId = req.params.patientId;

  try {
    // Find the patient by their ID
    const patient = await PatientModel.findById(patientId);

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    const address = patient.address; // Retrieve the patient's addresses

    res.json({ address });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve addresses' });
  }
});

// Retrieve order details and status
router.get('/getOrder/:orderId', async (req, res) => {
  const orderId = req.params.orderId;

  try {
    // Find the order by its ID
    const order = await Order.findById(orderId);

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
router.put('/cancelOrder/:orderId', async (req, res) => {
  const orderId = req.params.orderId;

  try {
    // Find the order by its ID
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Update the order's status to "canceled"
    order.status = 'canceled';

    // Save the updated order data
    await order.save();

    res.json({ message: 'Order canceled successfully', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to cancel the order' });
  }
});

module.exports = router;
