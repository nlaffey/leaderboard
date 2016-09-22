'use strict';

const Person = require('./../models/Person');

class Contract {

    addPerson(data, cb) {
        var person = new Person({name: data.personName});
        var promise = person.save();

        promise.then(function (response) {
            cb(response);
        }).catch(function (err) {
            cb(err);
        });
    }
}

module.exports = Contract;