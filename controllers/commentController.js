import Video from '../models/Video';
import Comment from '../models/Comment';

export const postAddComment = (req, res) => {
    const {
        params: { id },
        body: { comment },
        user
    } = req;
    try {
        const newComment = Comment.create({
            text: comment,
            creator: user.id
        });
        const video = Video.findById(id);
        video.comments.push(newComment._id);
        video.save();
    } catch (error) {
        console.log(error);
        res.status(400)
    } finally {
        res.end();
    }
}