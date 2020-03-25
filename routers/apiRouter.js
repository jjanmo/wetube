import express from 'express';
import routes from '../routes';
import { postRegisterView } from '../controllers/videoController';
import { postAddComment, postChangeVideoLiking, postDeleteComment, postEditComment } from '../controllers/commentController';
import { onlyPrivate } from '../middlewares';

const apiRouter = express.Router();

// Register video view
apiRouter.post(routes.registerView, onlyPrivate, postRegisterView);

// Add Comment
apiRouter.post(routes.addComment, onlyPrivate, postAddComment);

// Edit Comment
apiRouter.post(routes.editComment, onlyPrivate, postEditComment);

// Delete Comment
apiRouter.post(routes.deleteComment, onlyPrivate, postDeleteComment);

// Change Liking
apiRouter.post(routes.changeVideoLiking, onlyPrivate, postChangeVideoLiking);

export default apiRouter;
