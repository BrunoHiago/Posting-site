const mongoose = require("mongoose")
const localStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt")
const passport = require("passport")

require("../models/Usuario")
const Usuario = mongoose.model("usuarios")

module.exports = (passport)=>{
    
    passport.use(new localStrategy({usernameField: "email", passwordField: "senha"},(email, senha, done)=>{
        Usuario.findOne({email: email}).then((usuario)=>{
            if(!usuario){
                return done(null, false, {message: "Email não cadastrado"})
            }

            bcrypt.compare(senha, usuario.senha, (erro, batem)=>{
                if(batem){
                    return done(null, usuario)
                }else{
                    return done(null, false, {message: "Senha Incorreta"})
                }
            })
        })
    }))

    passport.serializeUser((usuario, done)=>{
        return done(null, usuario.id)
    })

    passport.deserializeUser((id, done)=>{
        Usuario.findById(id).then((usuario)=>{
            done(null, usuario)
        })
    })
}