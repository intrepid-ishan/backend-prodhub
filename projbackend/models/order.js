const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

// define a schema
const ProductCartSchema = new mongoose.Schema({
    product: {
        type: ObjectId,
        ref: "Product"
    },
    name: String,
    count: Number,
    price: Number
});
//compile our model
const ProductCart = mongoose.model("ProductCart", ProductCartSchema);

// define a schema
const OrderSchema = new mongoose.Schema({
    products: [ProductCartSchema],
    transaction_id: {},
    amount: {type: Number},
    address: String,
    updated: Date,
    user: {
        type: ObjectId,
        ref: "User"
    }
}, { timestamps: true});
//compile our model
const Order = mongoose.model("Order", OrderSchema);

// export
module.exports = { Order, ProductCart };