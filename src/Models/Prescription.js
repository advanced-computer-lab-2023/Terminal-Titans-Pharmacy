// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const prescriptionSchema = new Schema({
//   PatientID: {
//     type: Schema.Types.ObjectId,
//     ref: 'Patient',
//     required: true
//   },
//     DoctorID: {
//         type: Schema.Types.ObjectId,
//         ref: 'Doctor',
//         required: true
//     },
//     items: [{
//         medicineId:{
//             type: Schema.Types.ObjectId,
//             ref: 'Medicine'},
//             dosage:Number,
//         },],
//         status:{
//             type:String,
//             required:true,},
//         Date:{
//             type:Date,
//             required:true,
//         }

// },{ timestamps: true});


// const prescribed = mongoose.model('prescriptions', prescriptionSchema);
// module.exports = prescribed;
const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
const prescriptionSchema = new mongoose.Schema({
    PatientId: {
        type: String,
        required: true
    },
    DoctorId: {
        type: String,
        required: true
    },
    items: [
        {
            medicineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine' },
            dosage: Number,
        },
    ],
    status: {
        type: String,
        required: true
    },
    Date: {
        type: Date,
        required: true
    },
    // appointment?
});

const PrescriptionModel = mongoose.model('Prescription', prescriptionSchema);

module.exports = PrescriptionModel;

