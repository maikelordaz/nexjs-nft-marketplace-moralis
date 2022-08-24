const Moralis = require("moralis/node")
require("dotenv").config()
const contractAddresses = require("./constants/networkMapping.json")

let chainId = process.env.chainId || 31337
// Esto es porque si estoy en localhost moralis toma la chain ID como "1337" en vez de "31337"
let moralisChainId = chainId == "31337" ? "1337" : chainId
/*
const contractAddressArray = contractAddresses[chainId]["NftMarketplace"]
const contractAddress = contractAddressArray[contractAddressArray.length - 1]
*/
const contractAddress = contractAddresses[chainId]["NftMarketplace"][0]
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL
const appId = process.env.NEXT_PUBLIC_APP_ID
const masterKey = process.env.masterKey

async function main() {
    await Moralis.start({ serverUrl, appId, masterKey })
    console.log(`Working with contract at: ${contractAddress}`)
    // Primero doy datos de cada evento
    // Este es el evento itmListed de mi contrato
    let itemListedOptions = {
        chainId: moralisChainId,
        sync_historical: true,
        //topic: Este es el nombre del evento y el tipo de cada argumento
        topic: "ItemListed(address,address,uint256,uint256",
        /*
         *abi: Este es el abi solo del evento. Lo tomo de mi backend en:
         * artifacts/contracts/NftMarketplace.sol/NftMarketplace.json
         * Busco mi evento por su nombre con ctrl + F y me aseguro de tomar todo el elemento
         * El nombre queda de ultimo entonces me fijo para arriba
         *
         */
        address: contractAddress,
        abi: {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: "address",
                    name: "seller",
                    type: "address",
                },
                {
                    indexed: true,
                    internalType: "address",
                    name: "nftAddress",
                    type: "address",
                },
                {
                    indexed: true,
                    internalType: "uint256",
                    name: "tokenId",
                    type: "uint256",
                },
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "price",
                    type: "uint256",
                },
            ],
            name: "ItemListed",
            type: "event",
        },
        // tableName: será el nombre que vea en la pagina de Moralis cuando aparezca el evento
        tableName: "ItemListed",
    }

    let itemBoughtOptions = {
        chainId: moralisChainId,
        sync_historical: true,
        address: contractAddress,
        topic: "ItemBought(address,address,uint256,uint256)",
        abi: {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: "address",
                    name: "buyer",
                    type: "address",
                },
                {
                    indexed: true,
                    internalType: "address",
                    name: "nftAddress",
                    type: "address",
                },
                {
                    indexed: true,
                    internalType: "uint256",
                    name: "tokenId",
                    type: "uint256",
                },
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "price",
                    type: "uint256",
                },
            ],
            name: "ItemBought",
            type: "event",
        },
        tableName: "ItemBought",
    }

    let itemCanceledOptions = {
        chainId: moralisChainId,
        sync_historical: true,
        address: contractAddress,
        topic: "ItemCanceled(address,address,uint256)",
        abi: {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: "address",
                    name: "seller",
                    type: "address",
                },
                {
                    indexed: true,
                    internalType: "address",
                    name: "nftAddress",
                    type: "address",
                },
                {
                    indexed: true,
                    internalType: "uint256",
                    name: "tokenId",
                    type: "uint256",
                },
            ],
            name: "ItemCanceled",
            type: "event",
        },
        tableName: "ItemCanceled",
    }

    // Cuando ya tengo los datos de cada evento declaro variables para las respuestas de estos

    const listedResponse = await Moralis.Cloud.run("watchContractEvent", itemListedOptions, {
        useMasterKey: true,
    })
    const boughtResponse = await Moralis.Cloud.run("watchContractEvent", itemBoughtOptions, {
        useMasterKey: true,
    })
    const canceledResponse = await Moralis.Cloud.run("watchContractEvent", itemCanceledOptions, {
        useMasterKey: true,
    })

    // Con las anteriores se hace llamada a la api y deberia ser exitosa.
    // Para asegurarme de que paso hago el siguiente if-else

    if (listedResponse.success && boughtResponse.success && canceledResponse.success) {
        console.log(
            "--------------- Success! Database updated with watching events ---------------"
        )
    } else {
        console.log("--------------- Something went wrong... ---------------")
    }
}

/*
 * Para finalizar en el terminal corro el comando "node addEvents.js"
 * Si todo esta bien deberia darme el mensaje de Success
 * Si algo va mal me da el otro mensaje. Pero da error cuando un evento ya esta en mi dashboard
 * en Moralis entonces puedo ir a ver alla si todo esta bien
 * Al lograrlo quiere decir que la base de datos de Moralis esta escuchando al nodo local de mi
 * BlockChain
 */

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
