import styles from '../styles/Enunciado.module.css'

interface enunciadoProps {
    texto: string
}

export default function Enunciado(props: enunciadoProps){
    return(
        <div className={styles.enunciado}>
            <div className={styles.texto}>
                {props.texto}
            </div>
        </div>
    )
}