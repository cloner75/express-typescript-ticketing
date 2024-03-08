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
  nationalCode: joi.string().trim().length(10).required(),
  father: joi.string().trim().required(),
  birthPlace: joi.string().trim().required(),
  placeOfIssue: joi.string().trim().required(),
  birthday: joi.date().required(),
  nationality: joi.string().trim().required(),
  religion: joi.string().trim().required(),
  isMarriage: joi.boolean().required(),
  Housing: joi.number().valid(1, 2).required(),
  spouseWorkplace: joi.string().trim().required(),
  wifeMobile: joi.string().pattern(/^{?(0?9[0-9]{9,9}}?)$/).trim(),
  wifePhone: joi.string().trim().required(),
  houseAddress: joi.string().trim().required(),
  degreeOfEducation: joi.string().trim().required(),
  degreeTime: joi.date().required(),
  courses: joi.string().trim().required(),
  langs: joi.string().trim().required(),
  guarantee: joi.boolean().required(),
  requestJob: joi.string().trim().required(),
  requestSalary: joi.number().required(),
  startedDate: joi.date().required(),
  iq: joi.number().min(0).max(100).required(),
  memory: joi.number().min(0).max(100).required(),
  responsibility: joi.number().min(0).max(100).required(),
  followUp: joi.number().min(0).max(100).required(),
  discipline: joi.number().min(0).max(100).required(),
  conscience: joi.number().min(0).max(100).required(),
  respect: joi.number().min(0).max(100).required(),
  vision: joi.number().valid(1, 2).required(),
  visionDescribe: joi.string().trim().required(),
  firstWorkDate: joi.date().required(),
  insuranceNumber: joi.number().required(),
  history: joi.array().items(joi.object({
    companyName: joi.string().trim().required(),
    post: joi.string().trim().required(),
    lastSalary: joi.number().required(),
    employersPhone: joi.string().pattern(/^{?(0?9[0-9]{9,9}}?)$/).trim(),
    reasonLiving: joi.string().trim().required(),
    atDateWork: joi.date().required(),
    untilDateWork: joi.date().required(),
  }).required()).required(),
});

export const find = joi.object({
  id: id.unnecessary,
  fullname: joi.string().trim(),
  nationalCode: joi.string().trim().length(10),
  father: joi.string().trim(),
  birthPlace: joi.string().trim(),
  placeOfIssue: joi.string().trim(),
  birthday: joi.date(),
  nationality: joi.string().trim(),
  religion: joi.string().trim(),
  isMarriage: joi.boolean(),
  Housing: joi.number().valid(1, 2),
  spouseWorkplace: joi.string().trim(),
  wifeMobile: joi.string().pattern(/^{?(0?9[0-9]{9,9}}?)$/).trim(),
  wifePhone: joi.string().trim(),
  houseAddress: joi.string().trim(),
  degreeOfEducation: joi.string().trim(),
  degreeTime: joi.date(),
  courses: joi.string().trim(),
  langs: joi.string().trim(),
  guarantee: joi.boolean(),
  requestJob: joi.string().trim(),
  requestSalary: joi.number(),
  startedDate: joi.date(),
  iq: joi.number().min(0).max(100),
  memory: joi.number().min(0).max(100),
  responsibility: joi.number().min(0).max(100),
  followUp: joi.number().min(0).max(100),
  discipline: joi.number().min(0).max(100),
  conscience: joi.number().min(0).max(100),
  respect: joi.number().min(0).max(100),
  vision: joi.number().valid(1, 2),
  visionDescribe: joi.string().trim(),
  firstWorkDate: joi.date(),
  insuranceNumber: joi.number(),
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
  nationalCode: joi.string().trim().length(10).required(),
  father: joi.string().trim().required(),
  birthPlace: joi.string().trim().required(),
  placeOfIssue: joi.string().trim().required(),
  birthday: joi.date().required(),
  nationality: joi.string().trim().required(),
  religion: joi.string().trim().required(),
  isMarriage: joi.boolean().required(),
  Housing: joi.number().valid(1, 2).required(),
  spouseWorkplace: joi.string().trim().required(),
  wifeMobile: joi.string().pattern(/^{?(0?9[0-9]{9,9}}?)$/).trim(),
  wifePhone: joi.string().trim().required(),
  houseAddress: joi.string().trim().required(),
  degreeOfEducation: joi.string().trim().required(),
  degreeTime: joi.date().required(),
  courses: joi.string().trim().required(),
  langs: joi.string().trim().required(),
  guarantee: joi.boolean().required(),
  requestJob: joi.string().trim().required(),
  requestSalary: joi.number().required(),
  startedDate: joi.date().required(),
  iq: joi.number().min(0).max(100).required(),
  memory: joi.number().min(0).max(100).required(),
  responsibility: joi.number().min(0).max(100).required(),
  followUp: joi.number().min(0).max(100).required(),
  discipline: joi.number().min(0).max(100).required(),
  conscience: joi.number().min(0).max(100).required(),
  respect: joi.number().min(0).max(100).required(),
  vision: joi.number().valid(1, 2).required(),
  visionDescribe: joi.string().trim().required(),
  firstWorkDate: joi.date().required(),
  insuranceNumber: joi.number().required(),
  history: joi.array().items(joi.object({
    companyName: joi.string().trim().required(),
    post: joi.string().trim().required(),
    lastSalary: joi.number().required(),
    employersPhone: joi.string().pattern(/^{?(0?9[0-9]{9,9}}?)$/).trim(),
    reasonLiving: joi.string().trim().required(),
    atDateWork: joi.date().required(),
    untilDateWork: joi.date().required(),
  }).required()).required(),
});

export const remove = joi.object({
  id: id.required
});

