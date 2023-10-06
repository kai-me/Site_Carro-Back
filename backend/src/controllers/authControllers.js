const Falhas = require("../errors/Falhas")
const clienteModel = require("../models/clienteModel")
const funcionariosModel = require("../models/funcionariosModel")
const{sign} = require("jsonwebtoken")

async function authControllerFuncionario(req, res){
    const cpf = req.body.cpf
    const senha = req.body.senha

    if(!cpf){
        throw new Falhas("O CPF não foi enviado")
    }
    if(!senha){
        throw new Falhas("A Senha não foi enviada")
    }

    const funcionarioExiste = await funcionariosModel.findOne({cpf})
    

    if(!funcionarioExiste){
        throw new Falhas("Funcionário não encontrado", 401)
    }
    if(funcionarioExiste.senha !== senha){
        throw new Falhas("Funcionário não encontrado", 401)
 
    } 
    const segredo = "Marcelo432"
        const token = sign(
            {
              cpf: cpf,
              senha: senha,
            },
            segredo,
            {
              expiresIn: '7d',
            },
        )
    return res.json({token})
}

async function authControllerCliente(req, res){
    const cpf = req.body.cpf
    const nome = req.body.nome

    if(!cpf){
        throw new Falhas("O CPF não foi enviado")
    }
    if(!nome){
        throw new Falhas("O Nome não foi enviado")
    }

    const clienteExiste = await clienteModel.findOne({nome})

    if(!clienteExiste){
        throw new Falhas("O Cliente não foi encontrado")
    }
    if(!(clienteExiste.cpf === cpf)){
        throw new Falhas("O Cliente não foi encontrado")
        
    } 
    const segredo = "Marcelo432"
    const token = sign(
            {
              cpf: cpf,
              nome: nome,
            },
            segredo,
            {
              expiresIn: '7d',
            },
    )
    return res.status(200).json(token)
}

module.exports = {
    authControllerFuncionario, authControllerCliente
}

