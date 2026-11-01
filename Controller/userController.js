const product = require("../Model/Datastorage");
const favourite = require("../Model/addfavhomes");
const favHomesList = require("../Model/fetchfavhomes");
const deleteFavHome = require("../Model/deletefavhomes");

// User's main home list

const userHomeList = (req, res, next) => {
  product.fetchAll((err, items) => {
    if (err) {
      return next(err);
    }
    res.render("user/userPage", {
      items: items,
      title: "User - homelist",
      UserHomeLink: req.url,
    });
  });
};

// User's booking page

const userBookings = (req, res) => {
  res.render("store/Bookings", {
    title: "User Bookings",
    userBookingLink: req.url,
  });
};

// User's favourite homes get request page

const userFavouriteget = (req, res, next) => {
  // favourite.fetchAll((err, items) => {
  //   if (err) {
  //     return next(err);
  //   }
  //   product.fetchAll((err, Productitems) => {
  //     if (err) {
  //       return next(err);
  //     }

  //     let filteredHomes = Productitems.filter((element) =>
  //       items.includes(element.id),
  //     );
// console.log("get request is coming for favourite homes")
favHomesList.favHomesList((err,data)=>{
  if(err){
    return next(err)
  }
  res.render("store/favourite-list", {
    title: "User favourite",
    userFavouriteLink: req.url,
    favouriteHomes: data,
  });
})
};

// User's favourite homes post request page

const userFavouritepost = (req, res) => {
  const myRequest = req.params.homeId;
  console.log("Fav home request is coming with home id :- ", myRequest);
  favourite.addFav(myRequest);
  res.redirect("/User/User-favourite");
};

// Home details page

const userHomes = (req, res, next) => {
  product.fetchAll((err, items) => {
    if (err) {
      return next(err);
    }
    const homeId = req.params.homeId;
    const selectedHome = items.find((home) => home.home_id === homeId);
    res.render("store/home-detail", {
      items: selectedHome,
      title: "Home details",
      userHomeDetails: req.url,
      homeId: req.params.homeId,
    });
  });
};

// Home list page

const userHomePage = (req, res) => {
  res.render("user/user-home-page", {
    title: "User page",
    userHomeList: req.url,
  });
};

// Reserved home page

const userHomeReserve = (req, res) => {
  res.render("store/reserve", {
    title: "Reserve homes",
    reserveHomesLink: req.url,
  });
};

// User favourite homes delete controller

const userFavouriteDelete = (req, res, next) => {
  // favourite.removeFav(req.params.homeId, (err, deletedFavs) => {
  //   if (err) return next(err);

  //   if (!deletedFavs) {
  //     return res.status(404).json({ message: "Fav home not found" });
  //   }
  //   res.json({ message: "fav Home deleted" });
  // });
deleteFavHome.deleteFavHomes(req.params.homeId,(err)=>{
  if(err) return next (err);
});
res.json({message:"fav Home deleted"})
};

exports.userFavouriteDelete = userFavouriteDelete;
exports.userHomeReserve = userHomeReserve;
exports.userHomePage = userHomePage;
exports.userHomes = userHomes;
exports.userFavouriteget = userFavouriteget;
exports.userFavouritepost = userFavouritepost;
exports.userBookings = userBookings;
exports.userHomeList = userHomeList;
