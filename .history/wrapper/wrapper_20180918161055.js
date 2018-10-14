const express = require('express')
const app = express();
var router = express.Router()

app.listen(8080);

const asyncMiddleware = routeHandelr =>
    (req, res, next) => {
        Promise.resolve(routeHandelr(req, res, next))
            .catch(err => {next(err)});
    };

router.get('/', asyncMiddleware(async (req, res, next) => {
    console.log('Starting');
    if(Math.random() < 0.5){
        throw new Error('sync error');
    }
    else{
        res.
    }
}));

app.use(router);

app.use((err,req, res, next) =>{
    console.log(`If we arrived here than everything is good, despite the ${err} error`);
});
    
