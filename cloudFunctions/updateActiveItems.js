/*
 * Voy a crear una nueva table llamada "ActiveItem" a la que voy a añadir items cada vez que los
 * añada al marketplace. Esto es cada vez que ocurra el evento ItemListed. y lo voy a remover de
 * cada vez que sean cancelados
 */

/*
 * No necesito importar esto ya que cada vez que lo añada a Moralis Cloud mi servidor el inyecta
 * Moralis
 * const { default: Moralis } = require("moralis/types")
 */

// Cada vez que ocurra ItemListed voy a ejecutar una funcion asincrona
Moralis.Cloud.afterSave("ItemListed", async (request) => {
    // Los eventos ocurren dos veces, una vez sin confirmar y otra confirmado. Lo quiero confirmado
    const confirmed = request.object.get("confirmed")
    const logger = Moralis.Cloud.getLogger()
    // logger.info() es como un console.log que veo en la pagina de mi servidor de Logs
    logger.info("Looking for confirmed TX...")
    // Si confirmed existe entonces...
    if (confirmed) {
        logger.info("Found item!")
        // Si Active Item existe, tomalo, si no, crealo
        const ActiveItem = Moralis.Object.extend("ActiveItem")
        /* Crea un nuevo elemento en ActiveItem
         * Otra sintaxis seria:
         * activeItem = new Moralis.Query(ActiveItem)
         * */
        const activeItem = new ActiveItem()
        /*
         * Puedo setear cualquier columna que quiera para esta nueva table. Lo hago:
         * tableAsetear.set("nombreDeLaColumna", request.object.get("De donde viene")
         * ejemplo:
         * activeItem.set("marketplaceAddress", request.object.get("address"))
         * Otra sintaxis seria:
         * activeItem.equalTo("marketplaceAddress", request.object.get("address"))
         */
        activeItem.set("marketplaceAddress", request.object.get("address"))
        activeItem.set("nftAddress", request.object.get("nftAddress"))
        activeItem.set("price", request.object.get("price"))
        activeItem.set("tokenId", request.object.get("tokenId"))
        activeItem.set("seller", request.object.get("seller"))
        logger.info(
            `Adding Address: ${request.object.get("address")} TokenId: ${request.object.get(
                "tokenId"
            )}`
        )
        logger.info("Saving...")
        await activeItem.save()
    }
})
