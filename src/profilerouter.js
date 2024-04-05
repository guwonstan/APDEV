import { Router } from 'express';


const profilerouter = Router();


profilerouter.use(urlencoded({ extended: false }));

profilerouter.put("/editreview", (req, res) => {

  const {title, body, newStar1, newStar2, newStar3, newStar4, newStar5} = req.body;

  //  res.render("frontpage", {
  //      title: "Homepage"
  //  });
    
  });


  profilerouter.post("/createreview", (req, res) => {

    const {username, id, reviewTitle, reviewRating, reviewContent, response} = req.body;
  
  
      res.render("createreview", {
          title: "Create Review",
          layout: 'loggedin'
      });
      
    });
  

/*
profilerouter.put("/editreview", (req, res) => {
    res.render("frontpage", {
        title: "Homepage"
    });
    
  });


*/


export default profilerouter;