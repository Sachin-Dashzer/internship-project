import mongoose from "mongoose";


const user = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    avatar: {
        type : String,
        default : "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    friends : {
        type : Array,
        default : []
    },
    request : {
        type : Array,
        default : []
    },
    hobby : {
        type : Array,
        default : []
    },
    date : {
        type : Date,
        default : Date.now
    }

})





const User = mongoose.model("User", user);

export default User;