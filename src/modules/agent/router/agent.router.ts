import { Router } from 'express';
import Auth from './../controller/agent.controller';
import Validator from './../../../helpers/validator';
import { create, find, findOne, remove, update } from './../interface/validate.joi';

const validate = new Validator('agent_service');
const router = Router();

const AgentController = new Auth();
router.post('/', validate.validate(create, 'create'), AgentController.create);
router.get('/',validate.validate(find, 'find'), AgentController.find);
router.get('/:id', validate.validate(findOne, 'findOne'), AgentController.findOne);
router.put('/:id', validate.validate(update, 'update'), AgentController.update);
router.delete('/:id', validate.validate(remove, 'remove'), AgentController.delete);

export default router;