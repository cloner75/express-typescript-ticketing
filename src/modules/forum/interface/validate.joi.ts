import joi from 'joi';

const id: any = {
  required: joi
    .string()
    .trim()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required(),
  unnecessary: joi
    .string()
    .trim()
    .pattern(/^[0-9a-fA-F]{24}$/)
};

export const create = joi.object({
  fullname: joi.string().trim().required(),
  nationalCode: joi.string().trim().required(),
  phone: joi.string().pattern(/^{?(0?9[0-9]{9,9}}?)$/).trim().required(),
  postCode: joi.string().length(10).pattern(/^[0-9]+$/).required(),
  email: joi.string().trim().email().required(),
  state: joi.string().trim().required(),
  city: joi.string().trim().required(),
  afterSalesService: joi.number().valid(1, 2, 3, 4, 5).required(),
  appropriateResponse: joi.number().valid(1, 2, 3, 4, 5).required(),
  speedOfResponding: joi.number().valid(1, 2, 3, 4, 5).required(),
  easeOfAccess: joi.number().valid(1, 2, 3, 4, 5).required(),
  quality: joi.number().valid(1, 2, 3, 4, 5).required(),
  timelySupply: joi.number().valid(1, 2, 3, 4, 5).required(),
  commitment: joi.number().valid(1, 2, 3, 4, 5).required(),
  satisfaction: joi.number().valid(1, 2, 3, 4, 5).required(),
  usingTime: joi.number().valid(1, 2, 3, 4).required(),
});

export const find = joi.object({
  id: id.unnecessary,
  fullname: joi.string().trim(),
  nationalCode: joi.string().trim(),
  phone: joi.string().pattern(/^{?(0?9[0-9]{9,9}}?)$/).trim(),
  postCode: joi.string().length(10).pattern(/^[0-9]+$/),
  email: joi.string().trim().email(),
  state: joi.string().trim(),
  city: joi.string().trim(),
  afterSalesService: joi.number().valid(1, 2, 3, 4, 5),
  appropriateResponse: joi.number().valid(1, 2, 3, 4, 5),
  speedOfResponding: joi.number().valid(1, 2, 3, 4, 5),
  easeOfAccess: joi.number().valid(1, 2, 3, 4, 5),
  quality: joi.number().valid(1, 2, 3, 4, 5),
  timelySupply: joi.number().valid(1, 2, 3, 4, 5),
  commitment: joi.number().valid(1, 2, 3, 4, 5),
  satisfaction: joi.number().valid(1, 2, 3, 4, 5),
  usingTime: joi.number().valid(1, 2, 3, 4),
  key: joi.string().trim(),
  fields: joi.string().trim(),
  limit: joi.number(),
  skip: joi.number(),
  sort: joi.string().trim(),
  order: joi.string().trim().valid('DESC', 'ASC'),
  page: joi.number(),
  ids: joi.string().trim()
});

export const findOne = joi.object({
  id: id.required,
});

export const update = joi.object({
  id: id.required,
  fullname: joi.string().trim().required(),
  nationalCode: joi.string().trim().required(),
  phone: joi.string().pattern(/^{?(0?9[0-9]{9,9}}?)$/).trim().required(),
  postCode: joi.string().length(10).pattern(/^[0-9]+$/).required(),
  email: joi.string().trim().email().required(),
  state: joi.string().trim().required(),
  city: joi.string().trim().required(),
  afterSalesService: joi.number().valid(1, 2, 3, 4, 5).required(),
  appropriateResponse: joi.number().valid(1, 2, 3, 4, 5).required(),
  speedOfResponding: joi.number().valid(1, 2, 3, 4, 5).required(),
  easeOfAccess: joi.number().valid(1, 2, 3, 4, 5).required(),
  quality: joi.number().valid(1, 2, 3, 4, 5).required(),
  timelySupply: joi.number().valid(1, 2, 3, 4, 5).required(),
  commitment: joi.number().valid(1, 2, 3, 4, 5).required(),
  satisfaction: joi.number().valid(1, 2, 3, 4, 5).required(),
  usingTime: joi.number().valid(1, 2, 3, 4).required(),
});

export const remove = joi.object({
  id: id.required
});

