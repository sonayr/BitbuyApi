const comms = require('./communication')

/**
 * https://bitbuy.ca/assets/api/docs/#/?id=_8-list-of-markets
 * @param {number} page - A postive integer for which page number
 * @param {number} size - A postive integer for number of returned results
 */
async function marketList(page,size) {
    let path = `/api/v1/markets`
    query = {
        "page":page,
        "size":size
    }    
    return (await comms.get(query,path)).data
}
/**
 * https://bitbuy.ca/assets/api/docs/#/?id=_9-data-to-display-on-a-graph
 * @param {string} symbol - Market symbol in the form "XXX-YYY"
 * @param {long} from - Miliseconds to start the query from
 * @param {long} to - Milseconds to end the query
 * @param {string} resolution - Time frame resolution
 */
async function marketData (symbol,from,to,resolution) {
    let path = `/api/v1/market-chart-data`
    from = from.toString().length > 10 ? Math.floor((from/1000)) : from
    to = to.toString().length > 10 ? Math.floor((to/1000)) : to
    let query = {
        "marketSymbol":symbol,
        "from":from,
        "to":to,
        "resolution":resolution
    }    
    return (await comms.get(query,path)).data
}
/**
 * https://bitbuy.ca/assets/api/docs/#/?id=_10-list-of-whole-order-book
 * @param {string} symbol - Market symbol in the form "XXX-YYY"
 */
async function marketOrderBook(symbol) {
    let path = `/api/v1/${symbol}/order-book`
    return (await comms.get({},path)).data
}

/**
 * https://bitbuy.ca/assets/api/docs/#/?id=_11-history-of-order-book
 * @param {string} symbol - Market symbol in the form "XXX-YYY"
 */
async function marketOrderBookHistory(symbol) {
    let path = `/api/v1/${symbol}/order-book-history`
    return (await comms.get({},path)).data
}

module.exports.marketList = marketList
module.exports.marketData = marketData
module.exports.marketOrderBook = marketOrderBook
module.exports.marketOrderBookHistory = marketOrderBookHistory