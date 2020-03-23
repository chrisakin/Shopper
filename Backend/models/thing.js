//Creation of our data schema to arrange our data in the way we want it to be arranged.

const mongoose = require('mongoose');

const thingSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    userId: { type: String, required: true },
    price: { type: Number, required: true },
  });


  module.exports = mongoose.model('Thing', thingSchema);