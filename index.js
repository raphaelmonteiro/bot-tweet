require('dotenv').config();
var cron = require('node-cron');
var mongoose = require('mongoose');
const { searchNewTweets, sendTweets } = require('./src/services/twiiter');
const { getTimeNow } = require('./src/services/utils');

const Conn = require('./src/config/mongo');

Conn(mongoose);

console.log('running a task every five minutes');

searchNewTweets();
sendTweets();

cron.schedule('*/1 * * * *', () => {
    console.log(`starting getNewTweets... ${getTimeNow(false, true)}`);
    searchNewTweets();
});

cron.schedule('*/1 * * * *', () => {
    console.log(`starting sendTweets... ${getTimeNow(false, true)}`);
    sendTweets();
});

//proximos passos, configurar o servidor e levar messagens(triggers) para o banco. 
//pegar tb as outras mensagens do excel e salvar no banco, criar script para popular o banco