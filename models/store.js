const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  content: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  price: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const gigSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },  
  service: {
    type: serviceSchema,
    required: true
  },  
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  messages: [messageSchema]
}, {
  timestamps: true
});  

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  clients: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  services: [serviceSchema],
  gigs: [gigSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Store', storeSchema);
