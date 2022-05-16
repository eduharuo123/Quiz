import questoes from '../bancoDeQuestoes'

export default function handler(req, res) {
    const idSelecionado = +req.query.id
    
    const questaoEncontrada = questoes.filter(questao => questao.id === idSelecionado)

    if(questaoEncontrada.length === 1){
        const questao = questaoEncontrada[0].embaralharRespostas()
        res.status(200).json(questao.paraObjeto())
    } else {
        res.status(204).send()
    }
        
  }
  