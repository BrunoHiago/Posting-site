
module.exports = {
    isAdmin: (req, res, next)=>{
        if(req.isAuthenticated() && req.user.isAdmin == 1){
            return next()
        }

        req.flash("error_msg", "Voce precisa ser um Admin pra acessar")
        res.redirect("/")
    }
}