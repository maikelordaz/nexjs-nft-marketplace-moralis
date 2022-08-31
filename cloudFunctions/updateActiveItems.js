Moralis.Cloud.afterSave("ItemListed", async (request) => {
    const confirmed = request.object.get("confirmed")
    const logger = Moralis.Cloud.getLogger()
    logger.info("Looking for confirmed TX...")
    if (confirmed) {
        logger.info("Found item!")
        const ActiveItem = Moralis.Object.extend("ActiveItem")
        const query = new Moralis.Query("ActiveItem")
        query.equalTo("marketplaceAddress", request.object.get("address"))
        query.equalTo("nftAddress", request.object.get("nftAddress"))
        query.equalTo("tokenId", request.object.get("tokenId"))
        query.equalTo("seller", request.object.get("seller"))
        logger.info(`Marketplace | Query ${query}`)
        const itemAlreadyListed = await query.first()
        logger.info(`Marketplace | Item Already Listed: ${itemAlreadyListed}`)
        if (itemAlreadyListed) {
            logger.info(`Deleting ${itemAlreadyListed}`)
            await itemAlreadyListed.destroy()
            logger.info(
                `Deleted item with token id: ${request.object.get(
                    "tokenId"
                )} at address: ${request.object.get("address")} since the list has been updated`
            )
        }
        const activeItem = new ActiveItem()
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

Moralis.Cloud.afterSave("ItemCanceled", async (request) => {
    const confirmed = request.object.get("Confirmed")
    const logger = Moralis.Cloud.getLogger()
    logger.info(`Marketplace | Object ${request.object}`)
    if (confirmed) {
        const ActiveItem = Moralis.Object.extend("ActiveItem")
        const query = new Moralis.Query(ActiveItem)
        query.equalTo("marketplaceAddress", request.object.get("address"))
        query.equalTo("nftAddress", request.object.get("nftAddress"))
        query.equalTo("tokenId", request.object.get("tokenId"))
        logger.info(`Marketplace | Query ${query}`)
        const canceledItem = await query.first()
        logger.info(`Marketplace | Canceled Item: ${canceledItem}`)
        if (canceledItem) {
            logger.info(`Deleting ${canceledItem.id}`)
            await canceledItem.destroy()
            logger.info(
                `Deleted item with token id ${request.object.get(
                    "tokenId"
                )} at address ${request.object.get("address")} since it was canceled.`
            )
        } else {
            logger.info(
                `No item canceled with address ${request.object.get(
                    "address"
                )} and token id ${request.object.get("tekenId")} found`
            )
        }
    }
})

Moralis.Cloud.afterSave("ItemBought", async (request) => {
    const confirmed = request.object.get("Confirmed")
    const logger = Moralis.Cloud.getLogger()
    logger.info(`Marketplace | Object ${request.object}`)
    if (confirmed) {
        const ActiveItem = Moralis.Object.extend("ActiveItem")
        const query = new Moralis.Query(ActiveItem)
        query.equalTo("MarketplaceAddress", request.object.get("address"))
        query.equalTo("nftAddress", request.object.get("nftAddress"))
        query.equalTo("tokenId", request.object.get("tokenId"))
        logger.info(`Marketplace | Query ${query}`)
        const boughtItem = await query.first()
        logger.info(`Marquetplace | BoughtItem: ${boughtItem}`)
        if (boughtItem) {
            logger.info(`Deleting ${boughtItem}`)
            await boughtItem.destroy()
            logger.info(
                `Deleted item with token id ${request.object.get(
                    "tokenId"
                )} at address ${request.object.get("address")} since it was bought`
            )
        } else {
            logger.info(
                `No item bought with address ${request.object.get(
                    "address"
                )} and token id ${request.object.get("tokenId")} found`
            )
        }
    }
})
