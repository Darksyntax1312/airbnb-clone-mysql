const express = require("express");
const userRouter = express.Router();
const { userHomeList } = require("../Controller/userController");
const { userBookings } = require("../Controller/userController");
const { userFavouriteget } = require("../Controller/userController");
const { userFavouritepost } = require("../Controller/userController");
const { userHomes } = require("../Controller/userController");
const { userHomePage } = require("../Controller/userController");
const { userHomeReserve } = require("../Controller/userController");
const { userFavouriteDelete } = require("../Controller/userController");

// User home list

userRouter.get("/User/home-list", userHomeList);

//user Bookings

userRouter.get("/User-bookings", userBookings);

// favourite - list get request

userRouter.get("/User/User-favourite", userFavouriteget);

// fav list post request

userRouter.post("/User/User-favourite/:homeId", userFavouritepost);

// Favourite - list remove route

userRouter.post("/User/User-favourite/Delete/:homeId", userFavouriteDelete);

// home details

userRouter.get("/User-homes/:homeId", userHomes);

// User home page

// userRouter.get("/User-home-list", userHomeList);

userRouter.get("/User/home-page",userHomePage)

// home reserved

userRouter.get("/User-home-reserve", userHomeReserve);

module.exports = userRouter;
