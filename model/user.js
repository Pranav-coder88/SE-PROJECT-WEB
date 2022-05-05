const mongoose = require('mongoose');

const endUserSchema = new mongoose.Schema({
    
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
},
{ collection: 'users' }
)

const model = mongoose.model('endUserSchema' , endUserSchema);

module.exports = model;
