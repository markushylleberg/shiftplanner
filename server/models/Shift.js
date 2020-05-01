const { Model } = require('objection');

class Shift extends Model {
    static get tableName() {
        return "shift";
    }
}

module.exports = Shift;