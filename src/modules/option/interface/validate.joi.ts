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
  key: joi.string().trim().required(),
  value: joi.any().required(),
});

export const find = joi.object({
  id: id.unnecessary,
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
  key: joi.string().trim().required(),
  value: joi.any().required(),
});

export const remove = joi.object({
  id: id.required
});

