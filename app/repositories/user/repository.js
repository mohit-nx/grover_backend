import { Types } from 'mongoose';
import model from './model';

class UserRepository {
  static getInstance() {
    if (!UserRepository.instance) {
      UserRepository.instance = new UserRepository();
    }
    return UserRepository.instance;
  }

  constructor() {
    this.model = model;
  }

  list(query, projection = {}, options = {}) {
    return this.model.find(filter, projection, options)
  }

  findOne(query) {
    return this.model.findOne(query)
  }

  getById(id) {
    return this.model.findById(id);
  }

  update(id, dataToUpdate) {
    return this.model.updateOne({ _id: id }, dataToUpdate);
  }

  count() {
    return this.model.countDocuments();
  }

  create(data) {
    const record = this.model({
      ...data,
      _id: String(Types.ObjectId()),
    });
    return record.save()
  }
}

export default UserRepository;