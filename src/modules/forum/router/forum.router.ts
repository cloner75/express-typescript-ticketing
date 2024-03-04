import { Router } from 'express';
import Complaint from '../controller/forum.controller';
import Validator from '../../../helpers/validator';
import { create, find, findOne, update, remove } from '../interface/validate.joi';
import authorization from '../../../helpers/authorization';
import RoleBase from '../../../helpers/role';
import { forum } from '../../../configs/permissions';

const validate = new Validator('forum_service');
const role = new RoleBase('forum');
const router = Router();

const ComplaintController = new Complaint();



router.post('/public',
  validate.validate(create, 'POST'),
  ComplaintController.createPublic
);


router.get('/public',
  validate.validate(create, 'POST'),
  ComplaintController.getPublic
);


router.post('/',
  authorization.authorization,
  role.access(forum.find),
  validate.validate(create, 'POST'),
  ComplaintController.create
);

router.get('/',
  authorization.authorization,
  role.access(forum.find),
  validate.validate(find, 'GET'),
  ComplaintController.find
);

router.get('/:id',
  authorization.authorization,
  role.access(forum.findOne),
  validate.validate(findOne, 'GET'),
  ComplaintController.findOne
);

router.put('/:id',
  authorization.authorization,
  role.access(forum.update),
  validate.validate(update, 'PUT'),
  ComplaintController.update
);

router.delete('/:id',
  authorization.authorization,
  role.access(forum.delete),
  validate.validate(remove, 'DELETE'),
  ComplaintController.delete
);

export default router;