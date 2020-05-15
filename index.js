const comms = require("./communication");
const wallet = require("./wallets");
const market = require("./market");
const order = require("./orders");


// async function getMarketInfo() {
//     // rtn = await wallet.allWalletInfo()
//     // rtn = await market.marketList()
//     // rtn = await wallet.coinTransactions("CAD",0,100)
//     let startTime = new Date()
//     startTime = startTime.getTime() - (7*24 * 60 * 60 * 1000)
//     rtn = await market.marketData("BTC-CAD", startTime, new Date().getTime(), 60)
//     fs.appendFile('btc.json',JSON.stringify(rtn),(err)=> {
//         console.log(err)
//     })
// }

// getMarketInfo()
module.exports = { wallet, market, order, "init": comms.init}