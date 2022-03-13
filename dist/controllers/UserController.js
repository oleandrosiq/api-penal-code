"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _prisma = require('../services/prisma');
var _UserRepository = require('../repositories/UserRepository'); var _UserRepository2 = _interopRequireDefault(_UserRepository);
var _encryptPassword = require('../utils/encryptPassword');

class UserController {
  async create(request, response) {
    const { username, password } = request.body;

    const userAlreadyExists = await _UserRepository2.default.findByUsername(username);

    if (userAlreadyExists) {
      return response.status(400).json({ error: 'Username already exists.' });
    }

    const encryptedPassword = await _encryptPassword.encryptPassword.call(void 0, password);
    
    const user = await _prisma.prisma.user.create({
      data: {
        username: username.toLocaleLowerCase(),
        password: encryptedPassword,
      },
    });

    return response.json(user);
  }

  async list(request, response) {
    const { order_by = 'asc' } = request.query;

    const querys = {} ;
    if (order_by) querys.order_by = order_by ;

    const users = await _UserRepository2.default.index(querys);

    return response.status(200).json(users);
  }

  async del(request, response) {
    await _prisma.prisma.user.deleteMany({});
    return response.json([]);
  }
}

exports. default = new UserController();
