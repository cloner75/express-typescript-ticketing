import { Router } from 'express';
import Complaint from '../controller/complaint.controller';
import Validator from '../../../helpers/validator';
import { create, find, findOne, update, remove } from '../interface/validate.joi';
import authorization from '../../../helpers/authorization';
import RoleBase from '../../../helpers/role';
import { complaint } from '../../../configs/permissions';

const validate = new Validator('complaint_service');
const role = new RoleBase('complaint');
const router = Router();

const ComplaintController = new Complaint();



router.post('/public',
  validate.validate(create, 'POST'),
  ComplaintController.createPublic
);

router.post('/',
  authorization.authorization,
  role.access(complaint.find),
  validate.validate(create, 'POST'),
  ComplaintController.create
);

router.get('/',
  authorization.authorization,
  role.access(complaint.find),
  validate.validate(find, 'GET'),
  ComplaintController.find
);

router.get('/:id',
  authorization.authorization,
  role.access(complaint.findOne),
  validate.validate(findOne, 'GET'),
  ComplaintController.findOne
);

router.put('/:id',
  authorization.authorization,
  role.access(complaint.update),
  validate.validate(update, 'PUT'),
  ComplaintController.update
);

router.delete('/:id',
  authorization.authorization,
  role.access(complaint.delete),
  validate.validate(remove, 'DELETE'),
  ComplaintController.delete
);

export default router;