const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/BlogApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const connection = mongoose.connection;

connection.on("connected", function () {
  console.log("Conectado com Banco de Dados com sucesso");
});


module.exports = mongoose;