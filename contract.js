'use strict';

const Person = require('./src/models/Person');

class Contract {
    constructor(db) {
        this.db = db;
    }

    addPerson(data) {
        var person = new Person({name: data.personName});
        person.save(function (err) {
            if (err) throw err;
            console.log("User saved succesfully");
        });
    }
}

module.exports = Contract;