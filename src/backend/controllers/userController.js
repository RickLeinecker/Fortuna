// @flow strict

// Required imports
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
import type {
    $Request,
    $Response,
    NextFunction,
    Middleware,
  } from 'express';

// Model imports
const User = require('../../models/userModel');
const Token = require('../../models/tokenModel');

// Throws an error if this isn't here because of async functions
const regeneratorRuntime = require("regenerator-runtime");
// JWT Secret
const jwtSecret = process.env.JWT_SECRET;

exports.register = async (req: $Request, res: $Response) => {
    // Creates a place where errors that fail validation can accrue.
    const errors = validationResult(req);

    if(!errors.isEmpty()){
            // 400 is a bad request
            return res
                .status(400)
                .json({ errors: errors.array() });
    }

    // Deconstructs request body to assign to user schema fields
    const { userName, email, password } = req.body;

    // Attempts to add User to the database
    try{
        // See if a user already exists with that username.
        let user = await User.findOne({ userName });
        if(user != null) {
            return res
                .status(400)
                .json({ msg: 'A user with that username already exists' });
        }

        // See if a user already exists with that email
        user = await User.findOne({ email });
        if(user != null) {
            return res
                .status(400)
                .json({ msg: 'A user with that email already exists' });
        }

        // Instantiate a new user
        user = new User({
            userName,
            email,
            password
        });

        // Creates salt with 10 rounds(recommended)
        const salt = await bcrypt.genSalt(10);

        // bcrypt hash passwords
        user.password = await bcrypt.hash(password, salt);

        // Save to MongoDB
        await user.save();

        // Create a verification token for this user
        let token = new Token({
            _userId: user.id,
            token: crypto.randomBytes(16).toString('hex')
        });

        // Save verification token to MongoDB
        await token.save();

        // Create nodemailer transport
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        // Set email options
        const mailOptions = {
            from: 'Fortuna Project <no-reply@fortunaproject.com>',
            to: user.email,
            subject: 'Fortuna Account Confirmation Token',
            text: 'Greetings Commander ' + user.userName + '!\n\n' + 
                'Please verify your Fortuna account by clicking the link: \nhttp:\/\/' + 
                req.headers.host + '\/ConfirmEmail\/' + token.token + '.\n'
        };

        // Send confirmation email with token
        await transporter.sendMail(mailOptions);
        res.status(201).json({ msg: 'A verification email has been sent to ' + user.email + '.' });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
}

exports.login = async (req: $Request, res: $Response) => {
    
    // Creates a place where errors that fail validation can accrue.
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        // 400 is a bad request
        return res
            .status(400)
            .json({ errors: errors.array() });
    }

    // Deconstructs request body to use individual input
    const { email, password } = req.body;

    try{
        // See if User exists - might change this to const
        const user = await User.findOne({ email });
        if(user == null){
            return res
                .status(401)
                .json({ msg: 'The email address ' + email + 
                ' is not associated with any account. Double-check your email address and try again.' });
        }

        // Checks if the plaintext password matches the hashed pass form db
        const isMatch = await bcrypt.compare(password, user.password);

        // If the credentials don't match it will return a boolean false
        if (!isMatch) {
            return res
                .status(401)
                .json({ msg: 'Invalid Password. Please try again.' });
        }

        // Checks if the user's email has been verified
        if (!user.isVerified) {
            return res
                .status(401)
                .json({ type: 'email-not-verified', msg: 'Your account has not been verified. ' + 
                'Please check the email associated with this account for your verification token. ' +
                'If your token has expired, feel free to request a new one.' });
        }

        // Login successful. Proceed with JWT Creation
        const payload = {
            user: {
                // Primary key id generated by MongoDB
                id: user.id
            }
        }

        // JWT expires in 4 hours
        jwt.sign(payload, jwtSecret, { expiresIn: 14400 }, (err: Error, token: jwt) => {
            if (err) {
                throw err;
            } 
            res.json({ token });
        });

    } catch(err) {
        console.error(err.message);
        res.status(500).json({ msg:'Server error' });
    }
}

exports.confirmToken = async (req: $Request, res: $Response) => {
    // Creates a place where errors that fail validation can accrue.
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        // 400 is a bad request
        return res
            .status(400)
            .json({ errors: errors.array() });
    }

    try {
        // Find a token if it hasn't expired
        // If it expired, it would have been removed from the DB
        const { email, token } = req.body;

        const dbToken = await Token.findOne({ token: token });
        if (!dbToken) {
            return res
                .status(400)
                .json({ type: 'not-verified',
                msg: 'The token you are using is not a valid token. ' +
                'Check your confirmation email and try again. ' + 
                'Otherwise, your token may have expired.' })
        }

        // If token was found, find the user associated with it
        let user = await User.findOne({ _id: dbToken._userId, email: email });
        if (!user) {
            return res
                .status(400)
                .json({ msg: 'We were unable to find a user for this token. ' +
                'Check your email address and try again.' })
        }
        
        // If user is already verified, what the heck are you doing here?
        if (user.isVerified) {
            return res
                .status(400)
                .json({ type: 'already-verified', 
                msg: 'This user has already been verified.' })
        }

        // Assuming you got past all that nonsense, the user is now made to be verified
        user.isVerified = true;
        await user.save();
        res.status(200).json({ msg: 'The account has been verified. Please log in.' });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg: 'Server Error'});       
    }
}

exports.resendConfirm = async (req: $Request, res: $Response) => {
    // Creates a place where errors that fail validation can accrue.
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        // 400 is a bad request
        return res
            .status(400)
            .json({ errors: errors.array() });
    }

    try {
        // Deconstruct body
        const { email } = req.body;

        // Find a user with this email.
        const user = await User.findOne({ email: email });
        if (!user) {
            return res
                .status(400)
                .json({ msg: 'Unable to find a user with that email.' })
        }

        // If found, check if they are already verified.
        if (user.isVerified) {
            return res
                .status(400)
                .json({ msg: 'This account has been verified. Please log in.' })
        }

        // If user isn't verified, make a new token, save it, and send email.
        let token = new Token({
            _userId: user.id,
            token: crypto.randomBytes(16).toString('hex')
        });

        // Save verification token to MongoDB
        await token.save();

        // Create nodemailer transport
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        // Set email options
        const mailOptions = {
            from: 'Fortuna Project <no-reply@fortunaproject.com>',
            to: user.email,
            subject: 'Fortuna Account Reconfirmation Token',
            text: 'Greetings Commander ' + user.userName + '!\n\n' +
                'We recieved word that you needed to reconfirm your email again.\n' + 
                'Please verify your Fortuna account by clicking the link: \nhttp:\/\/' + 
                req.headers.host + '\/ConfirmEmail\/' + token.token + '.\n'
        };

        // Send confirmation email with token
        await transporter.sendMail(mailOptions);
        res.status(200).json({ msg: 'A verification email has been sent to ' + user.email + '.' });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg: 'Server Error'});
    } 
}

exports.getUser = async (req: $Request, res: $Response) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg: 'Server Error'});
    }
}

exports.getLeaders = async (req: $Request, res: $Response) => {
    // skip and limit determine how many to return and the -1 in the sort if for descending order based on elo
    await User.find({}, ['userName', 'stats.elo'], { skip: 0, limit: 10, sort:{'stats.elo': -1} }, function(err, leaders){
        if(err)
            res.send(err);
        
        res.send(leaders);
    });
}


// FOOT NOTE: this controller uses a try-catch approach to querying as opposed to tankController.js which uses callbacks.
// They in essence serve the same purpose.
