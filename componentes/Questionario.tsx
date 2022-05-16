import styles from '../styles/Questionario.module.css'
import QuestaoModel from '../model/questao'
import Questao from './Questao'
import Botao from './Botao'


interface QuestionarioProps{
    questao: QuestaoModel
    ultima: boolean
    questaoRespondida: (questao: QuestaoModel) => void
    irParaProxima: () => void
}

export default function Questionario(props: QuestionarioProps){
    function respostaFornecida(indice: number) {
        if(props.questao.naoRespondida){
            props.questaoRespondida(props.questao.responderCom(indice))
        }
    }
    
    return (
        <div className={styles.questionario}>
            <Questao 
                valor={props.questao}
                respostaFornecida={respostaFornecida}
                tempoEsgotado = {props.irParaProxima}
            />
            <Botao onClick={props.irParaProxima} texto={props.ultima ? 'Finalizar' : 'Próxima'}/>
        </div>
    )

}