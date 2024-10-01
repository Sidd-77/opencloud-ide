import express from 'express'
import { handleReplRequest } from '../controllers/projectControllers'
const projectRoutes = express.Router();

projectRoutes.route('/').post(handleReplRequest);

export default projectRoutes;