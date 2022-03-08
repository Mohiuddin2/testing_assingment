const Movie = require("../model/Movie");
const axios = require("axios");
const { userRole } = require("../middleware/protect");
const asyncHandler = require("../middleware/async");


// @desc Create Movie
// @route POST /movie
// @access Private
exports.movie = asyncHandler(async (req, res) => {
  var query = req.query.search;
  
  var url =
  "https://www.omdbapi.com/?t=" + query + `&apikey=${process.env.APIkey}`;
  let movie;
  const role = await userRole();
  await axios
    .post(url)
    .then(function (response) {
      movie = {
        Title: response.data.Title,
        Released: response.data.Released,
        Genre: response.data.Genre,
        Director: response.data.Director,
        UserRole: role,
      };
    })
    .catch(function (error) {
      if (error.response) {
        let { status, statusText } = error.response;
        console.log("status.statusText", status.statusText);
        res.status(status).send(statusText);
      } else {
        res.status(404).send(error);
      }
    });

  try {
    //incase schema unique key creates error
   
    const match = movie.Title;
    const movieCreator = movie.UserRole
    const findUser = await Movie.find({ UserRole: role });
    const moviedExist = findUser.find(u => u.Title === match)
       
    //incase schema unique key creates error

    if (!moviedExist) {
   
      const newMovie = new Movie(movie);
      // Saving movie in mongodb and error handling
      try {
        await newMovie.save();
        res.send(newMovie);
      } catch (error) {
        res.send(error.message);
      }
    } else {
      res.send("Sorry, You have already added this movie..");
    }
  } catch (error) {
    console.log("error form protect", error);
  }
});

// @desc get Movie
// @route get /movie
// @access Private
exports.getMovie = asyncHandler(async (req, res) => {
  const role = await userRole();
  let allMovies = await Movie.find({ UserRole: role });
  
  // Checking movie data is in db or not
  if (allMovies.length === 0) {
    res.status(200).send("Please save a Movie data");
  } else {
    res.status(200).send(allMovies);
  }
});
