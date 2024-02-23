import { Router } from 'express';
import Wallet from '../controller/wallet.controller';
import Validator from './../../../helpers/validator';
import { create, find, findOne, update, remove } from './../interface/validate.joi';
import authorization from './../../../helpers/authorization';
import RoleBase from '../../../helpers/role';
import { wallet } from '../../../configs/permissions';

const validate = new Validator('wallet_service');
const role = new RoleBase('wallet_service');
const router = Router();

const WalletController = new Wallet();
router.post('/',
  authorization.authorization,
  role.access(wallet.create),
  validate.validate(create, 'POST'),
  WalletController.create
);
router.get('/',
  authorization.authorization,
  role.access(wallet.find),
  validate.validate(find, 'GET'),
  WalletController.find
);
router.get('/:id',
  authorization.authorization,
  role.access(wallet.findOne),
  validate.validate(findOne, 'GET'),
  WalletController.findOne
);
router.put('/:id',
  authorization.authorization,
  role.access(wallet.update),
  validate.validate(update, 'PUT'),
  WalletController.update
);
router.delete('/:id',
  authorization.authorization,
  role.access(wallet.delete),
  validate.validate(remove, 'DELETE'),
  WalletController.delete
);

export default router;