import { useState, useEffect } from "react"
import { useWeb3Contract, useMoralis } from "react-moralis"
import nftMarketplaceAbi from "../constants/NftMarketplace.json"
import nftAbi from "../constants/BasicNft.json"
import Image from "next/image"
import { Card } from "web3uikit"
import { ethers } from "ethers"

export default function NFTBox({ price, nftAddress, tokenId, marketplaceAddress, seller }) {
    const { isWeb3Enabled } = useMoralis()
    const [imageURI, setImageURI] = useState("")
    const [tokenName, setTokenName] = useState("")
    const [tokeDescription, setTokenDescription] = useState("")

    const { runContractFunction: getTokenURI } = useWeb3Contract({
        abi: nftAbi,
        contractAddress: nftAddress,
        functionName: "tokenURI",
        params: {
            tokenId: tokenId,
        },
    })

    async function updateUI() {
        // 1ro obtengo el token URI
        // 2do usando el token URI y la etiqueta de image, obtengo la imagen
        // Lo hago con useWeb3Contract que me trae las funciones del contrato (escrito antes)
        const tokenURI = await getTokenURI()
        console.log(`The TokenURI is: ${tokenURI}`)
        // Para asegurarme que updateUI() es llamada, la pongo en un useEffect (escrito despues)
        if (tokenURI) {
            /*
             * Aqui voy a convertir la direccion de IPFS en un URL normal para que cualquiera
             * pueda ver la imagen, esto se llama IPFS Gateway. Otra opcion sería renderizar la
             * imagen en mi servidor y llamar al servidor. Para testnet y mainnet debo usar los
             * moralis server hooks
             */
            // Reemplazo "ipfs://" por "https://ipfs.io/ipfs/" en la metadata
            const requestURL = tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/")
            // Espero tener requestURL con await fetch(requestURL) y luego lo convierto a .json
            const tokenURIresponse = await (await fetch(requestURL)).json()
            // Tomo la propiedad image
            const imageURI = tokenURIresponse.image
            // Reemplazo "ipfs://" por "https://ipfs.io/ipfs/" en la imagen
            const imageURI_URL = imageURI.replace("ipfs://", "https://ipfs.io/ipfs/")
            // Seteo lo que necesito
            setImageURI(imageURI_URL)
            setTokenName(tokenURIresponse.name)
            setTokenDescription(tokenURIresponse.description)
        }
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI()
        }
    }, [isWeb3Enabled])

    return (
        <div>
            <div>
                {imageURI ? (
                    <Card title={tokenName} description={tokeDescription}>
                        <div className="p-2">
                            <div className="flex flex-col items-end gap-2">
                                <div>#{tokenId}</div>
                                <div className="italic text-sm">Owned by {seller}</div>
                                <Image
                                    loader={() => imageURI}
                                    src={imageURI}
                                    height="200"
                                    width="200"
                                />
                                <div className="font-bold">
                                    {ethers.utils.formatUnits(price, "ether")} ETH
                                </div>
                            </div>
                        </div>
                    </Card>
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        </div>
    )
}
