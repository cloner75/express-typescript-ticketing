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
  address: joi.string().trim().max(255).required(),
  brand: joi.string().trim().required(),
  type: joi.string().trim().required(),
  model: joi.string().trim().required(),
  warrantyId: joi.string().trim().required(),
  warrantyExpireTime: joi.date().required(),
  warrantyImg: joi.string().trim().uri().required(),
  invoiceImg: joi.string().trim().uri().required(),
  description: joi.string().trim().required(),
  TimeOfOccurrence: joi.date().required(),
  describeProduct: joi.string().trim().required(),
  request: joi.string().trim().required(),
  documents: joi.array().items(joi.string().uri().trim().required()).required(),
});

export const find = joi.object({
  id: id.unnecessary,
  fullname: joi.string().trim(),
  nationalCode: joi.string().trim(),
  phone: joi.string().pattern(/^{?(0?9[0-9]{9,9}}?)$/).trim(),
  postCode: joi.string().length(10).pattern(/^[0-9]+$/),
  email: joi.string().trim().email(),
  brand: joi.string().trim(),
  type: joi.string().trim(),
  model: joi.string().trim(),
  warrantyId: joi.string().trim(),
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
  address: joi.string().trim().max(255).required(),
  brand: joi.string().trim().required(),
  type: joi.string().trim().required(),
  model: joi.string().trim().required(),
  warrantyId: joi.string().trim().required(),
  warrantyExpireTime: joi.date().required(),
  warrantyImg: joi.string().trim().uri().required(),
  invoiceImg: joi.string().trim().uri().required(),
  description: joi.string().trim().required(),
  TimeOfOccurrence: joi.date().required(),
  describeProduct: joi.string().trim().required(),
  request: joi.string().trim().required(),
  documents: joi.array().items(joi.string().uri().trim().required()).required(),
});

export const remove = joi.object({
  id: id.required
});

