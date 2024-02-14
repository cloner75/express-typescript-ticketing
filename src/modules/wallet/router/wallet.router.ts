import { Router } from 'express';
import Wallet from '../controller/wallet.controller';
import Validator from './../../../helpers/validator';
import { create, find, findOne, update, remove } from './../interface/validate.joi';
import authorization from './../../../helpers/authorization';


const validate = new Validator('wallet_service');
const router = Router();

const WalletController = new Wallet();
router.post('/',
  authorization.authorization,
  validate.validate(create, 'POST'),
  WalletController.create
);
router.get('/',
  authorization.authorization,
  validate.validate(find, 'GET'),
  WalletController.find
);
router.get('/:id',
  authorization.authorization,
  validate.validate(findOne, 'GET'),
  WalletController.findOne
);
router.put('/:id',
  authorization.authorization,
  validate.validate(update, 'PUT'),
  WalletController.update
);
router.delete('/:id',
  authorization.authorization,
  validate.validate(remove, 'DELETE'),
  WalletController.delete
);

export default router;