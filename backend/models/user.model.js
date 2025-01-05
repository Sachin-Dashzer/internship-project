import mongoose from "mongoose";


const user = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: "https://static.vecteezy.com/system/resources/previews/036/594/092/large_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg"
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    request: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    hobby: {
        type: Array,
        default: []
    },
    date: {
        type: Date,
        default: Date.now
    }

})





const User = mongoose.model("User", user);

export default User;