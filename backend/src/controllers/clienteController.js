const Falhas = require("../errors/Falhas")
const ClienteModel = require("../models/clienteModel")

async function criarCliente(req, res){
    const nome = req.body.nome
    const cpf = req.body.cpf
    const idade = req.body.idade

    if(!nome){
        throw new Falhas("O Nome não foi enviado")
    }
    if(!cpf){
        throw new Falhas("O CPF não foi enviado")
    }
    if(!idade){
        throw new Falhas("A Idade não foi enviada")
    }

    const clienteExiste = await ClienteModel.findOne({cpf})

    if(clienteExiste){
        throw new Falhas("Este Cliente já é existente")
    }

    const cliente = await ClienteModel.create({nome, cpf, idade})

    return res.status(201).json(cliente)

}

async function pegarCliente(req, res){
    const cpf = req.params.cpf
    if(!cpf){
        throw new Falhas("O CPF não foi enviado")
    }
    const clienteExiste = await ClienteModel.findOne({cpf})
    if (!clienteExiste){
        throw new Falhas("O Cliente não foi encontrado")
       
    }
    return res.status(200).json(clienteExiste)

}

async function atualizarCliente(req, res){
    const cpf = req.params.cpf
    if(!cpf){
        throw new Falhas("O CPF não foi enviado")
    }
    const clienteExiste = await ClienteModel.findOne({cpf})
    if (!clienteExiste){
        throw new Falhas("O Cliente não foi encontrado")
       
    }
    const nome = req.body.nome
    const novoCpf = req.body.cpf
    const idade = req.body.idade

    const cpfExiste = await ClienteModel.findOne({cpf:novoCpf})
    if (cpfExiste){
        throw new Falhas("Este CPF já é existente!")
    }
     
    await ClienteModel.updateOne({cpf},{nome, novoCpf, idade})
    return res.status(200).json({mensagem: "O Cliente foi atualizado com sucesso!"})

}

async function deletarCliente(req, res){
    const cpf = req.params.cpf
    if(!cpf){
        throw new Falhas("O CPF não foi enviado")
    }
    const clienteExiste = await ClienteModel.findOne({cpf})
    if (!clienteExiste){
        throw new Falhas("O Cliente não foi encontrado")
       
    }
  
    await ClienteModel.deleteOne({cpf})
    
    return res.status(200).json({mensagem:"O Cliente foi apagado com suceso!"})

}




module.exports = {
    criarCliente, pegarCliente, atualizarCliente, deletarCliente
}