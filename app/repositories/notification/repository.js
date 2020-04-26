import { Types } from 'mongoose';
import model from './model';

class NotificationRepository {
  static getInstance() {
    if (!NotificationRepository.instance) {
      NotificationRepository.instance = new NotificationRepository();
    }
    return NotificationRepository.instance;
  }

  constructor() {
    this.model = model;
  }

  list(query, projection = {}, options = {}) {
    return this.model.find(query, projection, options)
  }

  count(query) {
    return this.model.countDocuments(query)
  }

  get(id) {
    return this.model.findById(id);
  }

  update(id, dataToUpdate) {
    console.log("NotificationRepository update", id, dataToUpdate)
    return this.model.updateOne({ _id: id }, dataToUpdate);
  }

  create(data) {
    const record = this.model({
      ...data,
      _id: String(Types.ObjectId()),
    });
    return record.save()
  }
}

export default NotificationRepository;