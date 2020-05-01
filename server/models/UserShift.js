const { Model } = require('objection');

class UserShift extends Model {
    static get tableName() {
        return "user_shift";
    }
}

module.exports = UserShift;