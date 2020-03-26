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
        comment.replies.push(newReply._id);
        comment.save();

        //send new data
        const parsedData = {
            name: req.user.name,
            date: dateFormatter(newReply.createdAt),
            avatarUrl: req.user.avatarUrl,
            text,
            replyId: newReply._id
        };
        console.log(req.user.avatarUrl);
        res.json(parsedData);
    } catch (error) {
        console.log(error);
        res.status(400);
    } finally {
        res.end();
    }
};
