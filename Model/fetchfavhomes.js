const connection = require("../database");

const favHomesList = (callback) => {
  connection.query(
    "SELECT homes.* FROM favourites JOIN homes ON favourites.home_id = homes.home_id WHERE favourites.user_id = ?",
    ["user-001"],
    (error, results) => {
      if (error) {
        return callback(error, []);
      } else {
        callback(null, results);
      }
    },
  );
};

module.exports = { favHomesList };
