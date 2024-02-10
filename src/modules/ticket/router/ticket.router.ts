import { Router } from 'express';
import Ticket from '../controller/ticket.controller';
const router = Router();

const TicketController = new Ticket();
router.post('/', TicketController.create);
router.get('/', TicketController.find);
router.get('/:id', TicketController.findOne);
router.put('/:id', TicketController.update);
router.delete('/:id', TicketController.delete);

export default router;