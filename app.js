const express = require("express");
const app = express();
// const LocalStrategy = require('passport-local').Strategy
require('./db/connect')
const http = require("http").Server(app);
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const { User } = require('./db/userModel');
const ejs = require('ejs');
const { initializingpassword } = require('./passport')
const passport = require('passport');
const expressSession = require("express-session");

initializingpassword(passport)


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({
        secret: "secret", 
        resave: false, 
        saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());


app.set("view engine", "ejs")


app.get('/', (req, res) => {
    res.render("index");
})
app.get('/register', (req, res) => {
    res.render("register");
})
app.get('/login', (req, res) => {
    res.render("login");
})
app.get('**', (req, res) => {
    res.render("index");
})

app.post('/register', async (req, res) => {
    try {
        console.log(req.body);
        const user = await User.findOne({ userName: req.body.userName })
        if (user) {
            return res.status(400).send({
                message: "user already exists"
            })
        }

        const newUser = await User.create(req.body);

        res.status(201).send({
            message: "success"
        })

    } catch (error) {
        res.status(400).send({
            message: "failure"
        })
    }
});

// passport.serializeUser((user, done) => {
//     done(null, user._id);
// });

// passport.deserializeUser(async (id, done) => {
//     try {
//         const user = await User.findById(id);

//         done(null, user);
//     } catch (error) {
//         done(error, false);
//     }
// });

// const authUser =  async(userName, password, done) => {
//     const user1 = await User.find({ userName: userName })
//     console.log(user1);
//     return done(null , user1[0])
// }


app.post('/login', passport.authenticate('local', {
    failureRedirect: "/login",
    successRedirect: "/register",
}), async (req, res) => {
    try {
        console.log(req.body);
    } catch (error) {
        res.status(400).send({
            message: "failure"
        })
    }
})

// passport.use(new LocalStrategy(authUser))







// Local

http.listen(port, () => {
    console.log("serevr is live on http://localhost:3000");
})

