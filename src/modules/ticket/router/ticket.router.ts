import { Router } from 'express';
import Ticket from '../controller/ticket.controller';
import Validator from './../../../helpers/validator';
import { create, find, findOne, update, remove } from './../interface/validate.joi';
import authorization from './../../../helpers/authorization';

const validate = new Validator('ticket_service');
const router = Router();

const TicketController = new Ticket();
router.post('/',
  authorization.authorization,
  validate.validate(create, 'POST'),
  TicketController.create
);
router.get('/',
  authorization.authorization,
  validate.validate(find, 'GET'),
  TicketController.find
);
router.get('/:id',
  authorization.authorization,
  validate.validate(findOne, 'GET'),
  TicketController.findOne
);
router.put('/:id',
  authorization.authorization,
  validate.validate(update, 'PUT'),
  TicketController.update
);
router.delete('/:id',
  authorization.authorization,
  validate.validate(remove, 'DELETE'),
  TicketController.delete
);

export default router;