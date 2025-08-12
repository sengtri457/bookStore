const mongoose = require("mongoose");

const order= new mongoose.Schema(
    {
        user  : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'user',
        },
        book : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Book',
        },
        status : {
            type : String,
            default : "Order placed",
            enum : ["Order placed", "Out for delivery", "delivered canceled"],
            },
        },
        {timestamps : true}
);

module.exports = mongoose.model("order",order);