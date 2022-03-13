"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _bcrypt = require('bcrypt');

 async function encryptPassword(password) {
  const salt = await _bcrypt.genSalt.call(void 0, );
  const cryptPassword = await _bcrypt.hash.call(void 0, password, salt);

  return cryptPassword;
} exports.encryptPassword = encryptPassword;
