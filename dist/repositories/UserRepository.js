"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _prisma = require('../services/prisma');





class UserRepository {
  async index({ order_by = 'asc' }) {
    const users = await _prisma.prisma.user.findMany({
      orderBy: {
        username: order_by,
      },
    });

    return users;
  }

  async findByUsername(username) {
    const user = await _prisma.prisma.user.findFirst({
      where: {
        username: username.toLocaleLowerCase(),
      }
    });

    return user;
  }

  async findById(id) {
    const user = await _prisma.prisma.user.findFirst({
      where: {
        id,
      }
    });

    return user;
  }
}

exports. default = new UserRepository();
