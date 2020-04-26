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
    return this.model.find(query, projection, options).lean();
  }

  findOne(query) {
    return this.model.findOne(query).lean();
  }

  getById(id) {
    return this.model.findById(id).lean();
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

  async delete(id) {
    return this.model.deleteOne({ _id: id });
  }
}

export default UserRepository;