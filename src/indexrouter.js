import { Router } from 'express';
import estabRouter from './estabrouter.js';
import { users, reviews, responses, establishments } from '../index.js';

const router = Router();

router.use(estabRouter);

router.get("/users/:username", (req, res) => {

    const username = req.params.username;
    const userData = users.find((user) => user.username === username);
    const filtered = users.filter((user) => user.username === username);

    if(req.session.username == null){
        
    res.render("userprofile", { userData: userData, title: "User Profile" });

    }else{

    res.render("userprofile", { userData: userData, title: "User Profile", layout: 'loggedin', username: req.session.username});

    }
});

router.get("/", (req, res) => {
    
    if(req.session.username == null){
        res.render("frontpage", {
            title: "Nigel Reviews",
            establishments: establishments
        });
    }else{

        res.render("frontpage", {
            title: "Nigel Reviews",
            establishments: establishments,
            layout: 'loggedin',
            username: req.session.username
        });
    }
});

router.get("/login", (req, res) => {
    res.render("login", {
        title: "Log In"
    });
});

router.get("/logout", (req, res) => {
        res.redirect("/");
});

router.get("/register", (req, res) => { 
    res.render("register", {
        title: "Register"
    });
});



export default router;