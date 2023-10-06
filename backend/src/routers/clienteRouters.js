const{Router} = require("express")
const { criarCliente, pegarCliente, atualizarCliente, deletarCliente } = require("../controllers/clienteController")
const clienteRouter = Router()

clienteRouter.post("/api/clientes",criarCliente)
clienteRouter.get("/api/clientes/:cpf",pegarCliente)
clienteRouter.put("/api/clientes/:cpf",atualizarCliente)
clienteRouter.delete("/api/clientes/:cpf",deletarCliente)
module.exports = clienteRouter