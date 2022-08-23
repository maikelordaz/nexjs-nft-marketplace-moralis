import Image from "next/image"
import styles from "../styles/Home.module.css"

export default function Home() {
    /*
     * ¿Como mostramos la lista de los NFT?
     * Indexaremos los eventos off-chain y los leeremos de nuestra base de datos
     * Acomodaremos un servidor que escuche cuando se ejecuten estos eventos y los añadiremos
     * a nuestra base de datos para buscar en ella. Asi no tenemos que modificar nuestro contrato/
     * protocolo para adaptarlo a nuestra pagina.
     * Esto puede ser
     * Centralizado -> usando Moralis
     * Descentralizado -> usando The Graph.
     * En este ejemplo se usa Moralis. Aunque añadamos este componente centralizado, nuestra logica
     * sigue siende descentralizada
     * Los protocolos centralizados como Moralis, OpenSea, Etherscan, Coinmarket, Pinata, nos ayudan
     * para hacer mas rapidos nuestras respuestas
     */
    return <div className={styles.container}>Hi!</div>
}
