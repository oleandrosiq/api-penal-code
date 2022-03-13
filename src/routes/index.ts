import express from 'express';

import UserController from '../controllers/UserController';
import UserAuthenticated from '../controllers/UserAuthenticated';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const router = express.Router();

router.get('/list', ensureAuthenticated, UserController.list);
router.post('/users', UserController.create);
router.post('/login', UserAuthenticated.index);
router.delete('/delete', ensureAuthenticated, UserController.del);

export { router };
