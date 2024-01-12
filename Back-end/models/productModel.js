const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please Enter product name"],
        trim:true,
    },
    description:{
        type:String,
        required:[true,"please Enter product description"]
    },
    price:{
        type:Number,
        required:[true,"please Enter product price"],
        maxLength:[10,"price must be less than 10 characters"]
    },
    rating:{
        type:Number,
        default:0

    },
    image:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true,"please Enter product category"]
    },
    Stock:{
        type:Number,
        required:[true,"please Enter product stock"],
        maxLength:[10,"stock must be less than 10 characters"],
        default:1
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
        }

    })
    

    module.exports = mongoose.model('Product',productSchema);