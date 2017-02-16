'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './lan_registration.events';

var lanRegistrationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique: true
  },
  birthdate: {
    type: Date,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  stayOver: {
    type: Boolean,
    required: true
  },
  returningHome: {
    type: Date,
    required: true
  }
});

registerEvents(lanRegistrationSchema);
export default mongoose.model('lanregistration', lanRegistrationSchema);
