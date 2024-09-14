const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const ExpressError = require("../utils/ExpressError.js");

module.exports.createReview = async(req, res, next) =>{ // "/listings/:id/reviews"
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);

    if(!req.body.review){
        throw new ExpressError(400, "review is required");  
    }
    newReview.author = req.user._id;
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    req.flash("success", "New Review created successfully!");

    res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReview = async (req, res, next) =>{
    let {id, reviewId} = req.params;

    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review deleted successfully!");
    res.redirect(`/listings/${id}`);
};