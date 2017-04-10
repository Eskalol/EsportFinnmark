'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './event.events';

let EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  startDatetime: {
    type: Date,
    required: true
  },
  endDatetime: {
    type: Date,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  info: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  contactPerson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  registrationDeadline: {
    type: Date,
    default: new Date(2100, 1, 1)
  }
});

registerEvents(EventSchema);
export default mongoose.model('Event', EventSchema);
