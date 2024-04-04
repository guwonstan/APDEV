import { Router } from 'express';
import { users, reviews, responses, establishments } from '../index.js';

const estabRouter = Router();

estabRouter.get("/establishment1", (req, res) => {
    if(req.session.username == null){

    res.render("establishments/establishment1", {
        title: "Ate Rica's Bacsilog at RL Building",
        reviews: reviews,
        response: responses,
    });

    }else{

    res.render("establishments/establishment1", {
            title: "Ate Rica's Bacsilog at RL Building",
            reviews: reviews,
            response: responses,
            layout: 'loggedin',
            username: req.session.username
    });

    }

});

estabRouter.get("/establishment2", (req, res) => {

    if(req.session.username == null){

        res.render("establishments/establishment2", {
            title: "Intensitea Blends at RL Building",
            reviews: reviews,
            response: responses,
        });

    }else{

        res.render("establishments/establishment2", {
            title: "Intensitea Blends at RL Building",
            reviews: reviews,
            response: responses,
            layout: 'loggedin',
            username: req.session.username
        });

    }

});

estabRouter.get("/establishment3", (req, res) => {

    if(req.session.username == null){

        res.render("establishments/establishment3", {
            title: "Dimsum Republic at RL Building",
            reviews: reviews,
            response: responses,
        });

    }else{

        res.render("establishments/establishment3", {
            title: "Dimsum Republic at RL Building",
            reviews: reviews,
            response: responses,
            layout: 'loggedin',
            username: req.session.username
        });


    }

});

estabRouter.get("/establishment4", (req, res) => {

    if(req.session.username == null){

    res.render("establishments/establishment4", {
         title: "Cafeteria at Courtyard Hall",
         reviews: reviews,
         response: responses,
    });

    }else{
        
    res.render("establishments/establishment4", {
        title: "Cafeteria at Courtyard Hall",
        reviews: reviews,
        response: responses,
        layout: 'loggedin',
        username: req.session.username
    });

    }   
});

export default estabRouter;
