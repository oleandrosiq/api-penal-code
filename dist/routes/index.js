"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);

var _UserController = require('../controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _UserAuthenticated = require('../controllers/UserAuthenticated'); var _UserAuthenticated2 = _interopRequireDefault(_UserAuthenticated);
var _ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const router = _express2.default.Router();

router.get('/list', _ensureAuthenticated.ensureAuthenticated, _UserController2.default.list);
router.post('/users', _UserController2.default.create);
router.post('/login', _UserAuthenticated2.default.index);
router.delete('/delete', _ensureAuthenticated.ensureAuthenticated, _UserController2.default.del);

exports.router = router;
