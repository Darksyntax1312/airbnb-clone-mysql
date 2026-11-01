const fs = require("fs");
const connection = require("./database");

fs.readFile("Newfile.txt", "utf8", (error, data) => {
  if (error) {
    console.error("Failed to read newfile.txt:", error);
    return connection.end();
  }

  let parsedData;

  try {
    parsedData = JSON.parse(data);
  } catch (error) {
    console.error("Invalid JSON in Newfile.txt", error);
    return connection.end();
  }

  if (!Array.isArray(parsedData) || parsedData.length === 0) {
    console.log("No homes found to migrate.");
    return connection.end();
  }

  const newData = parsedData.map((items) => [
    items.id,
    items.Name,
    Number(items.Price),
    items.Location,
    Number(items.Rating),
    items.PhoneNumber,
    items.details,
    items.imageLink,
  ]);

  connection.query(
    "SELECT COUNT(*) AS total_homes FROM homes",
    (error, results) => {
      if (error) {
        console.error("Failed to check existing homes:", error);
        return connection.end();
      }

      if (Number(results[0].total_homes) > 0) {
        console.log("Homes already exist. Migration stopped.");
        return connection.end();
      }

      connection.query(
        `INSERT INTO homes(home_id , name , price , location , rating , phone_number , details , image_link) VALUES ?`,
        [newData],
        (error, result) => {
            if (error) {
              console.error("Migration failed:", error);
            } else {
              console.log(`${result.affectedRows} homes migrated successfully`);
            }
            connection.end();
          },
      );
    },
  );
});
