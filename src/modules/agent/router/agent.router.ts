import { Router } from 'express';
import Auth from './../controller/agent.controller';
import Validator from './../../../helpers/validator';
import RoleBase from '../../../helpers/role';
import { agent } from '../../../configs/permissions';
import { create, find, findOne, remove, update } from './../interface/validate.joi';
import authorization from './../../../helpers/authorization';

const validate = new Validator('agent_service');
const role = new RoleBase('agent');
const router = Router();

const AgentController = new Auth();

router.post('/',
  authorization.authorization,
  role.access(agent.create),
  validate.validate(create, 'POST'),
  AgentController.create
);

router.get('/',
  authorization.authorization,
  role.access(agent.find),
  validate.validate(find, 'GET'),
  AgentController.find
);

router.get('/:id',
  authorization.authorization,
  role.access(agent.findOne),
  validate.validate(findOne, 'GET'),
  AgentController.findOne
);

router.put('/:id',
  authorization.authorization,
  role.access(agent.update),
  validate.validate(update, 'PUT'),
  AgentController.update
);

router.delete('/:id',
  authorization.authorization,
  role.access(agent.delete),
  validate.validate(remove, 'DELETE'),
  AgentController.delete
);

export default router;