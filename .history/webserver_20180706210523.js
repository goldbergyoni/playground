const express = require('express')
const app = express();
var router = express.Router()

app.listen(8080);

router.get('/' , (req,res,next)=>{
    console.log(req.headers['authorization'])
    res.json({});
})

app.use(router);