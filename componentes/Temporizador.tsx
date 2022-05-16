import styles from '../styles/Temporizador.module.css'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

interface TemporizadorProps {
    key: any
    tempoEsgotado: () => void
}

export default function Temporizador(props: TemporizadorProps) {

    return(
        <div className={styles.temporizador}>
            <CountdownCircleTimer 
                duration={10}
                size={100}
                isPlaying
                onComplete={props.tempoEsgotado}
                colors={[
                    '#BCE596',
                    '#F7B801',
                    '#ED827A' 
                ]}
                colorsTime={[7,4,0]}
            >
                {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer>
        </div>
    )

}