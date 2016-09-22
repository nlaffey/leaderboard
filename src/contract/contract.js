'use strict';

const Person = require('./../models/Person');

class Contract {

    constructor(db) {
        this.db = db;
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

    find(collec, query, callback) {
        this.db.collection(collec, function (err, collection) {
            collection.find(query).toArray(callback);
        });
    }

    getPlayers(callback) {
        Person.find({}, 'name', function (err, person) {
            if (err) {
                callback(err);
            } else {
                callback(person);
            }

        });
    }

}

module.exports = Contract;