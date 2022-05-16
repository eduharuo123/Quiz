import { useRouter } from 'next/router' 
import { useEffect, useState } from 'react'
import Questionario from '../componentes/Questionario'
import QuestaoModel from '../model/questao'
import RespostasModel from '../model/respostas'
import styles from '../styles/Home.module.css'


const questaoTeste = new QuestaoModel(1, 'Melhor cor?', [
  RespostasModel.errada('Verde'),
  RespostasModel.errada('Vermelha'),
  RespostasModel.errada('Azul'),
  RespostasModel.certa('Preto'),

])

const Base_Url = 'http://localhost:3000/api'

export default function Home() {
const router = useRouter()

  const [questao, setQuestao] = useState<QuestaoModel>(questaoTeste)
  const [respostasCertas, setRespostasCerta] = useState(0)
  const [idsDasQuestoes, setIdsDasQuestoes] = useState<number[]>([])

  async function carregarIdsQuestoes() {
    const resposta = await fetch(`${Base_Url}/questoesId`)
    const idsDasQuestoes = await resposta.json()
    setIdsDasQuestoes(idsDasQuestoes)
  }

  async function carregarQuestao(idQuestao: number){
    const resposta = await fetch(`${Base_Url}/questoes/${idQuestao}`)
    const questaoInfo = await resposta.json()
    const novaQuestao = QuestaoModel.criarUsandoObjeto(questaoInfo)
    setQuestao(novaQuestao)

  }

  useEffect(() => {
    carregarIdsQuestoes()
  }, [])

  useEffect(() => {
    idsDasQuestoes.length > 0 && carregarQuestao(idsDasQuestoes[0])
  }, [idsDasQuestoes])


  function questaoRespondida(questaoRespondida: QuestaoModel){
    setQuestao(questaoRespondida)
    const acertou = questaoRespondida.acertou
    console.log(acertou)
    setRespostasCerta(respostasCertas + (acertou ? 1 : 0))
    console.log(respostasCertas + (acertou ? 1 : 0))
  }

  function tempoEsgotado(){
    if(questao.naoRespondida) {
      setQuestao(questao.responderCom(-1))
    }
  }

  function idProximaPergunta(){
    const proximoIndice = idsDasQuestoes.indexOf(questao.id) + 1
    return idsDasQuestoes[proximoIndice]      
  }

  function irPraProximoPasso(){
    const proximoId = idProximaPergunta()
    proximoId ? irPraProximaQuestao(proximoId) : finalizar()
  }

  function irPraProximaQuestao(proximoId: number) {
    carregarQuestao(proximoId)
  }



  function finalizar(){
    router.push({
      pathname: "/Resultado",
      query: {
      total: idsDasQuestoes.length,
      certas: respostasCertas
      }
    })
  }

  return (
    <div className={styles.container} style={{
      display: 'flex',
      flexDirection:'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}> {
      questao ? 
        <Questionario 
          questao={questao}
          ultima={idProximaPergunta() === undefined}
          questaoRespondida={questaoRespondida}
          irParaProxima={irPraProximoPasso}
        /> : false

    }
      
    </div>
  )
}
