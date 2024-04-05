import { Router } from 'express';
import session from 'express-session';
import bcrypt from 'bcrypt';
import estabRouter from './estabrouter.js';
import User from './models/User.js';
import Owner from './models/Owner.js';
import Establishment from './models/Establishment.js';
import Review from './models/Review.js';
import Response from './models/Response.js';


const router = Router();

router.use(estabRouter);

router.delete("/users/:username", async(req, res) => {
    try {
        //to do later
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
        const redirectLink = "/users/"+req.params.username; 
        res.redirect(redirectLink);
    }
});

router.get("/users/:username", async(req, res) => {
    try {
        const username = req.params.username;
        const userData = await User.findOne({username: username}).lean().exec();
        const filteredReviews = await Review.find({username: username}).lean().exec();
        var own = null;
        if(req.session.username == username){
            own = true;
        }


        if(req.session.username == null){
            res.render("userprofile", { 
                userData: userData, 
                title: "User Profile",
                reviews:filteredReviews,
                own: own
            });

        }else{
            res.render("userprofile", { 
                userData: userData, 
                title: "User Profile", 
                reviews:filteredReviews,
                own: own,
                layout: 'loggedin', 
                username:req.session.username
            });
        } 
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
        res.redirect('/');
    }
    
});


router.get("/", async (req, res) => {
    try {
        const estab = await Establishment.find({}).lean().exec();

        if (req.session.username == null) {
            res.render("frontpage", {
                title: "Nigel Reviews",
                establishments: estab
            });
        } else {
            res.render("frontpage", {
                title: "Nigel Reviews",
                establishments: estab,
                layout: 'loggedin',
                username: req.session.username
            });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get("/login", (req, res) => {
    res.render("login", {
        title: "Log In"
    });
});


router.get("/register", (req, res) => { 
    res.render("register", {
        title: "Register"
    });
});

router.post('/searchresult', async (req, res) => {
    const query = req.body.query;
    try {
        const estab = await Establishment.find({ establishment: { $regex: query, $options: 'i' } }).lean().exec();
        
        if(req.session.username == null){
            res.render("searchresult", {
                title: "Search Results",
                query: query,
                establishments: estab
            });
        }else{
            res.render("searchresult", {
                title: "Search Results",
                query: query,
                establishments: estab,
                layout: 'loggedin',
                username: req.session.username
            });
        }
    } 
    
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/login', async(req, res) => {
    try {
        const { username, password } = req.body;
        console.log(password);
        const user = await User.findOne({username: username}).lean().exec();
        if (!user) {
            // User not found
            res.status(404).json({});
            console.log('User not found');
            return;
        }
        console.log('Found user:', user);
        bcrypt.compare(password, user.password, function(err, result) {
            if (err) {
                // Handle error
                console.error('Error comparing passwords:', err);
                return;
            }
        
            if (result) {
                req.session.isLoggedIn = true;
                req.session.username = username;
                res.status(200).json({});
                console.log('Passwords match');
            } else {
                res.status(404).json({});
                console.log('Passwords do not match');
            }
        });
    } 
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
        res.redirect('/login')
    }
    
});

router.get('/logout', (req, res) => {
    req.session.username = null;
    req.session.isLoggedIn = false;
    res.redirect('/');
});

export default router;