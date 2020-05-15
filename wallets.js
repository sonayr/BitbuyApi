const comms = require('./communication')
/**
 * https://bitbuy.ca/assets/api/docs/#/?id=_1-retrieve-transactions-for-a-specific-coin
 * @param {string} coin - A 3 letter code representing the ISO code for the currency 
 * @param {number} page - A postive integer for which page number
 * @param {number} size - A postive integer for number of returned results
 */
async function coinTransactions(coin,page,size) {
    let path = `/api/v1/wallets/${coin}/transactions`
    query = {
        "page": page == null ? 0 : page,      // default is 0
        "size": size == null ? 100 : size     // default is 100
    }
    return (await comms.get(query,path)).data
}
/**
 * https://bitbuy.ca/assets/api/docs/#/?id=_2-list-balances-for-each-wallet
 */
async function allWalletInfo() {
    let path = `/api/v1/wallets`
    return (await comms.get({}, path)).data
}
/**
 * https://bitbuy.ca/assets/api/docs/#/?id=_3-list-all-available-coins
 */
async function allCoins(){
    let path = `/api/v1/coins`
    return (await comms.get({},path)).data
}

/**
 * https://bitbuy.ca/assets/api/docs/#/?id=_4-generate-a-deposit-address-for-a-specific-coin
 * @param {string} coin - A 3 letter code representing the ISO code for the currency
 */
async function depositAddress(coin){
    let path = `/api/v1/wallets/${coin}/deposit-address`
    return (await comms.get({},path)).data
}

/**
 * https://bitbuy.ca/assets/api/docs/#/?id=_5-withdraw-an-amount-to-the-specified-address
 * @param {string} coin - A 3 letter code representing the ISO code for the currency
 * @param {number} address - Public address of a wallet to withdraw coins from
 * @param {number} amount  - Amount of coins to withdraw
 */
async function withdraw(coin,address,amount) {
    let path = `/api/v1/wallets/${coin}/withdraw`
    let query = {
        "address":address,
        "amount":amount
    }
    return (await comms.post(query,path,null)).data
}

/**
 * https://bitbuy.ca/assets/api/docs/#/?id=_6-the-estimated-fee-for-coin-withdrawal
 * @param {string} coin - A 3 letter code representing the ISO code for the currency
 */
async function withdrawFee(coin) {
    let path = `/api/v1/wallets/${coin}/fee`
    return (await comms.get({},path)).data
}
/**
 * https://bitbuy.ca/assets/api/docs/#/?id=_7-retrieve-transaction-history
 * @param {string} coin - A 3 letter code representing the ISO code for the currency
 * @param {string} type - Default is for all. Options are "DEPOSIT", "WITHDRAWAL", "SELL", "BUY"
 * @param {number} page - A postive integer for which page number
 * @param {number} size - A postive integer for number of returned results
 */
async function transactionHistory(coin,type,page,size) {
    let path = `/api/v1/transaction-history`
    query = {
        "coin":coin,
        "type":type,
        "page":page,
        "size":size
    }
    return (await comms.get(query,path)).data
}


module.exports.coinTransactions = coinTransactions
module.exports.allWalletInfo = allWalletInfo
module.exports.allCoins = allCoins
module.exports.depositAddress = depositAddress
module.exports.withdraw = withdraw
module.exports.withdrawFee = withdrawFee
module.exports.transactionHistory = transactionHistory