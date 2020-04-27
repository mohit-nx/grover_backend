import AlternatorRepository from '../../repositories/alternators';
import { response } from 'express';

class AlternatorController {
  constructor() {
    this.alternatorRepository = AlternatorRepository.getInstance();
  }

  async list(req, res, next) {
    const { query: { skip = 0, limit = 10, sortBy = "createdAt", sortOrder = 1 } } = req;
    const alternatorsList = await this.alternatorRepository.list({}, {
      name: 1, code: 1, amp: 1, imgUrl: 1, createdAt: 1, connections: 1
    }, {
      skip,
      limit,
      sort: { [sortBy]: sortOrder },
    });
    res.status(200).send(alternatorsList);
  }

  async create(req, res, next) {
    const { body } = req;
    const response = await this.alternatorRepository.create(body);
    res.send(response)
  }

  async get(req, res, next) {
    const { params: { id } } = req;
    const alternator = await this.alternatorRepository.get(id);
    if (!alternator) {
      return next({ status: 404, messgae: "Record Not Found" });
    }
    res.status(200).send(alternator);
  }

  update() {

  }

  delete() {

  }
}

export default AlternatorController;