// System-related packages
import { dirname } from "path";
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import multer from 'multer'
// Web-app related packages
import express from 'express';
import exphbs from 'express-handlebars';
import session from 'express-session';
// Routes modules
import router from "./src/indexrouter.js";

// Database modules
import "dotenv/config";
import { connectToMongo } from "./src/models/conn.js";
// const reviews = db.collection('reviews');
// const users = db.collection('users');

async function main() {
    const __dirname = dirname(fileURLToPath(import.meta.url)); // directory URL
    const app = express();

    app.use(bodyParser.urlencoded({ extended: true }));

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

    const hbs = exphbs.create();

    // Register a helper
    hbs.handlebars.registerHelper('concat', function() {
        return Array.prototype.slice.call(arguments, 0, -1).join('');
    });

    // Set handlebars as the express app's default view engine
    app.engine("hbs", exphbs.engine({
        extname: 'hbs',
        helpers: {
            toDate: (date) => {
                return date.toUTCString();
            }
        }
    }));
    app.set("view engine", "hbs");

    // directory for views folder
    app.set("views", "./views");
    // View cache to false
    app.set("view cache", false);

    // from this point onwards, we are going to receive json format data
    app.use(express.json());
    app.use(router);


    app.post('/searchresult', (req, res) => {
        const query = req.body;
        if (req.session.username == null) {
            res.render("searchresult", {
                title: "Search Results",
                query: query
            });
        } else {
            res.render("searchresult", {
                title: "Search Results",
                query: query,
                layout: 'loggedin'
            });
        }
    });

    const storage = multer.diskStorage({
      destination: './public/images',
      filename: function(req, file, cb) {
          const username = req.body.username;
          const filename = `${username}_pfp.jpg`;
          cb(null, filename);
        }
    });

    var upload = multer({ storage: storage })

    app.post('/register', upload.single('avatar'), (req, res) => {
        const { username, password, description } = req.body;
        const newUser = {
            username: username,
            password: password,
            bio: description
        };
        users.push(newUser);
        res.redirect('/');
    });

    app.post('/login', (req, res) => {
        const { username, password } = req.body;

        console.log('Received username:', username);
        console.log('Received password:', password);

        const user = users.find(user => user.username === username);

        if (user && user.password === password) {
            req.session.isLoggedIn = true;
            req.session.username = username;
            console.log("correct")
            res.redirect('/');
            console.log(req.session.isLoggedIn)
        } else {
            console.log("wrong")
            res.redirect('/login');
        }
    });

    app.get('/logout', (req, res) => {
        req.session.username = null;
        req.session.isLoggedIn = false;
        res.redirect('/');
    });


    try {
        // Connect to MongoDB
        await connectToMongo();
        console.log ('Connected to MongoDB.');
        // Start Express App
        app.listen(process.env.SERVER_PORT, () => {
            console.log("Express app now listening...");
        });

    } catch (err) {
        console.error(err);
        process.exit();
    }

}

main();
