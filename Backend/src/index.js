const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const productRouter = require('./routers/product')
const app = express()
const port = process.env.PORT


app.use(express.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization,Content-Length, Accept-Encoding, X-CSRF-Token");
    next();
  });


app.use(userRouter)
app.use(productRouter)
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})