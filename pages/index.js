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
import Image from "next/image"
import styles from "../styles/Home.module.css"
import { useMoralisQuery, useMoralis } from "react-moralis"
import NFTBox from "../components/NFTBox"

export default function Home() {
    /*
     * useMoralisQuery devuelve {data, error, isFetching}, voy a usar data y la renombrare
     * listedNfts y isFetching: fetchingListedNfts. Los argumentos que le doy a useMoralisQuery
     * son el TableName y la funcion a buscar o hacerle query. Entonces dire, toma de nuestra
     * base de datos los primeros 10 y ordenalos de forma descendente ordenandolos segun el
     * tokenId
     */
    const { isWeb3Enabled } = useMoralis()
    const { data: listedNfts, isFetching: fetchingListedNfts } = useMoralisQuery(
        "ActiveItem",
        (query) => query.limit(10).descending("tokenId")
    )
    console.log(listedNfts)

    return (
        <div className="container mx-auto">
            <h1 className="py-4 px-4 font-bold text-2xl">Recently Listed</h1>
            <div className="flex flex-wrap">
                {isWeb3Enabled ? (
                    fetchingListedNfts ? (
                        <div>Loading...</div>
                    ) : (
                        listedNfts.map((nft) => {
                            console.log(nft.attributes)
                            const { price, nftAddress, tokenId, marketplaceAddress, seller } =
                                nft.attributes
                            return (
                                <div>
                                    <NFTBox
                                        price={price}
                                        nftAddress={nftAddress}
                                        tokenId={tokenId}
                                        marketplaceAddress={marketplaceAddress}
                                        seller={seller}
                                        key={`${nftAddress}${tokenId}`}
                                    />
                                </div>
                            )
                        })
                    )
                ) : (
                    <div>Web3 Currently Not Enabled</div>
                )}
            </div>
        </div>
    )
}
