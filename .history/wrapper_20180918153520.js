const express = require('express')
const app = express();
var router = express.Router()

app.listen(8080);

router.get('/', mattedoDoesntLikeMeMiddleware(async (req, res, next) => {

}));

app.use(router);

app.use((err,req, res, next) =>{
    console.log(`If we arrived here than everything is good, despite the ${err} error`);
});

const mattedoDoesntLikeMeMiddleware = routeHandelr =>
    (req, res, next) => {
        Promise.resolve(routeHandelr(req, res, next))
            .catch(next);
    };