import mongoose from 'mongoose';

import schema from './schema';

const alternators = mongoose.model('alternators', schema, 'alternators');

export default alternators;