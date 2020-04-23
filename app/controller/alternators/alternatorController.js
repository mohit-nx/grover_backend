import AlternatorRepository from '../../repositories/alternators';
import { response } from 'express';

class AlternatorController {
  constructor() {
    this.alternatorRepository = AlternatorRepository.getInstance();
  }

  async list(req, res, next) {
    const alternatorsList = await this.alternatorRepository.list({});
    res.send(alternatorsList);
  }

  async create(req, res, next) {
    const { body } = req;
    console.log(":::", body);
    const response = await this.alternatorRepository.create(body);
    console.log("::::", response);
    res.send(response)
  }

  update() {

  }

  delete() {

  }
}

export default AlternatorController;