const{Router} = require("express")
const { criarFuncionario, pegarFuncionario, atualizarFuncionario, deletarFuncionario } = require("../controllers/funcionariosController")
const { isAuthenticate } = require("../mddlewares/isAuthenticate")
const funcionarioRouter = Router()

funcionarioRouter.post("/api/funcionarios",criarFuncionario)
funcionarioRouter.get("/api/funcionarios", isAuthenticate, pegarFuncionario)
funcionarioRouter.put("/api/funcionarios/:cpf",atualizarFuncionario)
funcionarioRouter.delete("/api/funcionarios/:cpf",deletarFuncionario)
module.exports = funcionarioRouter