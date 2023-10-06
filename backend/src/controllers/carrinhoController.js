const Falhas = require("../errors/Falhas")
const CarrinhoModel = require("../models/carrinhoModel")

async function adicionarAoCarrinho(req, res){
    const produto = req.body.produto
    const cliente = req.body.cliente

    if(!produto){
        throw new Falhas("O Produto não foi enviado")
    }
    if(!cliente){
        throw new Falhas("O Cliente não foi enviado")
    }

    const carrinho = await CarrinhoModel.create({produto, cliente})

    return res.status(201).json(carrinho)

}

async function pegarCompra(req, res){
    const id = req.params.id
    if(!id){
        throw new Falhas("O Id não foi enviado")
    }
    const compraExiste = await CarrinhoModel.findOne({_id: id})
    if (!compraExiste){
        throw new Falhas("A Compra não encontrada")
       
    }
    return res.status(200).json(compraExiste)

}

async function atualizarCompra(req, res){
    const id = req.params.id
    if(!id){
        throw new Falhas("O ID não foi enviado")
    }
    const compraExiste = await CarrinhoModel.findOne({_id: id})
    if (!compraExiste){
        throw new Falhas("A Compra não encontrada")
       
    }
    const produto = req.body.produto
    const cliente = req.body.cliente
     
    await CarrinhoModel.updateOne({_id: id},{produto, cliente})
    return res.status(200).json({mensagem: "O Carrinho foi atualizado com sucesso!"})

}

async function deletarCompra(req, res){
    const id = req.params.id
    if(!id){
        throw new Falhas("A Compra não foi enviado")
    }
    const compraExiste = await CarrinhoModel.findOne({_id: id})
    if (!compraExiste){
        throw new Falhas("A Compra não foi encontrado")
       
    }
  
    await CarrinhoModel.deleteOne({_id: id})
    
    return res.status(200).json({mensagem:"A Compra foi deletada com sucesso!"})

}




module.exports = {
    adicionarAoCarrinho, pegarCompra, atualizarCompra, deletarCompra
}