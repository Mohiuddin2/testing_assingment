const asyncHandler = require("./async");
const { userRole } = require("../middleware/protect");
const Movie = require("../model/Movie");

// limit will check if basic uesr can not exceeds 5 movies
exports.limitation = asyncHandler(async (req, res, next) => {
  
  // calculation for One month limit for basic user
  const role = await userRole();
  const allMovie = await Movie.find({ UserRole: role });
  let monthLimit;
  let monthStart;

  // checking role of basic user createdAT date in the db

  if (allMovie.length !== 0) {
    if (role == "basic") {
      monthStart = allMovie[0].createdAt;
      let dateOfFisrtMove = new Date(monthStart);
      const getDateFm = dateOfFisrtMove.getDate();
      const addMonth = getDateFm + 30;
      let duration = dateOfFisrtMove.setDate(addMonth);
      monthLimit = new Date(duration);
    } 

    // checking if basic ueser conditions meet can count 5 movie
    if (role === "basic" && monthLimit > monthStart) {
      let movieCount = 0;
      for (let key in allMovie) {
        if (allMovie[key].UserRole === role) {
          movieCount = movieCount + 1;
        }
      }
      if (movieCount < 5) {
        next();
      } else {
        res.send("Basic User Exceeds limit. Get Premium!!! Its Unlimited!");
      }
    } else next();
  } else next();
});
