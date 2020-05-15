const comms = require('./communication')

/**
 * https://bitbuy.ca/assets/api/docs/#/?id=_12-submit-a-new-order
 * @param {float} quantity - The number of orders to purchase
 * @param {float} pricePerUnit - Price per unit for Limit
 * @param {string} symbol - Market symbol of type (XXX-YYY)
 * @param {string} orderSide - String of values (BUY,SELL)
 * @param {string} orderType - String of values (MARKET, LIMIT, STOP, STOPLIMIT)
 */
async function submit(quantity,pricePerUnit,symbol,orderSide,orderType) {
    let path = `/api/v1/submit/order`
    data = {
        "quantity": quantity,
        "pricePerUnit":pricePerUnit,
        "marketSymbol":symbol,
        "orderSide":orderSide,
        "orderType":orderType
    }
    return (await comms.post({},path,data)).data
}

/**
 * https://bitbuy.ca/assets/api/docs/#/?id=_13-cancel-order-of-order-id
 * @param {string} orderId - Order Id to cancel
 */
async function cancelOrder(orderId) {
    let path = `/api/v1/orders/${orderId}`
    return (await comms.del({},path))
}

/**
 * https://bitbuy.ca/assets/api/docs/#/?id=_14-cancel-all-open-orders-on-a-specific-market
 * @param {string} symbol - Market symbol of type (XXX-YYY)
 */
async function cancelAllOrders(symbol) {
    let path = `/api/v1/markets/${symbol}/orders`
    return (await comms.del({},path))
}

/**
 * https://bitbuy.ca/assets/api/docs/#/?id=_15-my-open-closed-and-cancelled-orders
 * @param {string} symbol - Market symbol of type (XXX-YYY)
 * @param {string} status - Status to filter on
 * @param {number} page - A postive integer for which page number
 * @param {number} size - A postive integer for number of returned results
 */
async function getOrders(symbol,status,page,size) {
    let path = `/api/v1/my-orders`
    query = {
        "marketSymbol":symbol,
        "status":status,
        "page":page,
        "size":size
    }
    return (await comms.get(query,path)).data
}

/**
 * https://bitbuy.ca/assets/api/docs/#/?id=_16-order-details-for-a-specific-order-id
 * @param {string} symbol - Market symbol of type (XXX-YYY)
 * @param {string} orderId - Order Id to get details
 */
async function orderDetails(symbol,orderId) {
    let path = `/api/v1/single-order`
    query = {
        "marketSymbol":symbol,
        "orderId":orderId
    }
    return (await comms.get(query,path)).data
}

/**
 * https://bitbuy.ca/assets/api/docs/#/?id=_17-order-quote
 * @param {float} quantity - The number of orders to purchase
 * @param {string} symbol - Market symbol of type (XXX-YYY)
 * @param {string} orderSide - Type of order to quote (BUY, SELL)
 */
async function orderQuote(quantity,symbol,orderSide) {
    let path = `/api/v1/quote/trade`
    data = {
        "quantity":quantity,
        "marketSymbol":symbol,
        "orderSide":orderSide
    }
    return (await comms.post({},path,data)).data
}

/**
 * https://bitbuy.ca/assets/api/docs/#/?id=_18-order-quote-for-base-coin
 * @param {float} quantity - The number of orders to purchase
 * @param {string} symbol - Market symbol of type (XXX-YYY)
 * @param {string} orderSide - Type of order to quote (BUY, SELL)
 */
async function orderQuoteBase(quantity, symbol, orderSide) {
    let path = `/api/v1/quote/base`
    data = {
        "quantity": quantity,
        "marketSymbol": symbol,
        "orderSide": orderSide
    }
    console.log(JSON.stringify(data).length)
    return (await comms.post({}, path, data)).data
}

/**
 * https://bitbuy.ca/assets/api/docs/#/?id=_19-buy-order-for-base-coin
 * @param {float} quantity - The number of orders to purchase
 * @param {string} symbol - Market symbol of type (XXX-YYY)
 * @param {string} orderSide - Type of order to quote (BUY, SELL)
 */
async function submitBuyBase(quantity, symbol, orderSide) {
    let path = `/api/v1/order/buy`
    data = {
        "quantity": quantity,
        "marketSymbol": symbol,
        "orderSide": orderSide
    }
    return (await comms.post({}, path, data)).data
}

/**
 * https://bitbuy.ca/assets/api/docs/#/?id=_19-buy-order-for-base-coin
 * @param {float} quantity - The number of orders to purchase
 * @param {string} symbol - Market symbol of type (XXX-YYY)
 * @param {string} orderSide - Type of order to quote (BUY, SELL)
 */
async function submitSellBase(quantity, symbol, orderSide,orderType) {
    let path = `/api/v1/order/sell`
    data = {
        "quantity": quantity,
        "marketSymbol": symbol,
        "orderSide": orderSide,
        "orderType": orderType
    }

    return (await comms.post({}, path, data)).data
}

module.exports.submit = submit
module.exports.cancelOrder = cancelOrder
module.exports.cancelAllOrders = cancelAllOrders
module.exports.getOrders = getOrders
module.exports.orderDetails = orderDetails
module.exports.orderQuote = orderQuote
module.exports.orderQuoteBase = orderQuoteBase
module.exports.submitBuyBase = submitBuyBase
module.exports.submitSellBase = submitSellBase