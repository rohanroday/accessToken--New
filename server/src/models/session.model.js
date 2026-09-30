import mongoose from "mongoose";

const sessionSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    refreshTokenHash: {
        type: String,
        required: true,
    },
})

const sessionModel = mongoose.model("Session", sessionSchema);

export default sessionModel;