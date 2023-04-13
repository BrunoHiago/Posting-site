const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/Categoria")
const Categoria = mongoose.model("categorias")
require("../models/Postagem")
const Postagem = mongoose.model("postagens")
const {isAdmin} = require("../helpers/isAdmin")

router.get("/", isAdmin, (req,res)=>{
    res.render("admin/index")
})

router.get("/post", isAdmin,(req, res)=>{
    res.send("Pagina de Posts")
})

router.get("/categoria", isAdmin,(req, res)=>{
    Categoria.find().sort({Data: "desc"}).then((categorias)=>{
        res.render("admin/categoria",{categorias: categorias})
    }).catch((error)=>{
        req.flash("error_msg","Houve falha ao carregar as categorias!")
    })
    
})

router.get("/categoria/add", isAdmin,(req, res)=>{
    res.render("admin/addcategoria")
})

router.post("/categoria/nova", isAdmin,(req, res)=>{

    var erros = []

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: "Nome Invalido"})
    }

    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
        erros.push({texto: "Slug Invalido"})
    }

    if(req.body.nome.length < 2){
        erros.push({texto: "Nome da categoria é muito pequeno"})
    }

    if(erros.length > 0){
        res.render("admin/addcategoria", {erros: erros})
    }else{
        const novaCategoria = {
            Nome: req.body.nome,
            Slug: req.body.slug
        }
    
        new Categoria(novaCategoria).save().then(()=>{
            req.flash("success_msg", "Categoria criada com sucesso!")
            res.redirect("/admin/categoria")
            
        }).catch((erro)=>{
            req.flash("error_msg", "Houve um erro na criação da categoria!")
            res.redirect("/admin")
        })
    }  
})

router.get("/categoria/edit/:id", isAdmin, (req, res)=>{
    Categoria.findById({_id:req.params.id}).then((categoria)=>{
        res.render("admin/editcategoria",{categoria: categoria})
    }).catch((error)=>{
        req.flash("error_msg", "Categoria não existe!")
        res.redirect("/admin/categoria")
    })  
})

router.post("/categoria/edit", isAdmin, (req, res)=>{
    Categoria.findOne({_id:req.body.id}).then((categoria)=>{
        var erros = []

        if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
            erros.push({texto: "Nome Invalido"})
        }

        if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
            erros.push({texto: "Slug Invalido"})
        }

        if(req.body.nome.length < 2){
            erros.push({texto: "Nome da categoria é muito pequeno"})
        }

        if(erros.length > 0){
            res.render("admin/editcategoria", {erros: erros})
        }else{
            
            categoria.Nome = req.body.nome
            categoria.Slug = req.body.slug

            categoria.save().then(()=>{
                req.flash("success_msg", "Categoria criada com sucesso!")
                res.redirect("/admin/categoria")
                
            }).catch((erro)=>{
                req.flash("error_msg", "Houve !")
                res.redirect("/admin")
            })
        } 
    })
})

router.post("/categoria/deletar", isAdmin,(req, res)=>{
    Categoria.findByIdAndRemove({_id:req.body.id}).then(()=>{
        req.flash("success_msg", "Categoria removida com sucesso!")
        res.redirect("/admin/categoria")
    }).catch((error)=>{
        req.flash("error_msg", "Erro na remoção da categoria!")
        res.redirect("/admin/categoria")
    })
})

router.get("/postagens", isAdmin,(req, res)=>{
    Postagem.find().populate("categoria").sort({data: "desc"}).then((postagens)=>{
        res.render("admin/postagens", {postagens: postagens})
    }).catch((error)=>{
        req.flash("error_msg", "Houve um erro em carregar as postagens!")
        res.redirect("/admin")
    })
    
})

router.get("/postagens/add", isAdmin,(req, res)=>{
    Categoria.find().then((categorias)=>{
        res.render("admin/addpostagem", {categorias: categorias})
    }).catch((error)=>{
        req.flash("error_msg", "Erro em carregar as postagens")
        res.redirect("/admin/postagens")
    })
    
})

router.post("/postagens/nova", isAdmin,(req,res)=>{
    var erros = []

    if(req.body.titulo.length < 2){
        erros.push({texto: "Nome da categoria é muito pequeno"})
    }

    if(req.body.categoria == 0){
        erros.push({texto: "Categoria Invalida, registre uma categoria!"})
    }

    if(erros.length > 0){
        res.render("admin/addpostagem", {erros: erros})
    }else{
        const novaPostagem = {
            titulo: req.body.titulo,
            slug: req.body.slug,
            descricao: req.body.descricao,
            conteudo: req.body.conteudo,
            categoria: req.body.categoria
        }
    
        new Postagem(novaPostagem).save().then(()=>{
            req.flash("success_msg", "Postagem criada com sucesso!")
            res.redirect("/admin/postagens")
            
        }).catch((erro)=>{
            req.flash("error_msg", "Houve um erro na criação da postagem!")
            res.redirect("/admin")
        })
    }  
})

router.get("/postagens/edit/:id", isAdmin,(req, res)=>{
    Postagem.findOne({_id: req.params.id}).then((postagens)=>{
        Categoria.find().then((categoria)=>{
            res.render("admin/editpostagem", {categorias: categoria, postagens: postagens})
        }).catch((erro)=>{
            req.flash("error_msg", "Categoria nao existe")
            res.redirect("/postagens")
        })
    }).catch((error)=>{
        req.flash("error_msg", "Postagem nao existe")
            res.redirect("/admin/postagens")
    })
})

router.post("/postagens/edit", isAdmin,(req, res)=>{
   
    Postagem.findOne({_id:req.body.id}).then((postagem)=>{
        var erros = []

        if(req.body.titulo.length < 2){
            erros.push({texto: "Nome da categoria é muito pequeno"})
        }

        if(req.body.categoria == 0){
            erros.push({texto: "Categoria Invalida, registre uma categoria!"})
        }

        if(erros.length > 0){
            res.render("admin/addpostagem", {erros: erros})
        }else{
            
            postagem.titulo = req.body.titulo,
            postagem.slug = req.body.slug,
            postagem.descricao = req.body.descricao,
            postagem.conteudo = req.body.conteudo,
            postagem.categoria = req.body.categoria
            
        
            postagem.save().then(()=>{
                req.flash("success_msg", "Postagem editada com sucesso!")
                res.redirect("/admin/postagens")
                
            }).catch((erro)=>{
                req.flash("error_msg", "Houve um erro na edição da postagem!")
                res.redirect("/admin")
            })
        }  
    })
    
})

router.get("/postagens/deletar/:id", isAdmin,(req, res)=>{
    Postagem.findByIdAndRemove({_id:req.params.id}).then(()=>{
        req.flash("success_msg", "Postagem removida com sucesso!")
        res.redirect("/admin/postagens")
    }).catch((error)=>{
        req.flash("error_msg", "Erro na remoção da postagem!")
        res.redirect("/admin/postagens")
    })
})

module.exports = router