module.exports = {
    isAdmin: (req, res, next) =>{
        console.log('USER',req.user);
        if(req.user/*.role.toString() === 'admin'*/){
            next();
        }else{
            res.status(403).send();
        }
    },
    isModerator: (req,res, next) => {
        if(req.user/*.role.toString() === 'moderator'*/){
            next();
        }else{
            res.status(403).send();
        }
    }
}