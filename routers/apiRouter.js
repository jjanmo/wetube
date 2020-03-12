import express from 'express';
import routes from '../routes';
import { postRegisterView } from '../controllers/videoController';
import { postAddComment, postChangeVideoLiking } from '../controllers/commentController';
import { onlyPrivate } from '../middlewares';

const apiRouter = express.Router();

// Register video view
apiRouter.post(routes.registerView, onlyPrivate, postRegisterView);

// Add Comment
apiRouter.post(routes.addComment, onlyPrivate, postAddComment);

// Change Liking
apiRouter.post(routes.changeVideoLiking, onlyPrivate, postChangeVideoLiking);

export default apiRouter;
