import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: 'Text is required'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
    // //video와 comment의 연결 방법1)
    // //comment안에 어떤 video인지를 넣는 것
    // video: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Video' //id가 어느model에서 왔는지를 알려주는 것
    // }
});

const model = mongoose.model('Comment', CommentSchema);
export default model;
