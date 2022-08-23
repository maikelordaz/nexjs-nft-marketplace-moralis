const Moralis = require("moralis/node")
require("dotenv").config()
const contractAddresses = require("./constants/networkMapping.json")

let chainId = process.env.chainId || 31337
const contractAddressArray = contractAddresses[chainId]["NftMarketplace"]
const contractAddress = contractAddressArray[contractAddressArray.length - 1]

async function main() {}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
