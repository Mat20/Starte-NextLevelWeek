const express = require("express");
const server = express()

// pegar o banco de dados
const db = require("./database/db")

// config pasta publica
server.use(express.static("public"))

// utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
  express: server,  
  noCache: true
})

// configurar caminhos da minha aplicação
// pagina inicial
// Require: Requisição
// Response: Resposta
server.get("/", (req, res) => {
  return res.render("index.html", { title: "Seu marketplace de coleta de residuos" })
})

server.get("/create-point", (req, res) => {
  return res.render("create-point.html")
})

server.get("/search", (req, res) => {
  //pega os dados do banco de dados
  db.all(`SELECT * FROM places`, function(err, rows) {
    if(err) {
      return console.log(err)
    }

    const total = rows.length

    //console.log("Aqui estão seus registros: ")
    //console.log(rows)
    
    // mostrar a pagina html com os dados  banco de dados
    return res.render("search-results.html", { places: rows, total: total })
  })
})

// ligar o servidor
server.listen(3000)