require('dotenv').config()

const router = require('express').Router();
const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const nodemailer = require('nodemailer');

router.use(cookieParser());


router.get('/users/authenticate', authenticateToken, (req, res) => {
    const user = req.user;
    return res.send({ user });
})


router.get('/users/logout', (req, res) => {
    res.cookie('jwt_token', '');
    return res.status(200).send({message: 'You have logged out.'})
})


router.get('/users/login', authenticateToken, (req, res) => {
    return res.status(200).send({ message: 'You are on the login page' });
})


router.post('/users/login', async (req, res) => {
    const { username, password } = req.body;

    if ( username && password ) {
        const user = await User.query().where({ username }).limit(1);
        const user_entry = user[0];

        if ( !user_entry ) {
            return res.status(404).send({ message: 'User was not found in our system.' });
        }

        bcrypt.compare(password, user_entry.password, async (error, isSame) => {
            if ( error ) {
                return res.status(500).send({ message: error });
            } 
            if ( !isSame ) {
                return res.status(404).send({ message: 'Username or password does not match.' });
            } else {

                const userId = await User.query().select('id').where('username', username);

                const user = { id: userId[0].id, name: username };

                const accessToken = generateAccessToken(user);

                // Attach accessToken to a cookie as "jwt_token"
                res.cookie('jwt_token', accessToken);

                res.status(200).send({ message: "You have successfully logged in!", username: user_entry.username, accessToken: accessToken })
            }

        });
    } else {
        return res.status(404).send({ message: 'Missing username or password.' });
    }
})


router.post('/users/register', (req, res) => {
    const { first_name, last_name, email, username, password, confirmPassword } = req.body;

    if ( first_name && last_name && email && username && password && confirmPassword && password === confirmPassword ) {
        if ( password.length <= 8 ) {
            return res.status(404).send({ response: 'The password is too short.' })
        } else {
            bcrypt.hash(password, saltRounds, async (error, hashedPassword) => {
                if ( error ) {
                    return res.status(500).send({ response: 'error' });
                }
                try {
                    const existingUser = await User.query().select().where({ username: username });

                    if ( existingUser[0] ) {
                        return res.status(404).send({ response: 'This user already exists.' })
                    } else {
                    const newUser = await User.query().insert({
                        first_name,
                        last_name,
                        email,
                        username,
                        password: hashedPassword,
                        is_superuser: 0
                    });
                    return res.status(200).send({ response: 'You have succesfully signed up! Go to login page to login.', user: newUser });
                }
                } catch(error) {
                    return res.status(500).send({ response: error });
                }
            });
        }
    } else if ( password !== confirmPassword ) {
        return res.status(404).send({ response: 'Passwords are not the same.' });
    } else {
        return res.status(404).send({ response: 'Missing fields.' });
    }
})


router.post('/users/requestnewpassword', async (req, res) => {
    const email = req.body.email;
    const emailFromDb = await User.query().select().where('email', email);
    const emailExists = emailFromDb[0] ? true : false;

    if (emailExists) {

        const emailToSendWithToken = { email: email };

        const passwordToken = generateAccessToken(emailToSendWithToken);

        // Implement nodemailer to send a mail to given email address
        async function sendNewPasswordMail(){
            let transporter = nodemailer.createTransport({
                host:   "smtp.gmail.com",
                port:   587,
                secure: false,
                auth: {
                  user: 'staffplannerdk@gmail.com',
                  pass: 'Mackh123'
                }
              });

            let info = await transporter.sendMail({
                from:    '"Staff Planner" <staffplannerdk@gmail.com>',
                to:      email,
                subject: "New Password Request",
                text:    "Here's your new password!",
                html:    `<h3>Hello!</h3>
                         <p>So you've forgotton your password?</p>
                         <p><b>No worries!</b> Click the link below to create a new password for Staff Planner</p>
                         <a href="http://localhost:3000/users/resetpassword/${passwordToken}">http://localhost:3000/users/resetpassword/${passwordToken}</a>`
            });
        }

        sendNewPasswordMail().catch(console.error);

        return res.status(200).send({ message: 'New password request has been made.' })
    } else {
        return res.status(404).send({ message: 'This email is not in our system.' })
    }
})


router.get('/users/resetpassword/:token', (req, res) => {
    const token = req.params.token;

    // Verify if token is valid ||  NOT VALID = 404  ||  VALID = 200
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if ( err ) return res.status(404).send({ message: 'Token is not valid' });
        return res.status(200).send({ message: 'Token is valid' })
    })
})


router.post('/users/resetpassword', (req, res) => {
    const newPassword = req.body.newPassword;
    const confirmNewPassword = req.body.confirmNewPassword;
    const token = req.body.token;
    if ( newPassword === confirmNewPassword ) {

        // Update the password in the database - based on the email from the token - to a new hashed password
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
            if ( err ) {
                return res.status(403).send({ message: 'Something went wrong verifying the email.' });
            } else {
                bcrypt.hash(newPassword, saltRounds, async (error, hashedPassword) => {
                    if (error) {
                        return res.status(404).send({ message: 'Something went wrong.' })
                    }
                    
                    // Update password with new hased password
                    const userEmail = user.email;
                    await User.query().patch({ 'password': hashedPassword }).where('email', userEmail);

                    // Confirmation email
                    async function sendConfirmationMail(){
                        let transporter = nodemailer.createTransport({
                            host:   "smtp.gmail.com",
                            port:   587,
                            secure: false,
                            auth: {
                              user: 'staffplannerdk@gmail.com',
                              pass: 'Mackh123'
                            }
                          });
            
                        let info = await transporter.sendMail({
                            from:    '"Staff Planner" <staffplannerdk@gmail.com>',
                            to:      userEmail,
                            subject: "Your password has been updated!",
                            text:    "Confirmation email",
                            html:    `<h3>New password confirmation</h3>
                                     <p><b>Success!</b> You have successfully updated your password</p>`
                        });
                    }
            
                    sendConfirmationMail().catch(console.error);

                    return res.status(200).send({ message: 'Your password has been updated.' })

                })
            }
        })

    } else {
        return res.status(404).send({ message: 'Passwords are not alike' })
    }
})



//  ****** AUTHENTICATION ******

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60m' })
}

function authenticateToken(req, res, next) {
    const token = req.cookies['jwt_token'];

    if ( token == null ) res.status(401).send({ message: 'You have not logged in.' });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if ( err ) return res.status(403).send({ message: 'You are not logged in at the moment.' });
        req.user = user
        next()
    })
}


module.exports = router;