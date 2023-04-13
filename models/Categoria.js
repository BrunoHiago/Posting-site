const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Categoria = new Schema({
    Nome:{
        type: String,
        require: true
    },
    Slug:{
        type: String,
        require: true
    },
    Data:{
        type: Date,
        default: Date.now()
    }
})

mongoose.model("categorias", Categoria)