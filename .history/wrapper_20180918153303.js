const express = require('express')
const app = express();
var router = express.Router()

app.listen(8080);

router.get('/', asyncMiddleware(async (req, res, next) => {

}));

app.use(router);

app.use()

const asyncMiddleware = routeHandelr =>
    (req, res, next) => {
        Promise.resolve(routeHandelr(req, res, next))
            .catch(next);
    };