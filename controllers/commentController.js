import Video from '../models/Video';
import Comment from '../models/Comment';
import User from '../models/User';
import { dateFormatter } from '../middlewares';

export const postAddComment = async (req, res) => {
    const {
        params: { id },
        body: { comment }
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
        user.comments.push(newComment.id);
        const parsedInfo = {
            name: user.name,
            date: dateFormatter(newComment.createdAt),
            avatarUrl: user.avatarUrl,
            comment,
            commentId: newComment.id
        };
        user.save();
        res.json(parsedInfo);
    } catch (error) {
        console.log(error);
        res.status(400);
    } finally {
        res.end();
    }
};

export const postEditComment = async (req, res) => {
    const {
        params: { id },
        body: { comment }
    } = req;
    try {
        await Comment.findByIdAndUpdate({ _id: id }, { $set: { text: comment } }, { new: true });
    } catch (error) {
        console.log(error);
    } finally {
        res.end();
    }
};

export const postDeleteComment = async (req, res) => {
    const {
        params: { id: commentId },
        body: { userId, videoId }
    } = req;
    //console.log('1', commentId, '2', userId, '3', videoId);
    try {
        //delete Comment db
        await Comment.findByIdAndDelete(commentId);
        //delete Video db
        await Video.updateOne({ _id: videoId }, { $pull: { comments: commentId } });
        //delete User db
        await User.updateOne({ _id: userId }, { $pull: { comments: commentId } });
    } catch (error) {
        console.log(error);
        res.status(400);
    } finally {
        res.end();
    }
};

export const postChangeVideoLiking = async (req, res) => {
    const {
        params: { id },
        body: { isLikeBtn, isSelected, isSwitching, userId }
    } = req;
    // console.log(id, isLikeBtn, isSelected, isSwitching);
    try {
        const video = await Video.findById(id);
        const user = await User.findById(userId);
        const likeVideos = user.likeVideos;
        const dislikeVideos = user.dislikeVideos;
        if (isLikeBtn) {
            if (isSelected) {
                video.like--;
                likeVideos.splice(likeVideos.indexOf(id), 1);
            } else {
                if (isSwitching) {
                    video.like++;
                    video.dislike--;
                    if (likeVideos.indexOf(id) === -1) likeVideos.push(id);
                    dislikeVideos.splice(dislikeVideos.indexOf(id), 1);
                } else {
                    video.like++;
                    if (likeVideos.indexOf(id) === -1) likeVideos.push(id);
                }
            }
        } else {
            if (isSelected) {
                video.dislike--;
                dislikeVideos.splice(dislikeVideos.indexOf(id), 1);
            } else {
                if (isSwitching) {
                    video.dislike++;
                    video.like--;
                    if (dislikeVideos.indexOf(id) === -1) dislikeVideos.push(id);
                    likeVideos.splice(likeVideos.indexOf(id), 1);
                } else {
                    video.dislike++;
                    if (dislikeVideos.indexOf(id) === -1) dislikeVideos.push(id);
                }
            }
        }
        video.save();
        user.save();
    } catch (error) {
        console.log(error);
        res.status(400);
    } finally {
        res.end();
    }
};
