import joi from 'joi';

export const login = joi.object({
  email: joi.string().email().max(200).required(),
  password: joi.string().trim().min(8).max(45).required(),
});

export const logout = joi.object({

});

export const signup = joi.object({
  email: joi.string().email().max(200).required(),
  username: joi.string().trim().max(45).required(),
  password: joi.string().trim().min(8).max(45).required(),
});

