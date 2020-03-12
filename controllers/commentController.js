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
};

export const postChangeVideoLiking = async (req, res) => {
    const { params: { id },
        body: {
            isLikeBtn,
            isSelected,
            isSwitching
        }
    } = req;
    // console.log(id, isLikeBtn, isSelected, isSwitching);
    try {
        const video = await Video.findById(id);
        if (isLikeBtn) {
            if (isSelected) video.like--;
            else {
                if (isSwitching) {
                    video.like++;
                    video.dislike--;
                }
                else video.like++;
            }
        }
        else {
            if (isSelected) video.dislike--;
            else {
                if (isSwitching) {
                    video.dislike++;
                    video.like--;
                }
                else video.like++;
            }
        }
        video.save();
    } catch (error) {
        console.log(error);
        res.status(400);
    } finally {
        res.end();
    }
};