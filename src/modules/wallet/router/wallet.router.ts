import { Router } from 'express';
import Wallet from '../controller/wallet.controller';
const router = Router();

const WalletController = new Wallet();
router.post('/', WalletController.create);
router.get('/', WalletController.find);
router.get('/:id', WalletController.findOne);
router.put('/:id', WalletController.update);
router.delete('/:id', WalletController.delete);

export default router;