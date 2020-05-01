const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Setup the database
const { Model } = require('objection');
const Knex = require('knex');
const knexFile = require('./knexfile.js');

const knex = Knex(knexFile.development);

// Give the knex instance to objection 
Model.knex(knex);


// **** Auth Limitater (rate limit)
const rateLimit = require("express-rate-limit");

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5 // limit each IP to 100 requests per windowMs
});
 
app.use('/users/login', authLimiter);
app.use('/users/signup', authLimiter);
app.use('/users/requestnewpassword', authLimiter);
// **** End of auth


const usersRoute = require('./routes/users.js');
const shiftsRoute = require('./routes/shifts.js');

app.use(usersRoute);
app.use(shiftsRoute);

const port = process.env.PORT || 9090;

const server = app.listen(port, (error) => {
    if (error) {
        console.log('Something went wrong with express.')
    }
    console.log('Server is running on port:', server.address().port);
})