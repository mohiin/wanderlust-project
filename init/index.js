const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
// const { insertMany } = require("../models/listing.js");

const mongo_url = "mongodb://127.0.0.1:27017/wanderlust";

main()
    .then(()=> {
        console.log("connection successful to DB");
    })
    .catch((err) =>{
        console.log(err);
    });


async function main(){
    await mongoose.connect(mongo_url);
}

const initDB = async () =>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner: "66d886a81c5d982eb0db1c23"}));
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
};

initDB();