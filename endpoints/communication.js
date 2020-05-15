const qs = require('qs')
const axios = require('axios')
const crypto = require('crypto')

const baseEndpoint = "https://partner.bcm.exchange"

var apikey,secret
var isSetupComplete = false


function init (key,secretkey) {
    apikey = key
    secret = secretkey
    isSetupComplete = true
}


async function post(query, path,data) {


    // Add public key and time stamp to data 
    query.apikey = apikey
    query.stamp = new Date().getTime()

    // Make Sig content 
    sigData = {
        "path": path,
        "content-length": data == null ? -1 : JSON.stringify(data).length,
        "query": qs.stringify(query)
    }

    let key = crypto.createHmac("SHA256", secret)
        .update(JSON.stringify(sigData))
        .digest("base64");

    let config = {
        "headers": {
            "Content-Type": "application/json",
            "signature": key
        }
    }

    let url = baseEndpoint + path + '?' + qs.stringify(query)
    return await axios.post(url, data, config)
}

async function get(query,path) {

    // Add public key and time stamp to data 
    query.apikey = apikey
    query.stamp = new Date().getTime()

    // Make Sig content 
    sigData = {
        "path": path,
        "content-length": -1,
        "query": qs.stringify(query)
    }

    let key = crypto.createHmac("SHA256", secret)
        .update(JSON.stringify(sigData))
        .digest("base64");

    let config = {
        "headers": {
            "Content-Type": "application/json",
            "signature": key
        }
    }


    let url = baseEndpoint + path + '?' + qs.stringify(query)
    return await axios.get(url, config).catch(e => {console.error(e)})
}

async function del(query, path) {


    // Add public key and time stamp to data 
    query.apikey = apikey
    query.stamp = new Date().getTime()

    // Make Sig content 
    sigData = {
        "path": path,
        "content-length": data == null ? -1 : data.length,
        "query": qs.stringify(query)
    }

    let key = crypto.createHmac("SHA256", secret)
        .update(JSON.stringify(sigData))
        .digest("base64");

    let config = {
        "headers": {
            "Content-Type": "application/json",
            "signature": key
        }
    }

    let url = baseEndpoint + path + '?' + qs.stringify(query)
    return await axios.delete(url, config)
}

module.exports.post = post;
module.exports.get = get;
module.exports.del = del;
module.exports.init = init;