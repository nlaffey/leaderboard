'use strict';

const Player = require('./../models/Player');
const GameResults = require('./../models/GameResult');
const Promise = require('bluebird');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');


class Contract {

    constructor(db) {
        this.db = db;
    }

    find(collec, query, callback) {
        this.db.collection(collec, function (err, collection) {
            collection.find(query).toArray(callback);
        });
    }

    getGameResults(callback) {
        return callback(GameResults.find({}).exec());
    }


    calcRatio(win, loss) {
        if (loss == 0) {
            return win;
        }
        if (win == 0) {
            return 0;
        }
        return win / loss;
    }

    addGameResults(data, callback) {
        var _this = this;
        var players = data.players;
        var getDocPromises = [];
        var saveDocPromises = [];

        for (var i = 0; i < players.length; i++) {
            let name = players[i].name;
            var query = Player.findOne({name: name});
            getDocPromises.push(query);
        }

        // Process all getDocument querys
        Promise.all(getDocPromises).spread(function () {
            var gameResults = new GameResults();

            for (var i = 0; i < arguments.length; i++) {
                let doc = arguments[i];
                let result = players[i].result;
                if (result == 'W') {
                    gameResults.winners.push(doc.name);
                    doc.win += 1;
                }
                else if (result == 'L') {
                    gameResults.losers.push(doc.name);
                    doc.loss += 1;
                }

                doc.ratio = _this.calcRatio(doc.win, doc.loss);

                saveDocPromises.push(doc.save());
            }

            saveDocPromises.push(gameResults.save());

            Promise.all(saveDocPromises).spread(function () {
                callback(arguments);
            });
        });


    }

    addPlayer(data, callback) {
        var player = new Player({name: data.playerName});
        var promise = player.save();
        callback(promise);
    }

    getPlayers(callback) {
        return callback(Player.find({}).exec());
    }

}
module.exports = Contract;