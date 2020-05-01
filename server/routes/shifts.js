const router = require('express').Router();
const Shift = require('../models/Shift.js');
const User = require('../models/User.js');
const UserShift = require('../models/UserShift.js');
const jwt = require('jsonwebtoken');


router.get('/shifts', authenticateToken, (req, res) => {
    Shift.query().then(shifts => {
        res.json(shifts);
    });
})


router.post('/shifts', authenticateToken, async (req, res) => {
    const userId = req.user.id;
    const shiftId = req.body.shiftId;

    // Check if shift is available
    const isShiftAvailable = await Shift.query().select('is_available').findById(shiftId);

    if ( isShiftAvailable.is_available !== 0 ) {
        // Add the chosen shift to the UserShift table.
        await UserShift.query().insert({
            user_id: userId,
            shift_id: shiftId
        })
    
        // Update is_available on given shift on the Shift table 
        await Shift.query().findById(shiftId).patch({ is_available: 0 })
    } else {
        return res.status(404).send({ message: 'Shift is not available anymore.' })
    }

})


router.get('/myshifts', authenticateToken, async (req, res) => {
    const user = req.user;

    const shifts = await Shift.query()
                        .select('*')
                        .innerJoin('user_shift', 'user_shift.shift_id', '=', 'shift.id')
                        .innerJoin('user', 'user.id', '=', 'user_shift.user_id')
                        .where('user_shift.user_id', user.id);

    return res.json(shifts);

})


router.get('/addshift', authenticateTokenAsAdmin, (req, res) => {
    return res.status(200).send({ message: 'You are on the add shift page' });
})


router.post('/addshift', authenticateTokenAsAdmin, async (req, res) => {
    const startDate = req.body.startDateTime;
    const endDate = req.body.endDateTime;

    await Shift.query().insert({
        start_datetime: startDate,
        end_datetime: endDate,
        is_available: 1
    })
    return res.status(200).send({ response: 'New shift has been added' })
})




//  ****** AUTHENTICATION ******

function authenticateToken(req, res, next) {
    const token = req.cookies['jwt_token'];

    if ( token == null ) res.status(401).send({ response: 'You have not logged in.' });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if ( err ) return res.status(403).send({ response: 'You are not logged in at the moment.' });
        req.user = user
        next()
    })
}

function authenticateTokenAsAdmin(req, res, next) {
    const token = req.cookies['jwt_token'];

    if ( token == null ) res.status(401).send({ response: 'You have not logged in.' });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
        if ( err ) return res.status(403).send({ response: 'You are not logged in at the moment.' });
        req.user = user

        const userInDb = await User.query().select().where('is_superuser', '1' ).where('username', req.user.name);

        const isAdmin = userInDb[0] ? true : false;

        if ( isAdmin === false ) return res.status(403).send({ response: 'You need to be an admin to access this page.' });
        req.user = user
        next()
    })
}


module.exports = router;