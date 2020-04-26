import mongoose from 'mongoose';

import schema from './schema';

const notification = mongoose.model('notification', schema, 'notification');

export default notification;