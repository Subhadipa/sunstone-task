const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const loginUserRouter = require('./router/loginUser');

//const sequelize = require("./util/localconn")
const loginUserModel = require("./models/loginUserModel")
loginUserModel.sync();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use('/', loginUserRouter);

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))

});
