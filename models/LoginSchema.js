const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail}  = require('validator');
const { Schema } = mongoose;

const LoginSchema = new Schema({
    role: {
        type: String,
        enum: ['doctor', 'patient', 'employee'],
        default: 'patient',
        required: true,
    },
    med_id: {
        type: String,
    },
    nid: {
        type: String,
        maxlength: [10, 'NID number is not valid']
    },
    password: {
        type: String,
        required: [true, 'Please Enter Password'],
        minlength: [6, `Password can't be less than 4 characters!`],
        maxlength: 1024
    },
    birthDate: {
        type: Date,
    },
    email: {
        type: String,
        validate: [ isEmail, 'Please enter a valid email']
    },
    phoneNumber: {
        type: String,
        maxlength: [11, 'Incorrect Phone number']
    },
    date: {
        type: Date,
        default: Date.now
    },
     
})  

// Hashing password before saving
LoginSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

module.exports = mongoose.model('LogSchema', LoginSchema);