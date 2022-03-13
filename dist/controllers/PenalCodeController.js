"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _PenalCodeRepository = require('../repositories/PenalCodeRepository'); var _PenalCodeRepository2 = _interopRequireDefault(_PenalCodeRepository);

class PenalCodeController {
  async create(request, response) {
    const { name, description, amount, timePrision, status } = request.body;

    if (!name || !description || !amount || !timePrision || !status) {
      return response.status(400).json({ error: 'Missing fields. - acceptable fields [name, description, amount, timePrision, status, createdAt' });
    }

    const penalCode = await _PenalCodeRepository2.default.create({
      name,
      description,
      amount,
      timePrision,
      status,
    });

    return response.status(201).json(penalCode);
  }

  async list(request, response) {
    const { order_by = 'asc' } = request.query;

    const querys = {} ;
    if (order_by) querys.order_by = order_by ;

    const codes = await _PenalCodeRepository2.default.index(querys);

    return response.status(200).json(codes);
  }

  async update(request, response) {
    const data = request.body;
    const { id } = request.params;

    try {
      const code = await _PenalCodeRepository2.default.findById(id);

      if (!code) {
        return response.status(404).json({ error: 'PenalCode not found.' });
      }

      const codeUpdated = await _PenalCodeRepository2.default.update(data, id);

      return response.status(200).json(codeUpdated);
    } catch (error) {
      return response.status(400).json({ error: 'Error updating PenalCode.' });
    }
  }

  async delete(request, response) {
    const { id } = request.params;

    try {
      await _PenalCodeRepository2.default.delete(id);

      return response.status(204).send();
    } catch (error) {
      return response.status(400).json({ error: 'Error deleting PenalCode.' });
    }
  }
}

exports. default = new PenalCodeController();