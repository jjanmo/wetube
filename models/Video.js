import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema({
    fileUrl: {
        type: String,
        required: 'File URL is required'
    },
    title: {
        type: String,
        required: 'Title is required'
    },
    description: String,
    views: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    //video와 comment의 연결 방법2)
    //video안에 달린 comment의 아이디를 배열로 저장시켜 놓는 것
    comment: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const model = mongoose.model('Video', VideoSchema);
//model(model name , model에 사용할 schema)
export default model;
