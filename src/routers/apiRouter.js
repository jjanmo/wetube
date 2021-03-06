import express from 'express';
import routes from '../routes';
import { postRegisterView } from '../controllers/videoController';
import {
    postAddComment,
    postChangeVideoLiking,
    postDeleteComment,
    postEditComment,
    postChangeCommentLiking
} from '../controllers/commentController';
import { onlyPrivate } from '../middlewares';
import { postAddReply, postEditReply, postDeleteReply } from '../controllers/replyController';

const apiRouter = express.Router();

// Register video view
apiRouter.post(routes.registerView, postRegisterView);

// Add Comment
apiRouter.post(routes.addComment, onlyPrivate, postAddComment);

// Edit Comment
apiRouter.post(routes.editComment, onlyPrivate, postEditComment);

// Delete Comment
apiRouter.post(routes.deleteComment, onlyPrivate, postDeleteComment);

// Change Video Liking
apiRouter.post(routes.changeVideoLiking, onlyPrivate, postChangeVideoLiking);

// Change Comment Liking
apiRouter.post(routes.changeCommentLiking, onlyPrivate, postChangeCommentLiking);

// Add Reply
apiRouter.post(routes.addReply, onlyPrivate, postAddReply);

// Edit Reply
apiRouter.post(routes.editReply, onlyPrivate, postEditReply);

// Delete Reply
apiRouter.post(routes.deleteReply, onlyPrivate, postDeleteReply);

export default apiRouter;
