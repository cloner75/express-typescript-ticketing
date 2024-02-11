import { Router } from 'express';
import Auth from './../controller/agent.controller';
import Validator from './../../../helpers/validator';
import { create, find, findOne, remove, update } from './../interface/validate.joi';

const validate = new Validator('agent_service');
const router = Router();

const AgentController = new Auth();
router.post('/', validate.validate(create, 'POST'), AgentController.create);
router.get('/',validate.validate(find, 'GET'), AgentController.find);
router.get('/:id', validate.validate(findOne, 'GET'), AgentController.findOne);
router.put('/:id', validate.validate(update, 'PUT'), AgentController.update);
router.delete('/:id', validate.validate(remove, 'DELETE'), AgentController.delete);

export default router;