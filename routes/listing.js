const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

router.route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn, upload.single("listing[image.url]"), wrapAsync(listingController.createListing));
   


// //Index route
// router.get("/", wrapAsync(listingController.index));

//New route 
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.get("/category/:category", wrapAsync(listingController.category));

router.get("/search", listingController.search)

router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn, isOwner, upload.single("listing[image.url]"), wrapAsync(listingController.updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));




// // Create route
// router.post("/", isLoggedIn, wrapAsync(listingController.createListing));

// //Show route
// router.get("/:id", wrapAsync(listingController.showListing));

//Edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

// //Update route
// router.put("/:id", isLoggedIn, isOwner, wrapAsync(listingController.updateListing));

// //Delete route 
// router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));



module.exports = router;