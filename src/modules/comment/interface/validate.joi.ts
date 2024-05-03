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
  text: joi.string().trim().required(),
  
  id: id.required,
  commentId: id.unnecessary
});

export const find = joi.object({
  id: id.unnecessary,
  productId: id.unnecessary,
  commentId: id.unnecessary,
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
  text: joi.string().trim().required(),
  isShow: joi.boolean().required()
});

export const remove = joi.object({
  id: id.required,
});

