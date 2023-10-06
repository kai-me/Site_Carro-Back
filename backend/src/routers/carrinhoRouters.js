const{Router} = require("express")
const { adicionarAoCarrinho, pegarCompra, atualizarCompra, deletarCompra } = require("../controllers/carrinhoController")
const carrinhoRouter = Router()

carrinhoRouter.post("/api/carrinho",adicionarAoCarrinho)
carrinhoRouter.get("/api/carrinho/:id",pegarCompra)
carrinhoRouter.put("/api/carrinho/:id",atualizarCompra)
carrinhoRouter.delete("/api/carrinho/:id",deletarCompra)
module.exports = carrinhoRouter