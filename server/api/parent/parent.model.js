'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './parent.events';

var ParentSchema = new mongoose.Schema({
  lanregistration: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Registration',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  }
});

registerEvents(ParentSchema);
export default mongoose.model('Parent', ParentSchema);
