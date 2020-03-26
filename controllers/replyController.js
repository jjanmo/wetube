import Reply from '../models/Reply';
import Comment from '../models/Comment';
import { dateFormatter } from '../middlewares';

export const postAddReply = async (req, res) => {
    const {
        params: { id: commentId },
        body: { userId, text }
    } = req;
    //console.log(commentId, userId, text);
    try {
        const newReply = await Reply.create({
            text,
            creator: userId,
            whichComment: commentId
        });
        const comment = await Comment.findById({ _id: commentId });
        if (comment.replies.indexOf(newReply._id) === -1) comment.replies.push(newReply._id);
        comment.save();

        //send new data
        const parsedData = {
            name: req.user.name,
            date: dateFormatter(newReply.createdAt),
            avatarUrl: req.user.avatarUrl,
            text,
            replyId: newReply._id
        };
        res.json(parsedData);
    } catch (error) {
        console.log(error);
        res.status(400);
    } finally {
        res.end();
    }
};

export const postEditReply = async (req, res) => {
    const {
        params: { id: replyId },
        body: { text }
    } = req;
    try {
        await Reply.findByIdAndUpdate({ _id: replyId }, { $set: { text } }, { new: true });
    } catch (error) {
        console.log(error);
        res.status(400);
    } finally {
        res.end();
    }
};

export const postDeleteReply = async (req, res) => {
    const {
        params: { id: replyId },
        body: { commentId }
    } = req;
    try {
        await Reply.findByIdAndDelete({ _id: replyId });
        const comment = await Comment.findById({ _id: commentId });
        if (comment.replies.indexOf(replyId) !== -1) comment.replies.splice(comment.replies.indexOf(replyId), 1);
        comment.save();
    } catch (error) {
        console.log(error);
        res.status(400);
    } finally {
        res.end();
    }
};
