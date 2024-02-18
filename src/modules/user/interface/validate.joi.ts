import joi, { required } from 'joi';

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

const isPersianText = {
  required: joi
    .string()
    .trim()
    .pattern(/([-.]*\\s*[-.]*\\p{Arabic}*[-.]*\\s*)*[-.]*/)
    .required(),
  unnecessary: joi
    .string()
    .trim()
    .pattern(/([-.]*\\s*[-.]*\\p{Arabic}*[-.]*\\s*)*[-.]*/)
};

export const user = {
  create: joi.object({

  }),

  find: joi.object({

  }),

  findOne: joi.object({

  }),

  update: joi.object({

  }),

  remove: joi.object({

  }),

};


export const role = {
  create: joi.object({
    name: joi.string().trim().required(),
    nameFa: isPersianText.required,
  }),

  find: joi.object({
    name: joi.string().trim(),
    nameFa: isPersianText.unnecessary,
    fields: joi.string().trim(),
    limit: joi.number(),
    skip: joi.number(),
    sort: joi.number().valid(-1, 1),
    order: joi.string().trim().valid('_id', 'createdAt', 'updatedAt'),
    page: joi.number(),
    ids: joi.string().trim()
  }),

  findOne: joi.object({
    id: id.required,
    fields: joi.string().trim(),
  }),

  update: joi.object({
    id: id.required,
    name: joi.string().trim().required(),
    nameFa: isPersianText.required,
  }),

  remove: joi.object({
    id: id.required,
  }),

};


export const permission = {

  create: joi.object({
    roleId: id.required,
    access: joi.array().items(joi.object({
      service: joi.string().trim().required(),
      methods: joi.array().items(joi.string().trim().required()).required(),
    })).required(),
  }),

  find: joi.object({
    fields: joi.string().trim(),
    limit: joi.number(),
    skip: joi.number(),
    sort: joi.number().valid(-1, 1),
    order: joi.string().trim().valid('_id', 'createdAt', 'updatedAt'),
    page: joi.number(),
    ids: joi.string().trim()
  }),

  findOne: joi.object({
    id: id.required,
    fields: joi.string().trim(),
  }),

  update: joi.object({
    id: id.required,
    roleId: id.required,
    access: joi.array().items(joi.object({
      service: joi.string().trim().required(),
      methods: joi.array().items(joi.string().trim().required()).required(),
    })).required(),
  }),

  remove: joi.object({
    id: id.required
  }),

};


