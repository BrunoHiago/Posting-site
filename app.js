//Carregando os modulos
    const express = require("express")
    const handlebars = require("express-handlebars")
    const bodyParser = require("body-parser")
    const app = express()
    const admin = require("./router/admin")
    const usuarios = require("./router/usuarios")
    const path = require("path")
    const mongoose = require("mongoose")
    const flash = require("connect-flash")
    const session = require("express-session")
    require("./models/Postagem")
    const Postagem = mongoose.model("postagens")
    require("./models/Categoria")
    const Categoria = mongoose.model("categorias")
    const passport = require("passport")
    require("./config/auth")(passport)
    require('dotenv').config();
//Configurações
    //Sessao
        app.use(session({
            secret: "cursodenode",
            resave: true,
            saveUninitialized: true
        }))

        app.use(passport.initialize())
        app.use(passport.session())

        app.use(flash())
    //Middleware
        app.use((req, res, next)=>{
            res.locals.success_msg = req.flash("success_msg")
            res.locals.error_msg = req.flash("error_msg")
            res.locals.error = req.flash("error")
            res.locals.user = req.user || null
            res.locals.admin = req.user?.isAdmin ? true : false
            next()
        })
    //Body Parser
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json())
    //Handlebars
        app.engine("handlebars", handlebars.engine({defaultLayout: 'main', runtimeOptions:{allowProtoPropertiesByDefault: true}}))
        app.set("view engine", "handlebars")
    //Mongoose
        mongoose.Promise = global.Promise
        mongoose.connect(process.env.MONGO_URL).then(()=>{
            console.log("Conectado ao Banco")
        }).catch((erro)=>{
            console.log("Erro ao conectar: " + erro)
        })
        mongoose.set('strictQuery', false);
    //Path
        app.use(express.static(path.join(__dirname,"public")))
//Rotas
    app.get("/", (req, res)=>{
        Postagem.find().populate("categoria").sort({data: "desc"}).then((postagens)=>{
            res.render("index", {postagens: postagens})
        }).catch((error)=>{
            req.flash("error_msg", "Houve erro em listar as postagens")
            res.redirect("/404")
        })
    })

    app.get("/postagens/:slug",(req, res)=>{
        Postagem.findOne({slug:req.params.slug}).then((postagem)=>{
            if(postagem){
                res.render("postagens/index", {postagem: postagem})
            }
        })
    })

    app.get("/categorias", (req,res)=>{
        Categoria.find().then((categorias)=>{
            res.render("categorias/index", {categoria:categorias})
        }).catch((erro)=>{
            req.flash("error_msg", "Houve um erro interno")
            res.redirect("/")
        })
    })

    app.get("/categorias/:slug", (req, res)=>{
        Categoria.findOne({Slug:req.params.slug}).then((categoria)=>{
            if(categoria){
                Postagem.find({categoria:categoria}).then((postagens)=>{
                    res.render("categorias/postByCat",{categoria:categoria, Postagem:postagens})
                })
            }else{
                req.flash("error_msg","Categoria nao existe!")
                res.redirect("/");
            }
            
        }).catch((error)=>{
            req.flash("error_msg","Categoria nao existe!")
            res.redirect("/");
        })
    })

    app.get("/404", (req, res)=>{
        res.send("Erro 404")
    })
    app.use("/admin", admin)
    app.use("/usuarios", usuarios)

//Outros
    const port = 8081
    app.listen(port,()=>{
        console.log("Servidor Rodando!")
    })