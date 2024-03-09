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
  categoryId: id.required,
  title: joi.string().trim().max(255).required(),
  content: joi.string().trim().max(2000).required(),
});

export const createReply = joi.object({
  forumId: id.required,
  text: joi.string().trim().max(2000).required(),
  name: joi.string().trim().required().max(255),
  email: joi.string().email().required(),
});

export const find = joi.object({
  id: id.unnecessary,
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

});

export const updateLike = joi.object({
  id: id.required,
  like: joi.boolean().required()
});

export const updateStatus = joi.object({
  id: id.required,
  status: joi.number().min(0).max(10).required()
});

export const remove = joi.object({
  id: id.required
});

