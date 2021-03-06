"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }require('dotenv/config');

var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);

var _routes = require('./routes');

const app = _express2.default.call(void 0, );

app.use(_express2.default.json());

app.use(_cors2.default.call(void 0, ));

app.use(_routes.router);

const port = process.env.PORT || 2001;
app.listen(port, () => console.log(`Server started on port ${port} 🚀`));