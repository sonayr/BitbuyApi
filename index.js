const comms = require("./communication");
const wallet = require("./wallets");
const market = require("./market");
const order = require("./orders");

module.exports = { wallet, market, order, "init": comms.init}