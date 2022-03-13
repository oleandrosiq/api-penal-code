import { prisma } from '../services/prisma';

export interface ListProps {
  order_by?: 'asc' | 'desc';
}

interface PenalCode {
  name: string;
  description: string;
  amount: number;
  status: number;
  timePrision: number;  
}

interface PenalCodeUpdate {
  name?: string;
  description?: string;
  amount?: number;
  status?: number;
  timePrision?: number;  
}

class PenalCodeRepository {
  async index({ order_by = 'asc' }: ListProps) {
    const codes = await prisma.penalCode.findMany({
      orderBy: {
        name: order_by,
      },
    });

    return codes;
  }

  async create(data: PenalCode) {
    const code = await prisma.penalCode.create({
      data,
    });

    return code;
  }

  async update(data: PenalCodeUpdate, id: string) {
    const codeUpdate = await prisma.penalCode.update({
      where: {
        id,
      },
      data,
    });

    return codeUpdate;
  }

  async delete(id: string) {
    await prisma.penalCode.deleteMany({
      where: {
        id,
      }
    });
  }

  async findByName(name: string) {
    const code = await prisma.penalCode.findFirst({
      where: {
        name: name.toLocaleLowerCase(),
      }
    });

    return code;
  }

  async findById(codeId: string) {
    const code = await prisma.penalCode.findFirst({
      where: {
        id: codeId,
      }
    });

    return code;
  }
}

export default new PenalCodeRepository();
