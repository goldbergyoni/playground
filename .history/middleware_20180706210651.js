module.exports = (req,res,next) =>{
    if(!req.headers['authorization']){
        console.log('No authorization header, 403')
        res.status(403).end()
    }
}