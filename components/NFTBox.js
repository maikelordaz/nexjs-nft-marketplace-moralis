import { useState } from "react"
import { useWeb3Contract } from "react-moralis"
import nftMarketplaceAbi from "../constants/NftMarketplace.json"
import nftAbi from "../constants/BasicNft.json"

export default function NFTBox({ price, nftAddress, tokenId, marketplaceAddress, seller }) {
    const [imageURI, setImageURI] = useState("")

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
        // Lo hago con useWeb3Contract que me trae las funciones del contrato
    }
}
