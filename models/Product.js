const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
    },
    name: {
        type:String,
        required:true
    },
    muscle:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
});

module.exports = Product = mongoose.model('products', ProductSchema);
