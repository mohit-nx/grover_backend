import { Types } from 'mongoose';
import model from './model';

class AlternatorRepository {
  static getInstance() {
    if (!AlternatorRepository.instance) {
      AlternatorRepository.instance = new AlternatorRepository();
    }
    return AlternatorRepository.instance;
  }

  constructor() {
    this.model = model;
  }

  list(query, projection = {}, options = {}) {
    return this.model.find(query, projection, options)
  }

  get(id) {
    return this.model.findById(id);
  }

  update(id, dataToUpdate) {
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

export default AlternatorRepository;