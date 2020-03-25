import mongoose from 'mongoose';

const ReplySchema = new mongoose.Schema({
    text: {
        type: String,
        required: 'Text is required'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    whichComment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }
    //어떤 댓글의 답글인지를 알기위한 정보
});

const model = mongoose.model('Reply', ReplySchema);
export default model;
