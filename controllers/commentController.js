import Video from '../models/Video';
import Comment from '../models/Comment';
import User from '../models/User';
import { dateFormatter } from '../middlewares';

export const postAddComment = async (req, res) => {
    const {
        params: { id },
        body: { comment },
    } = req;
    try {
        //add comment
        const newComment = await Comment.create({
            text: comment,
            creator: req.user.id
        });
        const video = await Video.findById(id);
        video.comments.push(newComment._id);
        video.save();

        //send new comment
        const user = await User.findById(newComment.creator);
        const parsedInfo = {
            name: user.name,
            date: dateFormatter(newComment.createdAt),
            avatarUrl: user.avatarUrl,
            comment
        }
        res.json(parsedInfo);
    } catch (error) {
        console.log(error);
        res.status(400)
    } finally {
        res.end();
    }
}
