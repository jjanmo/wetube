import express from 'express';
import routes from '../routes';
import { postRegisterView } from '../controllers/videoController';
import { postAddComment } from '../controllers/commentController';

const apiRouter = express.Router();

// Register video view
apiRouter.post(routes.registerView, postRegisterView);

// Add Comment
apiRouter.post(routes.addComment, postAddComment);

export default apiRouter;
