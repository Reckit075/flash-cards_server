export default (req,res, next) =>{
    if(req.user.isAdmin)
        next()
    else
    {
        res.statusCode = 401
        res.json({message: "Unauthorized"})
    }
}