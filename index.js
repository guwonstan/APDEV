// System-related packages
import { dirname } from "path";
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import multer from 'multer'
// Web-app related packages
import express from 'express';
import exphbs from 'express-handlebars';
import session from 'express-session';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
// Routes modules
import router from "./src/indexrouter.js";

// Database modules
import "dotenv/config";
import { connectToMongo } from "./src/models/conn.js";
import User from './src/models/User.js';
import Owner from './src/models/Owner.js';
import Establishment from './src/models/Establishment.js';
import Review from './src/models/Review.js';
import Response from './src/models/Response.js';

async function main() {
    const __dirname = dirname(fileURLToPath(import.meta.url)); // directory URL
    const app = express();
    app.use(bodyParser.urlencoded({ extended: true }));
    const hbs = exphbs.create();
    // Register a helper
    hbs.handlebars.registerHelper('concat', function() {
        return Array.prototype.slice.call(arguments, 0, -1).join('');
    });

    app.listen(process.env.PORT, async function() {
        console.log(`express app is now listening on port ${process.env.PORT}`);
        try {
            await connectToMongo();
            console.log(`Now connected to MongoDB`);
        } catch (err) {
            console.log('Connection to MongoDB failed: ');
            console.error(err);
        }
    });

    
    const setUserSession = (req, res, next) => {
        if (req.cookies) {
            req.session.username = req.cookies.username;
            req.session.isLoggedIn = true;
            console.log(req.session.username);
        }else if (req.session){
            console.log(req.session.username);
            res.cookie('username', req.session.username, { maxAge: 86400000 });
        }
        next();
        
    };
    app.use(setUserSession);
    
    app.use(session({
        secret: "secret",
        resave: false,
        saveUninitialized: false
    }));
    app.use((req, res, next) => {
        // Check if session data has already been set
        if (!req.session.isLoggedIn) {
            req.session.username = null;
            req.session.isLoggedIn = false;
        }
        next();
    });
    app.use("/static", express.static(__dirname + "/public"));
    // Set handlebars as the express app's default view engine
    app.engine("hbs", exphbs.engine({
        extname: 'hbs',
        helpers: {
            toDate: (date) => {
                return date.toUTCString();
            }
        }
    }));

    app.use(cookieParser());


    app.set("view engine", "hbs");
    // directory for views folder
    app.set("views", "./views");
    // View cache to false
    app.set("view cache", false);
    // from this point onwards, we are going to receive json format data
    app.use(express.json());
    app.use(router);

    const storage = multer.diskStorage({
    destination: './public/images',
    filename: function(req, file, cb) {
        const username = req.body.username;
        const filename = `${username}_pfp.jpg`;
        cb(null, filename);
        }
    });

    var upload = multer({ storage: storage })
    app.post('/register', upload.single('avatar'), async (req, res) => {
        try {
            const { username, password, description } = req.body;
            const hashedPassword = await bcrypt.hash(password, 4);
            const newUser = new User({
                username: username,
                password: hashedPassword,
                bio: description
            });
            
            newUser.save()
                .then(savedUser => {
                    console.log('User saved successfully:', savedUser);
                });
            res.status(200).json({});
        } 
        catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });    
}
main();
