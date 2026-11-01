const connection = require("../database");

const deleteFavHomes = (deletehomeId, callback) => {
  connection.query(
    "DELETE FROM favourites WHERE user_id = ? AND home_id = ?",
    ["user-001", deletehomeId],
    (error, result) => {
      if (error) {
        console.log(error);
        return callback(error);
      } else {
        console.log("Home deleted successfully");
      }
    },
  );
};

module.exports = { deleteFavHomes };
