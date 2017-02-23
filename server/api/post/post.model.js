'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './post.events';

var PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  postMsg: {
    type: String,
    required: true
  },
  postDate: {
    type: Date,
    default: Date.now
  }
});

registerEvents(PostSchema);
export default mongoose.model('Post', PostSchema);
