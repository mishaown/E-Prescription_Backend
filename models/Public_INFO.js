const mongoose = require('mongoose');
const uuidv1 = require('uuid').v1;

const PEOPLE = new mongoose.Schema({
    ID: {
        type: String,
        required: ['ID could not be auto generated!!!', true],
        unique: ['ID is duplicate, Please try again', true]
    },
    name: {
        last_name: {
            type: String,
            required: [true, 'Please add a last name'],
            trim: true,
            maxlength: [15, 'Name can not be more than 15 characters']
        },
        first_name: {
            type: String,
            required: [true, 'Please add a first name'],
            trim: true,
            maxlength: [35, 'Name can not be more than 35 characters']
        }
    },
    birthdate: {
        type: Date,
        required: ['Birthdate is missing', true]
    },
    gender: {
        type: [String],
        required: ['Gender required', true],
        enum: ['male', 'female', 'other']
    },
    address: {
        house: String,
        street: String,
        thana: String,
        post_office: String,
        zilla: String,
        division: String,
        zipcode: Number
    },
    family_members: [{
        unique_ID: String,
        relationship: String
    }]
    
})

PEOPLE.pre('save', function(next){
    // CREATING UNIQUIE ID USING TIMESTAMP
    this.ID = uuidv1();
    next();
})

module.exports = mongoose.model('PEOPLE', PEOPLE);