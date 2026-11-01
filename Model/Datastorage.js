const fs = require("fs");
const connection = require("../database");

// importing id creator to create unique id everytime a new home is created

const { randomUUID } = require("crypto");

class Product {
  constructor(Name, Price, Location, Rating, PhoneNumber, Details, imageLink) {
    this.id = randomUUID();
    this.Name = Name;
    this.Price = Price;
    this.Location = Location;
    this.Rating = Rating;
    this.PhoneNumber = PhoneNumber;
    this.details = Details;
    this.imageLink = imageLink;
  }

  // Saving data to database

  save() {
    let homeData = [
      this.id,
      this.Name,
      this.Price,
      this.Location,
      this.Rating,
      this.PhoneNumber,
      this.details,
      this.imageLink,
    ];

    connection.query(
      "INSERT INTO homes(home_id,name,price,location,rating,phone_number,details,image_link) VALUES (?,?,?,?,?,?,?,?)",
      homeData,
      (error, result) => {
        if (error) {
          console.error("Home save failed", error);
        } else {
          console.log(`${result.affectedRows} home saved successfully`);
        }
      },
    );

    // // Read existing data before adding a new product to print the data which are already available

    // fs.readFile("Newfile.txt", (err, data) => {
    //   let existingData = [];

    // if there will be any error except file missing then log that error and

    // if (err) {
    //   if (err.code !== "ENOENT") {
    //     console.log(err);
    //     return;
    //   }
    // }

    // if the data is not empty and exist then parse the data and send it to my array
    // else if (data.length > 0) {
    //   try {
    // console.log("Fetching user recent data");
    //     existingData = JSON.parse(data);
    //   } catch (err) {
    //     console.log("Invalid JSON:", err);
    //     return;
    //   }
    // }

    // push the new value on the array already containing the old value or empty
    // console.log("Adding new data");
    // if (Array.isArray(existingData)) {
    //   existingData.push(this);
    // } else {
    //   console.log("Stored data is not an array.");
    //   return;
    // }

    // Write the data back to the file with the new and old value by converting it into string.

    // fs.writeFile("Newfile.txt", JSON.stringify(existingData), (err) => {
    //   if (err) {
    //     console.log(err);
    //     return;
    //   } else {
    //     console.log("File written successfully!");
    //   }
    // });
    // });
  }

  // Reading Databse

  static fetchAll(callback) {
    connection.query("SELECT * FROM homes", (error, results) => {
      if (error) {
        callback(error, []);
        return console.log(error);
      } else {
        callback(null, results);
      }
    });
  }

  // Editing and updating the item

  static updateById(id, updates, callback) {
    // console.log("This is the id to change and get the data :- ", id);
    // console.log("Here are the updates :-", updates);
    connection.query(
      "SELECT * FROM homes WHERE home_id = ?",
      id,
      (error, results) => {
        if (error) {
          console.error("Error selecting home:", error);
          return callback(error, null);
        }

        if (results.length === 0) {
          return callback(null, null);
        }

        connection.query(
          "UPDATE homes SET name = ?, price = ?, location = ?, rating = ?, phone_number = ?, details = ?, image_link = ? WHERE home_id = ?",
          [
            updates.Name,
            updates.Price,
            updates.Location,
            updates.Rating,
            updates.PhoneNumber,
            updates.Details,
            updates.imageLink,
            id,
          ],
          (err) => {
            if (err) {
              console.error("Error updating home:", err);
              return callback(err, null);
            }
            callback(null, true);
          },
        );
      },
    );
  }

  //  connection.query(
  //    "UPDATE homes SET name = ? WHERE home_id = ?",
  //    [updates.name, id],
  //    (error, results) => {
  //      if (error) {
  //        console.error("Error updating homes:", error);
  //        return;
  //       }
  //       console.log("Homes updated successfully:", results);
  //       callback(null, results);
  //     },
  //   );

  //   console.log("Both name are different.");

  // console.log(results);

  // fs.readFile("Newfile.txt", (err, data) => {
  //   if (err) return callback(err);
  //   let homes;
  //   try {
  //     homes = JSON.parse(data);
  //   } catch (parseErr) {
  //     return callback(parseErr);
  //   }
  //   const home = homes.find((item) => String(item.id) === String(id));
  //   if (!home) return callback(null, null);
  //   if (updates.Name !== home.Name) {
  //     home.Name = updates.Name;
  //   }
  //   if (updates.Price !== home.Price) {
  //     home.Price = updates.Price;
  //   }
  //   if (updates.Location !== home.Location) {
  //     home.Location = updates.Location;
  //   }
  //   if (updates.Rating !== home.Rating) {
  //     home.Rating = updates.Rating;
  //   }
  //   if (updates.PhoneNumber !== home.PhoneNumber) {
  //     home.PhoneNumber = updates.PhoneNumber;
  //   }
  //   if (updates.Details !== home.details) {
  //     home.details = updates.Details;
  //   }
  //   if (updates.imageLink !== home.imageLink) {
  //     home.imageLink = updates.imageLink;
  //   }
  //   fs.writeFile("Newfile.txt", JSON.stringify(homes), (writeErr) => {
  //     if (writeErr) return callback(writeErr);
  //     callback(null, home);
  //   });
  // });
  // }
  // Deleting a Home

  static deleteHome(id, callback) {
    connection.query(
      "DELETE FROM homes WHERE home_id = ?",
      id,
      (error, results) => {
        if (error) {
          callback(error, results);
          return console.log(error);
        } else {
          callback(null, results.affectedRows);
        }
      },
    );
    // fs.readFile("Newfile.txt", (err, data) => {
    //   if (err) return callback(err);
    //   let homes;
    //   try {
    //     homes = JSON.parse(data);
    //   } catch (parseErr) {
    //     return callback(parseErr);
    //   }
    //   const home = homes.filter((item) => String(item.id) !== String(id));
    //   if (home.length === homes.length) {
    //     return callback(null, null);
    //   }

    //   fs.writeFile("Newfile.txt", JSON.stringify(home), (err) => {
    //     if (err) return callback(err);
    //     callback(null, home);
    //   });
    // });
  }
}





// const favHomesList = (callback) =>{
//   connection.query("SELECT * FROM homes",(error,results)=>{
//     if(error){
//       console.log(error,null)
//     }else{
//       console.log(results);
//       callback(null,results)
//     }
//   })
// }








module.exports = Product;
