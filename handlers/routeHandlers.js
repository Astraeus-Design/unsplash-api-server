// image object class for use in returning object arrays to client

class imgObj {
  constructor(inputObj) {
    this.name = inputObj.user.name;
    this.imageUrl = inputObj.urls.regular;
    this.description = inputObj.description;
  }
}

// route handler for photo query search

async function getImages(request, response, next) {
  //let digiUrl = `https://api.unsplash.com/search/photos/?client_id=${process.env.UNSPLASH_KEY1}&query=cat`;

  //let digiUrl = `https://api.unsplash.com/search/photos/?query=cat`;

  try {
    if (request.query !== undefined && request.query !== null) {
      if ("query" in request.query) {
        console.log(request.query.query);
        const digiUrl = `https://api.unsplash.com/search/photos/?client_id=${process.env.UNSPLASH_KEY1}&query=${request.query.query}`;
        const imageData = await axios.get(digiUrl);
        console.log(request.query);
        console.log(" here is the data   ", imageData.data.results);
        const digiData = imageData.data.results.map((item) => {
          console.log(item.description);
          return new imgObj(item);
        });
        response.status(200).send(digiData);
      } else response.status(200).send({});
    } else {
      response.status(200).send({});
    }
  } catch (error) {
    console.log(error);
    next(`error in request for ${request.query.query} images`);
    //response.status(500).send("error in request for images");
  }
}
module.exports = getImages;

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

// route handler for wildcard routes, i.e those not existing

function wildCards(request, response) {
  response.status(404).send("file not found");
}

module.exports = wildCards;
