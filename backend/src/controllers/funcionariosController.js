const Falhas = require("../errors/Falhas")
const FuncionarioModel = require("../models/funcionariosModel")

async function criarFuncionario(req, res){
    const nome = req.body.nome
    const cpf = req.body.cpf
    const senha = req.body.senha
    const idade = req.body.idade
    const email = req.body.email

    if(!nome){
        throw new Falhas("O Nome não foi enviado")
    }
    if(!cpf){
        throw new Falhas("O CPF não foi enviado")
    }
    if(!idade){
        throw new Falhas("A Idade não foi enviada")
    }
    if(!senha){
        throw new Falhas("Esta Senha é inválida")
    }
    if(!email){
        throw new Falhas("Este Email é inválido")
    }

    const funcionarioPorCpf = await FuncionarioModel.findOne({cpf})
    const funcionarioPorEmail = await FuncionarioModel.findOne({email})
    
    if(funcionarioPorCpf){
        throw new Falhas("Este Funcionário já é existente",409)
    }
    
    if(funcionarioPorEmail){
        throw new Falhas("Este Funcionário já é existente",409)
    }
    
    const funcionario = await FuncionarioModel.create({nome, cpf, senha, idade, email})

    return res.status(201).json(funcionario)

}

async function pegarFuncionario(req, res){
    const cpf = req.cpf
    if(!cpf){
        throw new Falhas("O CPF não foi enviado")
    }
    const funcionarioExiste = await FuncionarioModel.findOne({cpf})
    if (!funcionarioExiste){
        throw new Falhas("Este Funcionário não foi encontrado", 401)
       
    }
    return res.status(200).json(funcionarioExiste)

}

async function atualizarFuncionario(req, res){
    const cpf = req.params.cpf
    if(!cpf){
        throw new Falhas("O CPF não foi enviado")
    }
    const funcionarioExiste = await FuncionarioModel.findOne({cpf})
    if (!funcionarioExiste){
        throw new Falhas("Este Funcionário não foi encontrado", 401)
       
    }
    const nome = req.body.nome
    const novoCpf = req.body.cpf
    const senha = req.body.senha
    const idade = req.body.idade

    const cpfExiste = await FuncionarioModel.findOne({cpf:novoCpf})
    if (cpfExiste){
        throw new Falhas("Este CPF já é existente!")
    }
     
    await FuncionarioModel.updateOne({cpf},{nome, cpf:novoCpf, senha, idade})
    return res.status(200).json({mensagem: "O Funcionario foi atualizado com sucesso!"})

}

async function deletarFuncionario(req, res){
    const cpf = req.params.cpf
    if(!cpf){
        throw new Falhas("O CPF não foi enviado")
    }
    const funcionarioExiste = await FuncionarioModel.findOne({cpf})
    if (!funcionarioExiste){
        throw new Falhas("O Funcionário não foi encontrado")
       
    }
  
    await FuncionarioModel.deleteOne({cpf})
    
    return res.status(200).json({mensagem:"O Funcionário foi apagado com sucesso!"})

}




module.exports = {
    criarFuncionario, pegarFuncionario, atualizarFuncionario, deletarFuncionario
}