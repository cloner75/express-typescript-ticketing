import { Router } from 'express';
import Auth from './../controller/agent.controller';
import Validator from './../../../helpers/validator';
import { create, find, findOne, remove, update } from './../interface/validate.joi';
import authorization from './../../../helpers/authorization';

const validate = new Validator('agent_service');
const router = Router();

const AgentController = new Auth();

router.post('/',
  authorization.authorization,
  validate.validate(create, 'POST'),
  AgentController.create
);

router.get('/',
  authorization.authorization,
  validate.validate(find, 'GET'),
  AgentController.find
);

router.get('/:id',
  authorization.authorization,
  validate.validate(findOne, 'GET'),
  AgentController.findOne
);

router.put('/:id',
  authorization.authorization,
  validate.validate(update, 'PUT'),
  AgentController.update
);

router.delete('/:id',
  authorization.authorization,
  validate.validate(remove, 'DELETE'),
  AgentController.delete
);

export default router;