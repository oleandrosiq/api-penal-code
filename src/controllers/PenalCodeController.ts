import { Request, Response } from 'express';

import PenalCodeRepository, { ListProps } from '../repositories/PenalCodeRepository';

class PenalCodeController {
  async create(request: Request, response: Response) {
    const { name, description, amount, timePrision, status } = request.body;

    if (!name || !description || !amount || !timePrision || !status) {
      return response.status(400).json({ error: 'Missing fields. - acceptable fields [name, description, amount, timePrision, status, createdAt' });
    }

    const penalCode = await PenalCodeRepository.create({
      name,
      description,
      amount,
      timePrision,
      status,
    });

    return response.status(201).json(penalCode);
  }

  async list(request: Request, response: Response) {
    const { order_by = 'asc' } = request.query;

    const querys = {} as ListProps;
    if (order_by) querys.order_by = order_by as 'asc' | 'desc';

    const codes = await PenalCodeRepository.index(querys);

    return response.status(200).json(codes);
  }

  async update(request: Request, response: Response) {
    const data = request.body;
    const { id } = request.params;

    try {
      const code = await PenalCodeRepository.findById(id);

      if (!code) {
        return response.status(404).json({ error: 'PenalCode not found.' });
      }

      const codeUpdated = await PenalCodeRepository.update(data, id);

      return response.status(200).json(codeUpdated);
    } catch (error) {
      return response.status(400).json({ error: 'Error updating PenalCode.' });
    }
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    try {
      await PenalCodeRepository.delete(id);

      return response.status(204).send();
    } catch (error) {
      return response.status(400).json({ error: 'Error deleting PenalCode.' });
    }
  }
}

export default new PenalCodeController();