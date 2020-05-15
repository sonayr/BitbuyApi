const comms = require("./endpoints/communication");
const wallet = require("./endpoints/wallets");
const market = require("./endpoints/market");
const order = require("./endpoints/orders");

module.exports = { wallet, market, order, "init": comms.init}