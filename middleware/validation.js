const Joi = require('joi');
let exportValidationFuncs = {
    createUserSchema: async (req, res, next) => {
        try {
            const newUserSchema = Joi.object().keys({

                name: Joi.string().required(),
                email: Joi.string().email().lowercase().required(),
                password: Joi.string().min(3).max(10).required(),

                //pattern(new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\]).{6,30}$')).
            });

            let value = await newUserSchema.validateAsync(req.body);
            req.body = value

            next();

        }
        catch (error) {
            if (error.isJoi === true) {

                return res.status(422).send({
                    status: "false",
                    message: `ERROR-> ${error.message}`

                })
            }
            return res.status(500).send({
                status: "false",
                message: `ERROR-> ${error.message}`

            })
        }
    },
    loginUserSchema: async (req, res, next) => {
        try {

            const loginnUserSchema = Joi.object().keys({


                email: Joi.string().email().lowercase().required(),
                password: Joi.string().min(3).max(10).required(),
            })
            let value = await loginnUserSchema.validateAsync(req.body);
            req.body = value

            next();


        } catch (error) {
            if (error.isJoi === true) {

                return res.status(422).send({
                    status: "false",
                    message: `ERROR-> ${error.message}`

                })
            }
            return res.status(500).send({
                status: "false",
                message: `ERROR-> ${error.message}`

            })
        }

    },
    forgotPasswordSchema: async (req, res, next) => {
        try {


            const forgotPasswordUserSchema = Joi.object().keys({


                email: Joi.string().email().lowercase().required(),
            })
            let value = await forgotPasswordUserSchema.validateAsync(req.body);
            req.body = value

            next();
        } catch (error) {
            if (error.isJoi === true) {

                return res.status(422).send({
                    status: "false",
                    message: `ERROR-> ${error.message}`

                })
            }
            return res.status(500).send({
                status: "false100",
                message: `ERROR-> ${error.message}`

            })
        }
    },
    resetPasswordSchema: async (req, res, next) => {
        try {

            const resetPasswordUserSchema = Joi.object().keys({


                password: Joi.string().min(3).max(10).required(),






            })
            let value = await resetPasswordUserSchema.validateAsync(req.body);
            req.body = value

            next();
        } catch (error) {
            if (error.isJoi === true) {

                return res.status(422).send({
                    status: "false",
                    message: `ERROR-> ${error.message}`

                })
            }
            return res.status(500).send({
                status: "false",
                message: `ERROR-> ${error.message}`

            })
        }
    }
}
module.exports = exportValidationFuncs