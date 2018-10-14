const express = require('express')
const app = express();
var router = express.Router()
const authValidatgionMiddleware = require('./middleware')

app.listen(8080);
app.use(authValidatgionMiddleware)

router.get('/' , (req,res,next)=>{
    console.log(req.headers['authorization'])
    
    res.json({});
})

app.use(router);