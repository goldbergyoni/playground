const express = require('express')
const app = express();
var router = express.Router()

router.get('/' , (req,res,next)=>{
    console.log(req.headers['auth'])
})

app.use((req,res,next)=>{
});