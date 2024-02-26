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
  phone: joi.string().trim().pattern(/^{?(0?9[0-9]{9,9}}?)$/).required(),
  content: joi.string().trim().required(),
});

export const find = joi.object({
  id: id.unnecessary,
  phone: joi.string().pattern(/^{?(0?9[0-9]{9,9}}?)$/).trim(),
  fullname: joi.string().trim(),
  status: joi.number(),
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
  phone: joi.string().trim().pattern(/^{?(0?9[0-9]{9,9}}?)$/).required(),
  status: joi.number().required(),
  content: joi.string().trim().required(),
});

export const remove = joi.object({
  id: id.required
});

