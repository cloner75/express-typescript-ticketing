import joi from 'joi';
import { category } from '../product.module';

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
  name: joi.string().trim().required(),
  title: joi.string().trim().required(),
  description: joi.string().trim().required(),
  slug: joi.string().trim().required(),
  colers: joi.array().items(joi.string().trim().required()).required(),
  images: joi.array().items(joi.string().trim().required()).required(),
  options: joi.array().items(joi.object({
    key: joi.string().trim().required(),
    value: joi.string().trim().required()
  })).required(),
  brandId: id.required,
  categoryId: id.required,
});

export const find = joi.object({
  id: id.unnecessary,
  name: joi.string().trim(),
  title: joi.string().trim(),
  slug: joi.string().trim(),
  brandId: id.unnecessary,
  categoryId: id.unnecessary,
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
  brandId: id.required,
  categoryId: id.required,
  name: joi.string().trim().required(),
  title: joi.string().trim().required(),
  description: joi.string().trim().required(),
  slug: joi.string().trim().required(),
  colers: joi.array().items(joi.string().trim().required()).required(),
  images: joi.array().items(joi.string().trim().required()).required(),
  options: joi.array().items(joi.object({
    key: joi.string().trim().required(),
    value: joi.string().trim().required()
  })).required(),
});

export const remove = joi.object({
  id: id.required
});

