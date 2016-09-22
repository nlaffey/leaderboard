'use strict';

const Person = require('./../models/Person');

class Contract {

    constructor(db) {
        this.db = db;
    }

    find(collec, query, callback) {
        this.db.collection(collec, function (err, collection) {
            collection.find(query).toArray(callback);
        });
    }

    addPlayer(data, callback) {
        var person = new Person({name: data.personName});
        var promise = person.save();

        promise.then(function (response) {
            callback(response);
        }).catch(function (err) {
            callback(err);
        });
    }

    getPlayers(callback) {
        Person.find({}, 'name', function (err, docs) {
            // TODO: Error handling
            if (err) {
                callback(err);
            } else {
                callback(docs);
            }

        });
    }

    getNameSuggestion(name, callback) {
        Person.find({"name": {"$regex": name, "$options": "i"}}, function (err, docs) {
            // TODO: Error handling
            if (err) {
                callback(err);
            } else {
                callback(docs);
            }
        });
    }

}

module.exports = Contract;