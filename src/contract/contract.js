'use strict';

const Person = require('./../models/Person');
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


    addGameResults(data, callback) {
        var players = data.players;
        var getDocPromises = [];
        var saveDocPromises = [];

        for (var i = 0; i < players.length; i++) {
            let name = players[i].name;
            var query = Person.findOne({name: name});
            getDocPromises.push(query);
        }

        // Process all getDocument querys
        Promise.all(getDocPromises).spread(function () {
            var gameResults = new GameResults();

            for (var i = 0; i < arguments.length; i++) {
                let doc = arguments[i];
                let result = players[i].result;

                if (result == 'W') {
                    gameResults.winners.push(doc._id);
                    doc.win += 1;
                }
                else if (result == 'L') {
                    gameResults.losers.push(doc._id);
                    doc.loss += 1;
                }

                saveDocPromises.push(doc.save());
            }

            saveDocPromises.push(gameResults.save());

            Promise.all(saveDocPromises).spread(function () {
                callback(arguments);
            });
        });


    }

    addPlayer(data, callback) {
        var person = new Person({name: data.personName});
        var promise = person.save();
        callback(promise);
    }

    getPlayers(callback) {
        return callback(Person.find({}, 'name').exec());
    }

}
module.exports = Contract;