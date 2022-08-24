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
    logger.info("Looking for confirmed TX...")
})
