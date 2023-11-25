export default function (req, res, next){
    if(req.user.role != 'admin') return res.status(403).send("This route can be accessed by admins only!")
    next()
}