require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const web3 = require('web3');
const mongoose = require('mongoose');
const Wallet = require('../models/wallet')

let log = console.log;


/*
 * DATABASE CONNECTION
 */
log('connecting to mongodb...');
let mongodb = null;
let mongoOPTS = { useNewUrlParser: true, useUnifiedTopology: true };
MongoClient.connect(process.env.MONGO_URL, mongoOPTS, (err, db) => {
    if (err) {
        log('error creating mongodb connection');
        log(err);
    } else {
        log('connected to mongodb');
        mongodb = db;

        /*
         * connection ok, start express server
         */
        launchAPIs();
    }
});


/*
 * EXPRESS SERVER
 */
function launchAPIs() {

    process.env.PORT = process.env.PORT || 5000;

    express()
        .use(express.static(path.join(__dirname, 'public')))
        .use(bodyParser.json())
        .use(bodyParser.urlencoded({ extended: true }))

        /*
         * balances API
         */
        .get('/:address/balances', (req, res) => replyBalances(req.params.address, res))

        /*
         * register API
         */
        .get('/:address/register', (req, res) => register(req.params.address, res))

        /*
         * PORT
         */
        .listen(process.env.PORT, () => log(`Listening on ${process.env.PORT}`));

    log(`APIs UP`);
}

function replyBalances(address, res) {

    log(`getting ${address} balances`);

    mongodb
        .db(process.env.MONGO_DB)
        .collection(process.env.MONGO_COLLECTION_WALLETS)
        .findOne({ address }, (err, data) => {
            if (err) {
                res.send({ success: false, msg: 'could not get balances' });
            } else {
                data != null && delete data._id;
                res.send({ success: true, data });
            }
        });
}

function register(address, res) {
    mongodb
        .db(process.env.MONGO_DB)
        .collection(process.env.MONGO_COLLECTION_WALLETS)
        .updateOne(
            { address },
            {
                $set:
                {
                    address,
                    balances: [{
                        ticker: 'ETH', balance: '1.234'
                    }, {
                        ticker: 'USDT', balance: '1042'
                    }]
                }
            },
            { upsert: true },
            (err, data) => {
                if (err) {
                    log('error while registering');
                    log(err);
                } else {
                    log(`registered ${address}`);
                    res.send({ success: true });
                }
            });
}