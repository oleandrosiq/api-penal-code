import { Request, Response } from 'express';

import { prisma } from '../services/prisma';
import UserRepository, { ListProps } from '../repositories/UserRepository';
import { encryptPassword } from '../utils/encryptPassword';

class UserController {
  async create(request: Request, response: Response) {
    const { username, password } = request.body;

    const userAlreadyExists = await UserRepository.findByUsername(username);

    if (userAlreadyExists) {
      return response.status(400).json({ error: 'Username already exists.' });
    }

    const encryptedPassword = await encryptPassword(password);
    
    const user = await prisma.user.create({
      data: {
        username: username.toLocaleLowerCase(),
        password: encryptedPassword,
      },
    });

    return response.json(user);
  }

  async list(request: Request, response: Response) {
    const { order_by = 'asc' } = request.query;

    const querys = {} as ListProps;
    if (order_by) querys.order_by = order_by as 'asc' | 'desc';

    const users = await UserRepository.index(querys);

    return response.status(200).json(users);
  }

  async del(request: Request, response: Response) {
    await prisma.user.deleteMany({});
    return response.json([]);
  }
}

export default new UserController();
