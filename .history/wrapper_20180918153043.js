const express = require('express')
const app = express();
var router = express.Router()

app.listen(8080);

router.get('/' , (req,res,next)=>{
    res.json({});
})

app.use(router);

const asyncMiddleware = routeHandelr =>
  (req, res, next) => {
    Promise.resolve(routeHandelr(req, res, next))
      .catch(next);
  };