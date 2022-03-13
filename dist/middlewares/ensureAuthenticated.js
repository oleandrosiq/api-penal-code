"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _jsonwebtoken = require('jsonwebtoken');
var _UserRepository = require('../repositories/UserRepository'); var _UserRepository2 = _interopRequireDefault(_UserRepository);





 async function ensureAuthenticated(request, response, next) {
  const token = request.headers.authorization;

  if (!token) {
    return response.status(401).json({ error: 'Token invalid!' });
  }

  try {
    const { sub } = _jsonwebtoken.verify.call(void 0, token, String(process.env.APP_SECRET_KEY)) ;

    const user = await _UserRepository2.default.findById(sub);

    if (!user) {
      return response.status(401).json({ error: 'User not found!' });
    }

    request.user_id = sub;

    return next();
  } catch (error) {
    return response.status(401).json({ error: 'Token expired!' });
  }
} exports.ensureAuthenticated = ensureAuthenticated;
