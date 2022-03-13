"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _prisma = require('../services/prisma');





















class PenalCodeRepository {
  async index({ order_by = 'asc' }) {
    const codes = await _prisma.prisma.penalCode.findMany({
      orderBy: {
        name: order_by,
      },
    });

    return codes;
  }

  async create(data) {
    const code = await _prisma.prisma.penalCode.create({
      data,
    });

    return code;
  }

  async update(data, id) {
    const codeUpdate = await _prisma.prisma.penalCode.update({
      where: {
        id,
      },
      data,
    });

    return codeUpdate;
  }

  async delete(id) {
    await _prisma.prisma.penalCode.deleteMany({
      where: {
        id,
      }
    });
  }

  async findByName(name) {
    const code = await _prisma.prisma.penalCode.findFirst({
      where: {
        name: name.toLocaleLowerCase(),
      }
    });

    return code;
  }

  async findById(codeId) {
    const code = await _prisma.prisma.penalCode.findFirst({
      where: {
        id: codeId,
      }
    });

    return code;
  }
}

exports. default = new PenalCodeRepository();
