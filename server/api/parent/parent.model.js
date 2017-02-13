'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './parent.events.js';

var parentSchema = new mongoose.Schema({
	lanregistration: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'lanregistration'
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

registerEvents(parentSchema);
export default mongoose.model('parent', parentSchema);
