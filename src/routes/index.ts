import express from 'express';

import UserController from '../controllers/UserController';
import UserAuthenticated from '../controllers/UserAuthenticated';
import PenalCodeController from '../controllers/PenalCodeController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const router = express.Router();

router.get('/list', ensureAuthenticated, UserController.list);
router.post('/users', UserController.create);
router.post('/login', UserAuthenticated.index);
router.delete('/delete', ensureAuthenticated, UserController.del);


// PenalCodes Routes
router.get('/penal-codes', ensureAuthenticated, PenalCodeController.list);
router.post('/penal-codes', ensureAuthenticated, PenalCodeController.create);
router.put('/penal-codes/:id', ensureAuthenticated, PenalCodeController.update);
router.delete('/penal-codes/:id', ensureAuthenticated, PenalCodeController.delete);

export { router };