"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _jsonwebtoken = require('jsonwebtoken');
var _bcrypt = require('bcrypt');

var _UserRepository = require('../repositories/UserRepository'); var _UserRepository2 = _interopRequireDefault(_UserRepository);

class UserAuthenticated {
  async index(request, response) {
    const { username, password } = request.body;
    
    if (!username) {
      return response.status(400).json({ error: 'Username is required' });
    }

    if (!password) {
      return response.status(400).json({ error: 'Password is required' });
    }

    const user = await _UserRepository2.default.findByUsername(username);

    if (!user) {
      return response.status(400).json({ error: 'User not found.' });
    }

    const math = await _bcrypt.compare.call(void 0, password, user.password);

    if (!math) {
      return response.status(400).json({ error: 'Invalid username or password.' });
    }

    const payload = {
      id: user.id,
      username: user.username,
    };

    const token = _jsonwebtoken.sign.call(void 0, payload, String(process.env.APP_SECRET_KEY), {
      subject: user.id,
      expiresIn: 10 * 24 * 60 * 60,
    });

    return response.json({ user: { id: user.id, username: user.username, }, token });
  }
}

exports. default = new UserAuthenticated();
