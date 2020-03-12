import express from 'express';
import routes from '../routes';
import { postRegisterView } from '../controllers/videoController';
import { postAddComment, postChangeVideoLiking } from '../controllers/commentController';

const apiRouter = express.Router();

// Register video view
apiRouter.post(routes.registerView, postRegisterView);

// Add Comment
apiRouter.post(routes.addComment, postAddComment);

// Change Liking
apiRouter.post(routes.changeVideoLiking, postChangeVideoLiking);
export default apiRouter;
