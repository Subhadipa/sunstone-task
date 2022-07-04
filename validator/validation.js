const Joi = require('joi');

const createUserSchema = Joi.object().keys({

    name: Joi.string().required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(3).max(10).required(),

    //pattern(new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\]).{6,30}$')).




});
const loginUserSchema = Joi.object().keys({


    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(3).max(10).required(),






});
const forgotPasswordrSchema = Joi.object().keys({


    email: Joi.string().email().lowercase().required(),






});
const resetPasswordSchema = Joi.object().keys({


    password: Joi.string().min(3).max(10).required(),






});
module.exports = {
    createUserSchema,
    loginUserSchema,
    forgotPasswordrSchema,
    resetPasswordSchema

}