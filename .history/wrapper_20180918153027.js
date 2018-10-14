const express = require('express')
const app = express();
var router = express.Router()

app.listen(8080);

router.get('/' , (req,res,next)=>{
    res.json({});
})

app.use(router);

const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
  };