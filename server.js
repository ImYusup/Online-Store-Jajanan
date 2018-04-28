const express    = require("express");
const userRouter = require('./src/routes/user-router');
const orderRouter = require('./src/routes/order-routes');
const productRouter = require('./src/routes/product-routes');
const bodyParser = require('body-parser');
const htmlPage = require('./src/routes/html-routes');
const path = require('path')

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use('/public', express.static('public'));

app.use('/api', userRouter);
app.use('/api', productRouter);
app.use('/api', orderRouter);
app.use('/', htmlPage);

// app.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname+'/public/new-login.html'));
// });
app.listen(5000, function(){
    console.log("server is already running!")
});