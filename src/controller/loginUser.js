const Sequelize = require("sequelize");
const loginUserModel = require("../models/loginUserModel");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const {
    createUserSchema,
    loginUserSchema,
    forgotPasswordrSchema,
    resetPasswordSchema

} = require('../validator/validation')


let exportFuncs = {
    //Creating new user
    createUser: async (req, res) => {
        try {

            let { name, email, password } = req.body;

            let validateResult = await createUserSchema.validateAsync(req.body)

            saltRounds = 10;
            const hashedPassword = bcrypt.hashSync(validateResult.password, saltRounds);//hased passasword
            let dataObject = {
                name: validateResult.name,
                email: validateResult.email,
                password: hashedPassword
            };

            //checking if the email exist or not
            let userDetails = await loginUserModel.findAll({
                where: {
                    email: validateResult.email,
                }
            });


            let emailFound = userDetails.length
            if (emailFound != 0) {
                return res.status(400).send({
                    status: false,
                    message: "This email Id already exists with another user!"
                });
            }

            //creating new user in db
            let savedData = await loginUserModel.create(dataObject);

            return res.status(200).send({
                status: "true",
                message: "User created successfully!",
                data: savedData
            })
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
    //Registered user will login 
    loginUser: async (req, res) => {
        try {

            let { email, password } = req.body;
            let validateResult = await loginUserSchema.validateAsync(req.body)
            saltRounds = 10;

            let userDetails = await loginUserModel.findOne({

                where: {
                    email: validateResult.email,
                }
            });

            if (!userDetails) {
                return res.status(400).send({
                    status: false,
                    message: "user with this email doesn't exist!"
                });

            }



            if (userDetails) {
                const { name, password } = userDetails
                //verify passwords
                const validPassword = await bcrypt.compare(validateResult.password, password);

                if (validPassword) {
                    return res.status(200).send({
                        status: true,
                        message: name + " " + "logged in successfully!"
                    });
                } else {
                    return res.status(400).send({
                        status: false,
                        message: "Invalid credentials!"
                    });
                }

            }


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
    //Forgot password link will be sent and token generation
    forgotPassword: async (req, res) => {
        try {
            let { email } = req.body;
            let validateResult = await forgotPasswordrSchema.validateAsync(req.body)
            //checking the email if it's exist or not
            let userDetails = await loginUserModel.findOne({

                where: {
                    email: validateResult.email,
                }
            });


            if (!userDetails) {
                return res.status(400).send({
                    status: false,
                    message: "User with this email doesn't exist!"
                });

            }
            else {
                //creating token
                const token = jwt.sign(
                    {
                        email: userDetails.email,
                        // exp:0.5 * 60 
                    },
                    "subha", //secret key
                    {
                        expiresIn: 0.5 * 60
                    }
                );
                //updating token w.r.t email
                const data = await loginUserModel.update({ token: token }, {
                    where: {
                        email: validateResult.email,
                    }
                });
                //calling email sending method
                emailSender(userDetails.name, userDetails.email, token);

                return res.status(200).send({
                    status: true,
                    message: "Password reset link is send to your email.Kindly check!",

                })




            }



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
    //Reset password if the user forgot his password
    resetPassword: async (req, res) => {
        try {
            const token = req.query.token;
            //console.log(token)
            //Find out the generated token from db
            const tokenData = await loginUserModel.findOne({

                where: {
                    token: token,
                }
            });
            // console.log(tokenData)

            if (tokenData) {
                const { password } = req.body;

                let validateResult = await resetPasswordSchema.validateAsync(req.body)

                const resetPassword = validateResult.password;

                let saltRounds = 10;

                const newPassword = bcrypt.hashSync(resetPassword, saltRounds);

                //update with new password
                const userData = await loginUserModel.update(
                    {
                        password: newPassword,
                        token: " ",
                    },

                    {
                        where: {
                            token: token,
                        }
                    }
                );

                return res.status(200).send({
                    status: true,
                    message: "User password has been reset.",


                })
            }
            else {
                return res.status(400).send({
                    status: false,
                    message: "This link has been expired."

                })
            }

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


    }
}




//Created email sending method

const emailSender = async (name, email, token) => {
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 3000,
        secure: false,
        requireTLS: true,
        auth: {
            user: 'testsubhadipa@gmail.com',
            pass: 'testSubhadipa22'
        }
    });

    var mailOptions = {
        from: 'testsubhadipa@gmail.com',
        to: email,
        subject: 'For Reset Password',
        html:
            `<h2>Hi ${name},Please click on the given link to reset your account password</h2>
                   <p>http://localhost:3000/resetpassword/${token}</p>`

    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);

        } else {
            console.log('Email has been sent: ' + info.response);

        }
    })

}

module.exports = exportFuncs