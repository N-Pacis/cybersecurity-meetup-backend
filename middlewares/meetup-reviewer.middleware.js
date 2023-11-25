export default function (req, res, next){
    if(req.user.role != 'meetup-reviewer') return res.status(403).send("This route can be accessed by meetup-reviewers only!")
    next()
}