const Listing = require("../models/listing.js");
const ExpressError = require("../utils/ExpressError.js");

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
};

module.exports.renderNewForm =  (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.createListing = async (req, res, next) =>{
    

    if(!req.body.listing){
        throw new ExpressError(400, "Listing is required");  
    }
    //let {titel, description, image, price, location, country} = req.body;
    //let listing = req.body.listing;
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url, filename};
    await newListing.save();
    req.flash("success", "New Listing created successfully!");
    res.redirect("/listings");

};

module.exports.showListing = async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id).populate({path:"reviews", populate: {path: "author"}}).populate("owner");
    if(!listing){
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs", {listing});
};

module.exports.renderEditForm = async (req, res) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing){
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listings");
    }
    res.render("listings/edit.ejs", {listing});
};


module.exports.category = async (req, res) =>{
    let categoryValue =  req.params;
    let allListings = await Listing.find(categoryValue);
    res.render("listings/index.ejs", {allListings});
};

module.exports.search = async (req, res) =>{
    const query = req.query;

    const number = parseFloat(query.q);
    let searchQuery = {
        "$or": [
            {"country": {$regex: query.q, $options: 'i'}},
            {"location": {$regex: query.q, $options: 'i'}},
            {"title": {$regex: query.q, $options: 'i'}}
        ]
    };

    if (!isNaN(number)) {
        searchQuery["$or"].push({"price": number});
    };

    // let allListings = await Listing.find({
    //     "$or":[
    //         {"country":{$regex: query.q, $options: "i"}},
    //         {"location":{$regex: query.q,  $options: "i"}},
    //         {"title":{$regex: query.q,  $options: "i"}},
    //         {"price":{$regex: query.q,  $options: "i"}},
            
    //     ]
    // });

    let allListings = await Listing.find(searchQuery);

    if(allListings.length === 0){
        req.flash("error", "No Result Found for this Search");
        return res.redirect("/listings");
    }
    res.render("listings/index.ejs", {allListings});

}

module.exports.updateListing = async (req, res) => {
    if(!req.body.listing){
        throw new ExpressError(400, "Send valid data for listings");
    }
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});

    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url, filename};
        await listing.save();
    }
    
    req.flash("success", "Listing updated successfully!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted successfully!");
    res.redirect("/listings");
};