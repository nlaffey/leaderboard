'use strict';

const Player = require('./../models/Player');
const GameResult = require('./../models/GameResult');
const Promise = require('bluebird');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');


class Contract {

    constructor(dbConnection) {
        this.dbConnection = dbConnection;
    }

    find(collec, query, callback) {
        this.dbConnection.collection(collec, function (err, collection) {
            collection.find(query).toArray(callback);
        });
    }

    getGameResults(callback) {
        return callback(GameResult.find({}).sort({timestamp: -1}).exec());
    }


    calcRatio(win, loss) {
        if (loss == 0) {
            return win;
        }
        if (win == 0) {
            return 0;
        }
        return (win / loss).toFixed(2);
    }

    addGameResults(data, callback) {
        const _this = this;
        const postedPlayers = data.players;

        const playerQuery = Player.find({
            name: {$in: [postedPlayers.winner, postedPlayers.loser]}
        });

        const updatePlayers = playerQuery.then(function (players) {

            // Update both our gameResults and player documents.

            const gameResult = new GameResult();
            const savedDocs = [];

            for (var i = 0; i < players.length; i++) {

                let player = players[i];

                if (player.name === postedPlayers.winner) {
                    gameResult.winner = player.name;
                    player.win += 1;
                }
                else if (player.name === postedPlayers.loser) {
                    gameResult.loser = player.name;
                    player.loss += 1;
                }

                player.ratio = _this.calcRatio(player.win, player.loss);
                savedDocs.push(player.save());
            }

            savedDocs.push(gameResult.save());
            return Promise.all(savedDocs);
        }).catch(function () {
            throw Error('There was a problem updating the game results.');
        });

        callback(updatePlayers);
    }

    addPlayer(data, callback) {
        const player = new Player({name: data.playerName.trim().substring(0, 50)});
        const promise = player.save();
        callback(promise);
    }

    getPlayers(callback) {
        return callback(Player.find({}).sort({win: -1}).exec());
    }

    clearData() {
        this.dbConnection.db.dropCollection('gameresults');
        this.dbConnection.db.dropCollection('players');
    }

}
module.exports = Contract;