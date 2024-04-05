import { Router } from 'express';
import User from './models/User.js';
import Owner from './models/Owner.js';
import Establishment from './models/Establishment.js';
import Review from './models/Review.js';
import Response from './models/Response.js';

const estabRouter = Router();

estabRouter.get("/establishment1", async(req, res) => {
    const estabData = await Establishment.findOne({establishment: "Ate Rica's Bacsilog"}).lean().exec();
    const filteredReviews = await Review.find({establishment: "Ate Rica's Bacsilog"}).lean().exec();
    const filteredResponses = await Response.find({}).lean().exec();
    filteredReviews.forEach(item => {
        let newValue = null;
        filteredResponses.forEach(response => {
            if (response.reviewTitle === item.reviewTitle) {
                newValue = response.responseContent;
            }
        });
        item.response = newValue;
    });
    

    if(req.session.username == null){
        res.render("establishment", {
            title: "Ate Rica's Bacsilog at RL Building",
            reviews: filteredReviews,
            estabData
        });
    }else{
        res.render("establishment", {
            title: "Ate Rica's Bacsilog at RL Building",
            reviews: filteredReviews,
            layout: 'loggedin',
            username: req.session.username,
            estabData
        });
    }
});

estabRouter.get("/establishment2", async (req, res) => {
    const estabData = await Establishment.findOne({establishment: "Intensitea Blends"}).lean().exec();
    const filteredReviews = await Review.find({establishment: "Intensitea Blends"}).lean().exec();
    const filteredResponses = await Response.find({}).lean().exec();
    filteredReviews.forEach(item => {
        let newValue = null;
        filteredResponses.forEach(response => {
            if (response.reviewTitle === item.reviewTitle) {
                newValue = response.responseContent;
            }
        });
        item.response = newValue;
    });

    if(req.session.username == null){
        res.render("establishment", {
            title: "Intensitea Blends at RL Building",
            reviews: filteredReviews,
            
            estabData
        });
    }else{
        res.render("establishment", {
            title: "Intensitea Blends at RL Building",
            reviews: filteredReviews,
            
            layout: 'loggedin',
            username: req.session.username,
            estabData
        });
    }
});

estabRouter.get("/establishment3", async (req, res) => {
    const estabData = await Establishment.findOne({establishment: "Dimsum Republic"}).lean().exec();
    const filteredReviews = await Review.find({establishment: "Dimsum Republic"}).lean().exec();
    const filteredResponses = await Response.find({}).lean().exec();
    filteredReviews.forEach(item => {
        let newValue = null;
        filteredResponses.forEach(response => {
            if (response.reviewTitle === item.reviewTitle) {
                newValue = response.responseContent;
            }
        });
        item.response = newValue;
    });

    if(req.session.username == null){
        res.render("establishment", {
            title: "Dimsum Republic at RL Building",
            reviews: filteredReviews,
            estabData
        });
    }else{
        res.render("establishment", {
            title: "Dimsum Republic at RL Building",
            reviews: filteredReviews,
            
            layout: 'loggedin',
            username: req.session.username,
            estabData
        });
    }
});

estabRouter.get("/establishment4", async (req, res) => {
    const estabData = await Establishment.findOne({establishment: "Courtyard Cafeteria"}).lean().exec();
    const filteredReviews = await Review.find({establishment: "Courtyard Cafeteria"}).lean().exec();
    const filteredResponses = await Response.find({}).lean().exec();
    filteredReviews.forEach(item => {
        let newValue = null;
        filteredResponses.forEach(response => {
            if (response.reviewTitle === item.reviewTitle) {
                newValue = response.responseContent;
            }
        });
        item.response = newValue;
    });

    if(req.session.username == null){
        res.render("establishment", {
            title: "Cafeteria at Courtyard Hall",
            reviews: filteredReviews,
            
            estabData
        });
    }else{
        res.render("establishment", {
            title: "Cafeteria at Courtyard Hall",
            reviews: filteredReviews,
            
            layout: 'loggedin',
            username: req.session.username,
            estabData
        });
    }
});


export default estabRouter;
