const product = require("../Model/Datastorage");

const homePageController = (req, res) => {
  // console.log(req.url);
  res.render("admin/hostHome", {
    title: "Host page",
    message: "Welcome Mayank 🏡",
    homeLink: `${req.url}`,
  });
};

// Add home page get controller

const getController = (req, res) => {
  res.render("admin/hostPage", {
    title: "Host page - addhome",
    formLink: req.url,
  });
};

// Add home post controller

const postController = (req, res) => {
  const { Name, Price, Location, Rating, PhoneNumber, Details, imageLink } =
    req.body;
  const home = new product(
    Name,
    Price,
    Location,
    Rating,
    PhoneNumber,
    Details,
    imageLink,
  );
  home.save();
  res.redirect("/host/homes");
};

const resController = (req, res, next) => {
  product.fetchAll((err, items) => {
    if (err) {
      return next(err);
    }
    res.render("admin/homesData", {
      items: items,
      title: "Homes",
      resLink: req.url,
    });
  });
};

// Home list page controller

const homeList = (req, res) => {
  res.render("admin/Home-list", { title: "Home-list", homeList: `${req.url}` });
};

// Homes edit get request controller

const homesEdit = (req, res, next) => {
  let theId = req.params.homeId;

  product.fetchAll((err, items) => {
    if (err) {
      return next(err);
    }
    let filteredHomes = items.find(
      (item) => String(item.home_id) === String(theId),
    );
    if (!filteredHomes) {
      return res.status(404).json({ message: "Home not found", theId });
    }
    res.json(filteredHomes);
  });
};

// Homes edit post request controller

const homesPostEdit = (req, res) => {

  product.updateById(req.params.homeId, req.body, (err, updated) => {
    if (err) {
      console.error("Failed to update home:", err);
      return res.status(500).json({ message: "Failed to update home" });
    }

    if (!updated) {
      return res.status(404).json({ message: "Home not found" });
    }

    res.json({ message: "Home updated" });
  });
};


//const homesPostEdit = (req, res) => {
 // console.log("BODY:", req.//body);                       // ← add this
 // product.updateById(req.params.id, req.body, (err, //result) => {
   // if (err) {
  //    console.error("updateById error:", //err);          // ← add this
     // return res.status(500).json({ error: err.message });
    //}
    //res.json(result);
  //});
//}

// Homes deleting request controller

const deleteHome = (req, res, next) => {
  console.log("Delete request is coming :-", req.params.homeId);
  product.deleteHome(req.params.homeId, (err, deletedHomes) => {
    if (err) return next(err);

    if (!deletedHomes) {
      return res.status(404).json({ message: "Homes not found" });
    }
    res.json({ message: "Homes deleted" });
  });
};

exports.deleteHome = deleteHome;
exports.homesPostEdit = homesPostEdit;
exports.homesEdit = homesEdit;
exports.homeList = homeList;
exports.homePageController = homePageController;
exports.getController = getController;
exports.postController = postController;
exports.resController = resController;
