const mongoose = require('mongoose');

const main = new mongoose.Schema({
    vin: String,
    ridername: String,
    tlname: String,
    hub: String,
    totaldamage: String,
    createdone: String,
    dispatch: String,
    status: String,
    avatar: String,
    coverImage: String,
    backImage: String,
    frontImage: String
});

const maintenance = mongoose.model('maintenance', main);

// Export the model for use in other files
module.exports = maintenance;
