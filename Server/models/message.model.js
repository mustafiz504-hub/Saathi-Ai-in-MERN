import mongoose from "mongoose";
import user from "./userModel2.js";


const messageSchema = new mongoose.Schema({
    senderId: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true
    },
    recieverId: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true
    },
    message : {
        type : String,
        required : true,
        maxLength : 1000,
        trim : true,
        validate:[
            {
                validator : (value) => value.length > 0,
                message : "Message cannot be empty"
            }
        ]
    },
  },
  {
    timestamps: true,
  },
);

const Message = mongoose.model("Message", messageSchema)

export default Message