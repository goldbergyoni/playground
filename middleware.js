module.exports = (req,res,next) =>{
    console.log('Auth validation is starting')
    if(!req.headers['authorization']){
        console.log('No authorization header, 403')
        res.status(403).end();
        return;
    }
    next()
}