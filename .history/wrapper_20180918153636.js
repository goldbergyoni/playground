const express = require('express')
const app = express();
var router = express.Router()

app.listen(8080);

router.get('/', asyncMiddleware(async (req, res, next) => {
    console.log('Starting');
    if(Math.random() < 0.5){
        throw new Error('sync error');
    }
    else{
        process.nextTick
    }
}));

app.use(router);

app.use((err,req, res, next) =>{
    console.log(`If we arrived here than everything is good, despite the ${err} error`);
});
    
const asyncMiddleware = routeHandelr =>
    (req, res, next) => {
        Promise.resolve(routeHandelr(req, res, next))
            .catch(next);
    };