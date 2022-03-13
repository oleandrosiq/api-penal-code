import { prisma } from '../services/prisma';

export interface ListProps {
  order_by?: 'asc' | 'desc';
}

class UserRepository {
  async index({ order_by = 'asc' }: ListProps) {
    const users = await prisma.user.findMany({
      orderBy: {
        username: order_by,
      },
    });

    return users;
  }

  async findByUsername(username: string) {
    const user = await prisma.user.findFirst({
      where: {
        username: username.toLocaleLowerCase(),
      }
    });

    return user;
  }

  async findById(id: string) {
    const user = await prisma.user.findFirst({
      where: {
        id,
      }
    });

    return user;
  }
}

export default new UserRepository();
