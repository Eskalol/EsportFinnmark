/**
 * Parent registration model events
 */

'user strict';

import {EventEmitter} from 'events';
var ParentEvents = new EventEmitter();

// set max event listeners (0 == unlimited)
ParentEvents.setMaxListeners(0);

// Model events
var events = {
	save: 'save',
	remove: 'remove'
}

// Register the event emitter to the model events
function registerEvents(LanRegistration) {
	for (var e in events) {
		let event = events[e];
		LanRegistration.post(e, emitEvent(event));
	}
}

function emitEvent(event) {
	return function(doc) {
		ParentEvents.emit(`${event}:${doc._id}`, doc);
		ParentEvents.emit(event, doc);
	};
}

export {registerEvents};
export default ParentEvents;
