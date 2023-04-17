const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
        locationCode: String
    });

const Location = mongoose.model('location', locationSchema);

module.exports = {
    Location
}