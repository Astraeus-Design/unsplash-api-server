const axios = require("axios");

// image object class for use in returning object arrays to client

class imgObj {
  constructor(inputObj) {
    this.name = inputObj.user.name;
    this.imageUrl = inputObj.urls.regular;
    this.description = inputObj.description;
  }
}

// route handler for random photo acquisition

async function getRandom(request, response, next) {
  //let digiUrl = `https://api.unsplash.com/search/photos/?client_id=${process.env.UNSPLASH_KEY1}&query=cat`;

  //let digiUrl = `https://api.unsplash.com/search/photos/?query=cat`;

  try {
    //console.log(request.query.query);
    const digiUrl = `https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH_KEY1}`;
    const imageData = await axios.get(digiUrl);

    console.log(" here is the data   ", imageData.data);

    //console.log(digiData.description);
    const digiData = new imgObj(imageData.data);

    response.status(200).send(digiData);
  } catch (error) {
    // console.log(error);
    next(`error in request for random image`);
    //response.status(500).send("error in request for images");
  }
}

module.exports = getRandom;
