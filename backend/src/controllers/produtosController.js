const Falhas = require("../errors/Falhas")
const ProdutosModel = require("../models/produtosModel")

async function cadastrarProduto(req, res) {
    const { nome, tipoProduto, codigo, preco, precoPromocao } = req.body

    if (!nome) {
        throw new Falhas("O Nome não foi enviado", 422)
    }
    if (!codigo) {
        throw new Falhas("O Código não foi enviado", 422)
    }
    if (!tipoProduto) {
        throw new Falhas("O Tipo do Produto não foi enviado", 422)
    }
    if (!preco) {
        throw new Falhas("O Preço do Produto é inválido", 422)
    }
    if (!precoPromocao) {
        throw new Falhas("O Preço da/com a Promoção está inválido", 422)
    }

    const produtoExiste = await ProdutosModel.findOne({ codigo })

    if (produtoExiste) {
        throw new Falhas("Este Produto já é existente!", 409)
    }

    const produto = await ProdutosModel.create({ nome, codigo, tipoProduto, preco, precoPromocao })

    return res.status(201).json(produto)
}

async function pegarProduto(req, res) {
    const { codigo } = req.params
    
    if (!codigo) {
        throw new Falhas("O Código não foi enviado")
    }

    const produtoExiste = await ProdutosModel.findOne({ codigo })

    if (!produtoExiste) {
        throw new Falhas("Este Produto não foi encontrado")
    }

    return res.status(200).json(produtoExiste)
}

async function listarProdutos(req, res) {
    const produtos = await ProdutosModel.find()

    return res.status(200).json(produtos)
}

async function atualizarProduto(req, res) {
    const { codigo } = req.params
    const { nome, novoCodigo, tipoProduto, preco, precoPromocao } = req.body

    if (!codigo) {
        throw new Falhas("O Código não foi enviado")
    }

    const produtoExiste = await ProdutosModel.findOne({ codigo })

    if (!produtoExiste) {
        throw new Falhas("Este Produto não foi encontrado")
    }

    const codigoExiste = await ProdutosModel.findOne({ codigo: novoCodigo })

    if (codigoExiste) {
        throw new Falhas("O Novo código já é existente!")
    }

    await ProdutosModel.updateOne({ codigo }, { nome, codigo: novoCodigo, tipoProduto, preco, precoPromocao })

    const updatedProduto = await ProdutosModel.findOne({ codigo: novoCodigo })

    return res.status(200).json(updatedProduto);
}

async function deletarProduto(req, res) {
    const { codigo } = req.params

    if (!codigo) {
        throw new Falhas("O Código não foi enviado")
    }

    const produtoExiste = await ProdutosModel.findOne({ codigo })

    if (!produtoExiste) {
        throw new Falhas("Este Produto não foi encontrado")
    }

    await ProdutosModel.deleteOne({ codigo })

    return res.status(200).json({ mensagem: "O Produto foi apagado com sucesso!" })
}

module.exports = {
    cadastrarProduto,
    pegarProduto,
    atualizarProduto,
    deletarProduto,
    listarProdutos
}