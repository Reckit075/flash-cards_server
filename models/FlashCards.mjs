import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const FlashCardsSchema = new Schema({
    language:{
        type: String,
    },
    type:{
        type: String,
    },
    question:{
        type: String,
    },
    answear:{
        type: String,
    }
    // level:{
    //     type: Number,
    //     required: true
    // },
    // number:{
    //     type: Number,
    //     required: true
    // }
})

export default mongoose.model("FlashCards", FlashCardsSchema)
