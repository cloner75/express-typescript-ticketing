import { Router } from 'express';
import Auth from './../controller/agent.controller';
const router = Router();

const AgentController = new Auth();
router.post('/', AgentController.create);
router.get('/', AgentController.find);
router.get('/:id', AgentController.findOne);
router.put('/:id', AgentController.update);
router.delete('/:id', AgentController.delete);

export default router;