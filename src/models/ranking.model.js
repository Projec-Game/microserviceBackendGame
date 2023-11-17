import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    score:{
        type:Number,
        required:true
    },
    username:{
        type:String,
        required: true,
        trim:true
    }
},{
    timestamps:true
})

export default mongoose.model('Ranking', userSchema)