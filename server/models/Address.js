const { Model } = require('objection');

class Address extends Model {
    static get tableName() {
        return "address";
    }
}

module.exports = Address;